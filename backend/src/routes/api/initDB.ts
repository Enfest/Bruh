import type { Request, Response } from "express";

import prisma from "../../prisma";

import type { TExportData, TExportCategoryFormQuestionOption } from "../../types/global";
import { CategoryFormQuestionType } from "../../../prisma/generated/type-graphql";

const init = async (req: Request, res: Response) => {
    // retrieve filled form data from queries
    const data = Array.isArray(req.files!.data)
        ? req.files!.data[0]
        : req.files!.data;
    const dataObj: TExportData = JSON.parse(data.data.toString("utf8"));

    // TODO: check data
    await Promise.all([
        prisma.categoryFormQuestionOrder.deleteMany(),
        prisma.categoryFormQuestion.deleteMany(),
        prisma.categoryFormQuestionOption.deleteMany(),
        prisma.categoryFormPageStack.deleteMany(),
        prisma.categoryFormQuestionPageOrder.deleteMany(),
        prisma.categoryFormQuestionPage.deleteMany()
    ]);

    // init category questions
    const formQuestions = dataObj.category.formQuestions;
    let createQuestionPromises = formQuestions.map((formQuestion) => {
        const { id, type: typeString, title, description, options } = formQuestion;
        const type = CategoryFormQuestionType[typeString];

        const optionsCreateData = (options ?? []).map((option, index) => {
            if (typeof option === "string") {
                return { order: index, text: option }
            }
            return {
                order: index,
                text: option.text,
                page: {
                    create: {
                        title: option.pageTitle,
                        description: option.description,
                        questionIds: option.subQuestionIds,
                        questionOrders: {
                            create: option.subQuestionIds.map((id, index) => ({
                                questionId: id,
                                order: index
                            }))
                        }
                    }
                }
            }
        });

        return prisma.categoryFormQuestion.create({
            data: {
                id,
                type,
                title,
                description,
                options: { create: optionsCreateData },
            },
            include: {
                options: {
                    include: {
                        page: {
                            include: {
                                questionOrders: true
                            }
                        }
                    }
                }
            }
        });
    });
    await Promise.all(createQuestionPromises);

    // console.log((await prisma.categoryFormQuestion.findMany({
    //     include: {
    //         options: {
    //             include: {
    //                 page: true
    //             }
    //         }
    //     }
    // })).map((question) => question.options));
    // console.log(await prisma.categoryFormQuestionPage.findMany({}))

    // init category init page
    const initialPage = dataObj.category.initialPage;
    await prisma.categoryFormQuestionPage.create({
        data: {
            title: initialPage.pageTitle,
            description: initialPage.description,
            questionIds: initialPage.subQuestionIds,
            questionOrders: {
                create: initialPage.subQuestionIds.map((id, index) => ({
                    questionId: id,
                    order: index
                }))
            }
        }
    });

    res.send({ success: true });
};

export default init;

