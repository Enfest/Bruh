import type { Request, Response } from "express";

import { v4 as uuidv4 } from "uuid";
import prisma from "../../../prisma";

import { orderListToRecord } from "../../../utils/category";
import { kMaxLength } from "buffer";

const getFormQuestions = async (ids: number[]) => {
    // retrieve filled form data from queries
    const formQuestions = await prisma.categoryFormQuestion.findMany({
        where: {
            id: { in: ids },
        },
        include: {
            options: true,
        },
    });

    formQuestions.forEach((formQuestion) => {
        formQuestion.options.sort((a, b) => a.order - b.order);
    });

    return formQuestions;
};

const getFormPage = async (req: Request, res: Response) => {
    try {
        const hash = req.query.hash as string;

        // Find or create the initial page stack
        const pageStackFind = await prisma.categoryFormPageStack.findFirst({
            where: { hash },
            include: {
                pages: {
                    select: { id: true },
                },
            },
        });

        if (pageStackFind === null) {
            const initialPage = await prisma.categoryFormQuestionPage.findFirstOrThrow({
                where: { description: "<INIT>" },
            });

            // hash = uuidv4();
            // const session = uuidv4();
            const pageStack = await prisma.categoryFormPageStack.create({
                data: {
                    hash,
                    // session,
                    pages: {
                        connect: { id: initialPage.id },
                    },
                    pageOrders: {
                        create: [{ order: 0, pageId: initialPage.id }],
                    },
                },
            });
        }

        // Retrieve the full page stack with related data
        const pageStack = await prisma.categoryFormPageStack.findUniqueOrThrow({
            where: { hash },
            include: {
                pages: true,
                pageOrders: true,
                answer: true,
            },
        });

        // Process and sort pages
        const pageOrder = orderListToRecord(pageStack.pageOrders, "pageId");
        const pages = pageStack.pages.map((page) => {
            const order = pageOrder[page.id];
            return {
                orderId: order[0],
                order: order[1],
                title: page.title,
                description: page.description,
                questionIds: page.questionIds,
            };
        });
        pages.sort((a, b) => a.order - b.order);

        console.log(pages);
        // Get the last page and its questions
        const page = pages[pages.length - 1];
        const formQuestions = await getFormQuestions(page.questionIds);

        // Process answers
        const formAnswers = pageStack.answer.map((answer) => {
            if (answer.answer !== "") {
                return {
                    questionId: answer.questionId,
                    answer: answer.answer,
                };
            }
            return {
                questionId: answer.questionId,
                answerList: answer.answerList,
            };
        });

        // Send response with page data
        res.send({
            success: true,
            hash,
            title: page.title,
            description: page.description,
            questions: formQuestions,
            answers: formAnswers,
        });
    } catch (error) {
        // Handle errors and send error response
        res.send({ success: false, error });
        console.log(error);
    }
};

export default getFormPage;
