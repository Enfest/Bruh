import { PrismaClient } from "@prisma/client";

export type TContext = {
    prisma: PrismaClient
};

export type TExportCategoryFormQuestionOption = {
    text: string
    description: string
    pageTitle: string
    subQuestionIds: number[]
}

export type TExportCategoryFormQuestion = {
    id: number
    type: "SELECT" | "MULTISELECT" | "TEXT"
    title: string
    description: string
    options: string[] | TExportCategoryFormQuestionOption[]
}

export type TCategoryFormResult = {
    query: string
    answer: string
    detail: string
};

export type TExportCategory = {
    formQuestions: TExportCategoryFormQuestion[]
    initialPage: TExportCategoryFormQuestionOption
};

export type TExportData = {
    category: TExportCategory
}