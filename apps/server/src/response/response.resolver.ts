import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { Answer, PaginationInput, Response, ResponseFilters, ResponseInput, ResponsesPage } from "src/gen/graphql.generated";
import { ResponseService } from "./response.service";
import { AnswerService } from "src/answer/answer.service";

@Resolver(() => Response)
export class ResponseResolver {
  constructor(
    private readonly responseService: ResponseService,
    private readonly answerService: AnswerService,
  ) { }

  @Query(() => ResponsesPage)
  async responsesPage(@Args('pagination') pagination: PaginationInput, @Args('filters') filters: ResponseFilters): Promise<ResponsesPage> {
    return this.responseService.getPage(pagination.page, pagination.pageSize, filters);
  }

  @ResolveField(() => Answer)
  async answers(
    @Parent() response: Response,
  ) {
    return this.answerService.getAllByResponseId(response.id);
  }

  @Mutation(() => Response)
  async submitResponse(
    @Args('input') input: ResponseInput
  ) {
    return this.responseService.create(input);
  }
}