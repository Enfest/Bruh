import type { Request, Response } from "express";

import { v4 as uuidv4 } from "uuid";
import prisma from "../../../prisma";


const getFormQuestions = async (ids: number[]) => {
    // retrieve filled form data from queries
    const formQuestions = await prisma.categoryFormQuestion.findMany({
        where: {
            id: { in: ids }
        },
        include: {
            // options: {
            //     include: {
            //         page: true
            //     }
            // }
            options: true
        }
    });

    return formQuestions;
}

const getFormPage = async (req: Request, res: Response) => {
    try {
        let hash = req.query.hash as string;
        const pageStackFind = await prisma.categoryFormPageStack.findFirst({
            where: { hash },
            include: {
                pages: {
                    select: { id: true }
                }
            }
        });

        if (pageStackFind === null) {
            const initialPage = await prisma.categoryFormQuestionPage.findFirstOrThrow({
                where: { description: "<INIT>" }
            });

            hash = uuidv4();
            await prisma.categoryFormPageStack.create({
                data: {
                    hash,
                    pages: {
                        connect: { id: initialPage.id }
                    },
                    pageOrders: {
                        create: [{ order: 0, pageId: initialPage.id }]
                    }
                }
            });
        }

        const pageStack = await prisma.categoryFormPageStack.findUniqueOrThrow({
            where: { hash },
            include: {
                pages: true,
                pageOrders: true
            }
        });
        const pages = pageStack.pages.map((page, index) => {
            const order = pageStack.pageOrders[index];
            return {
                order,
                title: page.title,
                description: page.description,
                questionIds: page.questionIds
            }
        });
        pages.sort();

        const page = pages[pages.length - 1];
        const formQuestions = await getFormQuestions(page.questionIds);

        res.send({ success: true, hash, title: page.title, description: page.description, questions: formQuestions });

    } catch (error) {
        res.send({ success: false, error });
    }
};

export default getFormPage;

