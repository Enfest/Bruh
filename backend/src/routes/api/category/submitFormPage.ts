import type { Request, Response } from "express";

import { v4 as uuidv4 } from "uuid";
import prisma from "../../../prisma";

import { orderListToRecord } from "../../../utils/category";

// Define the structure of the form submission data
type TCategoryFormPageSubmit = {
    hash: string                              // Unique identifier for the form session
    answers: Record<string, string | number[]> // User's answers to the questions
}

const submitFormPage = async (req: Request, res: Response) => {
    try {
        const { hash, answers } = req.body as TCategoryFormPageSubmit;

        // Retrieve the current form page stack based on the provided hash
        const pageStack = await prisma.categoryFormPageStack.findFirstOrThrow({
            where: { hash },
            include: {
                pages: {
                    include: {
                        questionOrders: true
                    }
                },
                pageOrders: true
            }
        });

        // Convert the page orders into a more manageable format
        const pageOrder = orderListToRecord(pageStack.pageOrders, "pageId");
        const pages = pageStack.pages.map((page) => {
            const order = pageOrder[page.id];
            return {
                orderId: order[0],
                order: order[1],
                ...page
            };
        })
        pages.sort((a, b) => a.order - b.order);
        const lastPage = pages[pages.length - 1];

        // await prisma.categoryFormPageStack.update({
        //     where: {
        //         id: pageStack.id
        //     },
        //     data: {
        //         pageOrders: {
        //             delete: { id: lastPage.orderId }
        //         },
        //         pages: {
        //             disconnect: { id: lastPage.id }
        //         }
        //     }
        // });

        // Duplicate the page stack
        const newHash = uuidv4();
        const session = pageStack.session;
        const prunedPages = pages.slice(0, pages.length - 1);
        const newPageStack = await prisma.categoryFormPageStack.create({
            data: {
                hash: newHash,
                session,
                pages: {
                    connect: prunedPages.map(page => ({ id: page.id }))
                },
                pageOrders: {
                    create: prunedPages.map(page => ({
                        order: page.order,
                        pageId: page.id
                    }))
                }
            }
        });

        // Retrieve and sort the questions for the last page
        const questionOrder = orderListToRecord(lastPage.questionOrders, "questionId");
        const _questions = await prisma.categoryFormQuestion.findMany({
            where: {
                id: {
                    in: lastPage.questionIds
                }
            },
            include: {
                options: {
                    include: {
                        page: true,
                    }
                }
            }
        });

        const questions = _questions.map((question) => {
            const order = questionOrder[question.id];
            return {
                orderId: order[0],
                order: order[1],
                ...question
            }
        })
        questions.sort((a, b) => a.order - b.order);

        // Determine the new pages based on the question options
        let newPages = questions.map((question) => {
            const options = question.options;
            options.sort((a, b) => a.order - b.order);
            const pages = options.map((option) => option.page).filter((page) => page !== null);
            return pages;
        }).flat();

        // Add the new pages to the page stack
        const newPageOrderStart = pages.length - 1;
        await prisma.categoryFormPageStack.update({
            where: {
                id: newPageStack.id
            },
            data: {
                pageOrders: {
                    createMany: {
                        data: newPages.map((page, index) => {
                            return {
                                order: index + newPageOrderStart,
                                pageId: page.id
                            }
                        })
                    }
                },
                pages: {
                    connect: newPages.map((page) => {
                        return { id: page.id }
                    })
                }
            }
        });

        // Generate a new hash for the updated form session
        // const newHash = uuidv4();
        // await prisma.categoryFormPageStack.update({
        //     where: {
        //         id: pageStack.id
        //     },
        //     data: {
        //         hash: {
        //             set: newHash
        //         }
        //     }
        // });

        // Send the success response with the new hash
        res.send({ success: true, hash: newHash });
    } catch (error) {
        // Handle any errors and send an error response
        res.send({ success: false, error });
        console.log(error);
    }
};

export default submitFormPage;

