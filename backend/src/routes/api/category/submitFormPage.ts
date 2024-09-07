import type { Request, Response } from "express";

import { v4 as uuidv4 } from "uuid";
import prisma from "../../../prisma";
import { CategoryFormQuestion, CategoryFormQuestionType } from "../../../../prisma/generated/type-graphql";
import { TCategoryFormResult } from "../../../types/global";

import { orderListToRecord } from "../../../utils/category";


// type TCategoryFormSubmit = {
//     questionId: number
//     answer: string // TEXT or SELECTION input
//     selections: string[] // MULTISELECT input
//     detail: string
// }
type TCategoryFormPageSubmit = {
    hash: string
    answers: Record<string, string | number[]> // TEXT or SELECTION input
}

const submitFormPage = async (req: Request, res: Response) => {
    try {
        const { hash, answers } = req.body as TCategoryFormPageSubmit;
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

        await prisma.categoryFormPageStack.update({
            where: {
                id: pageStack.id
            },
            data: {
                pageOrders: {
                    delete: { id: lastPage.orderId }
                },
                pages: {
                    disconnect: { id: lastPage.id }
                }
            }
        });

        const questionOrder = orderListToRecord(lastPage.questionOrders, "questionId");
        // console.log(questionOrder);
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
        // console.log(_questions);

        const questions = _questions.map((question) => {
            const order = questionOrder[question.id];
            return {
                orderId: order[0],
                order: order[1],
                ...question
            }
        })
        questions.sort((a, b) => a.order - b.order);
        // console.log(questions);

        let newPages = questions.map((question) => {
            const options = question.options;
            options.sort((a, b) => a.order - b.order);
            const pages = options.map((option) => option.page).filter((page) => page !== null);
            return pages;
        }).flat();

        const newPageOrderStart = pages.length - 1;
        await prisma.categoryFormPageStack.update({
            where: {
                id: pageStack.id
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

        const newHash = uuidv4();
        await prisma.categoryFormPageStack.update({
            where: {
                id: pageStack.id
            },
            data: {
                hash: {
                    set: newHash
                }
            }
        })

        res.send({ success: true, hash: newHash });
    } catch (error) {
        res.send({ success: false, error });
        console.log(error);
    }
};

// const submitFormPage = async (req: Request, res: Response) => {
//     try {
//         const answersRaw = req.query;
//         const answers = Object.entries(answersRaw).map(([idRaw, answerString]) => {
//             console.log(idRaw);
//             if (typeof idRaw !== "string") {
//                 return null;
//             }
//             const id = parseInt(idRaw);
//             return [id, answerString];
//         }).filter((answer) => answer !== null);
//         
//         // const questions = await Promise.all(
//         //     answers.map(([id, _]) => )
//         // )
//         const answerStrings = answers.map(([id, answerString]) => answerString);
//         
//         console.log(answers);

//         // // Process the form data as needed
//         // const formResults = formAnswers.map(async (data) => {
//         //     const { questionId, answer: textAnswer, selections, detail } = data;
//         //     const question = await prisma.categoryFormQuestion.findUniqueOrThrow({
//         //         where: { id: questionId }
//         //     }) as CategoryFormQuestion;

//         //     const query = question.title;
//         //     const answer = (() => {
//         //         switch (question.type) {
//         //             case CategoryFormQuestionType.TEXT:
//         //                 return 
//         //                 break;
//         //             case CategoryFormQuestionType.MULTISELECT:

//         //                 break;
//         //             case CategoryFormQuestionType.MULTISELECT:

//         //                 break;
//         //             default:
//         //                 break;
//         //         }
//         //     })();
//         // });

//         res.send({ success: true });
//     } catch (error) {
//         res.send({ success: false, error });
//     }
// };

export default submitFormPage;

