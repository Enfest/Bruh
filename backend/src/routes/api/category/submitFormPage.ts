import type { Request, Response } from "express";

import { createHash } from "crypto";
import prisma from "../../../prisma";
import { CategoryFormPageStack } from "../../../../prisma/generated/type-graphql";

import { orderListToRecord } from "../../../utils/category";
import { CategoryFormAnswer, CategoryFormQuestionType } from "@prisma/client";

// Define the structure of the form submission data
type TCategoryFormPageSubmit = {
    hash: string; // Unique identifier for the form session
    answers: Record<string, string | string[]>; // User's answers to the questions
};

type TNode = {
    nextHashes: string[];
    answers: CategoryFormAnswer[];
};

const traceAnswers = async (hash: string) => {
    let fullAnswers: string = "";

    while (true) {
        let pageStack = await prisma.categoryFormPageStack.findUniqueOrThrow({
            where: { hash },
            include: { pages: true, answer: true },
        });
        const page = pageStack.pages[pageStack.pages.length - 1];
        let content = `[PAGE ${page.id}]\ntitle: ${page.title}\ndescription: ${page.description}\n`;
        for (const { questionId, answer, answerList } of pageStack.answer) {
            const question = await prisma.categoryFormQuestion.findFirst({
                where: {
                    id: questionId,
                },
                include: {
                    options: true,
                },
            });
            if (question === null) {
                continue;
            }
            if (question?.type !== CategoryFormQuestionType.TEXT) {
                const optionTextMap: Record<number, string> = {};
                question.options.forEach((option) => {
                    optionTextMap[option.order] = option.text;
                });
                const optionString = answerList
                    .map((optionId) => optionTextMap[parseInt(optionId)])
                    .join(",");
                content += `${question.title}: ${optionString}\n`;
            } else {
                content += `${question.title}: ${answer}\n`;
            }
        }

        fullAnswers += content;

        hash = pageStack.prevHash;
        if (hash == "") {
            break;
        }
    }

    return fullAnswers;
};

const submitToAgent = async (res: Response, fullAnswers: string) => {
    const myHeader = new Headers();
    myHeader.append("Content-Type", "application/json");
    fetch("http://localhost:8000/init/", {
        method: "POST",
        body: JSON.stringify({
            session: "1",
            background: [fullAnswers],
        }),
        headers: myHeader,
    })
        .then((res) => {
            return res.json();
        })
        .catch((err) => {
            console.log("error: ", err);
        });

    const p_res = await fetch("http://localhost:8000/get_suggestion/", {
        method: "GET",
        headers: myHeader,
    });
    const j = await p_res.json();
    j.done = true;
    console.log(j);
    res.send(j);
};

const submitFormPage = async (req: Request, res: Response) => {
    try {
        const { hash, answers } = req.body as TCategoryFormPageSubmit;

        // Retrieve the current form page stack and its associated pages
        const pageStack = await prisma.categoryFormPageStack.findFirstOrThrow({
            where: { hash },
            include: {
                pages: {
                    include: {
                        questionOrders: true,
                    },
                },
                pageOrders: true,
            },
        });

        // Convert page orders to a more efficient format and sort pages
        const pageOrder = orderListToRecord(pageStack.pageOrders, "pageId");
        const pages = pageStack.pages.map((page) => {
            const order = pageOrder[page.id];
            return {
                orderId: order[0],
                order: order[1],
                ...page,
            };
        });
        pages.sort((a, b) => a.order - b.order);
        const lastPage = pages[pages.length - 1];

        // Generate a new hash based on the current hash and answers
        const answersString = JSON.stringify(answers);
        const newHash = createHash("md5").update(hash).update(answersString).digest("hex");

        // Check if a page stack with the new hash already exists
        if (
            (await prisma.categoryFormPageStack.count({
                where: { hash: newHash },
            })) > 0
        ) {
            if (pageStack.done) {
                const fullAnswers = await traceAnswers(hash);
                await submitToAgent(res, fullAnswers);
            }
            // res.send({ success: true, hash: newHash, done: pageStack.done });
            return;
        }

        // Create a new page stack, excluding the last page
        const prunedPages = pages.slice(0, pages.length - 1);
        const newPageStack = await prisma.categoryFormPageStack.create({
            data: {
                hash: newHash,
                prevHash: hash,
                pages: {
                    connect: prunedPages.map((page) => ({ id: page.id })),
                },
                pageOrders: {
                    create: prunedPages.map((page) => ({
                        order: page.order,
                        pageId: page.id,
                    })),
                },
            },
        });

        // Store the answers for the current page
        const createdAnswers = await prisma.categoryFormAnswer.createMany({
            data: Object.entries(answers).map(([questionId, answer]) => {
                if (typeof answer === "string") {
                    return {
                        hash,
                        questionId: parseInt(questionId),
                        answer,
                    };
                } else {
                    // console.log(typeof answer[0]);
                    return {
                        hash,
                        questionId: parseInt(questionId),
                        answerList: answer.map((a) => a.toString()),
                    };
                }
            }),
        });

        // Retrieve and sort questions for the last page
        const questionOrder = orderListToRecord(lastPage.questionOrders, "questionId");
        const _questions = await prisma.categoryFormQuestion.findMany({
            where: {
                id: {
                    in: lastPage.questionIds,
                },
            },
            include: {
                options: {
                    include: {
                        page: true,
                    },
                },
            },
        });

        const questions = _questions.map((question) => {
            const order = questionOrder[question.id];
            return {
                orderId: order[0],
                order: order[1],
                ...question,
            };
        });
        questions.sort((a, b) => a.order - b.order);

        console.log("ANSWERS", answers);

        // Determine new pages based on question options
        let newPages = questions
            .map((question) => {
                const options = question.options;
                options.sort((a, b) => a.order - b.order);
                const answer = answers[question.id];
                if (Array.isArray(answer)) {
                    const pages = options
                        .filter((option) => option.order.toString() in answer)
                        .map((option) => option.page)
                        .filter((page) => page !== null);
                    console.log("PAGES", pages);
                    return pages;
                }
                return [];
            })
            .flat();

        // Quit if no more pages
        // console.log(prunedPages.length, newPages.length)
        if (prunedPages.length + newPages.length === 0) {
            await prisma.categoryFormPageStack.update({
                where: { id: pageStack.id },
                data: { done: { set: true } },
            });
            let fullAnswers = await traceAnswers(hash);
            await submitToAgent(res, fullAnswers);
            // res.send({ success: true, hash: newHash, done: true });
            return;
        }

        // Add new pages to the page stack
        const newPageOrderStart = pages.length - 1;
        await prisma.categoryFormPageStack.update({
            where: {
                id: newPageStack.id,
            },
            data: {
                pageOrders: {
                    createMany: {
                        data: newPages.map((page, index) => {
                            return {
                                order: index + newPageOrderStart,
                                pageId: page.id,
                            };
                        }),
                    },
                },
                pages: {
                    connect: newPages.map((page) => {
                        return { id: page.id };
                    }),
                },
            },
        });

        // Send success response with the new hash
        res.send({ success: true, hash: newHash });
    } catch (error) {
        // Handle errors and send error response
        res.send({ success: false, error });
        console.log(error);
    }
};

export default submitFormPage;
