import type { Request, Response } from "express";

import prisma from "../../../prisma";
import { CategoryFormQuestion, CategoryFormQuestionType } from "../../../../prisma/generated/type-graphql";
import { TCategoryFormResult } from "../../../types/global";


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
            include: { pages: true, pageOrders: true }
        });
        
        console.log(pageStack);

        res.send({ success: true });
    } catch (error) {
        res.send({ success: false, error });
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

