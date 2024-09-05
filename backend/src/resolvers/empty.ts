import {
    Resolver,
    Query,
    Mutation,
    Ctx,
    Arg,
} from "type-graphql"

import { TContext } from "../types/global";
import { TestTypeCreateInput } from "../../prisma/generated/type-graphql";

@Resolver()
class EmptyResolver {
    @Query(() => String)
    async getTests(@Ctx() ctx: TContext) {
        const tests = await ctx.prisma.testType.findMany();
        return tests.map(test => test.message).join(" ");
    }

    @Mutation(() => String)
    async addTest(
        @Arg("input") testInput: TestTypeCreateInput,
        @Ctx() ctx: TContext
    ) {
        await ctx.prisma.testType.create({
            data: {
                message: testInput.message
            }
        });
        return testInput.message;
    }

}

export default EmptyResolver;
