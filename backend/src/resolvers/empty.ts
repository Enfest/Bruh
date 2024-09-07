import {
    Resolver,
    Query,
    Mutation,
    Ctx,
    Arg,
} from "type-graphql"

import { TContext } from "../types/global";

@Resolver()
class EmptyResolver {
    @Query(() => String)
    async getTests(@Ctx() ctx: TContext) {
        return {};
    }

    @Mutation(() => String)
    async addTest(
        @Ctx() ctx: TContext
    ) {
        return {};
    }

}

export default EmptyResolver;
