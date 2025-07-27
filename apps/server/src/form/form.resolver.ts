import { Args, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { Form, FormsPage, PaginationInput, QuestionsPage } from "src/gen/graphql";
import { FormService } from "./form.service";
import { QuestionService } from "src/question/question.service";

@Resolver(() => Form)
export class FormResolver {
  constructor(
    private readonly formService: FormService,
    private readonly questionService: QuestionService
  ) { }

  @Query(() => FormsPage)
  async formsPage(@Args('pagination') pagination: PaginationInput): Promise<FormsPage> {
    return this.formService.getPage(pagination.page, pagination.pageSize);
  }

  @Query(() => Form, { nullable: true })
  async form(@Args('id', { type: () => String }) id: string): Promise<Form | null> {
    const form = this.formService.getById(id)
    return form ?? null;
  }

  @ResolveField(() => QuestionsPage)
  async questions(
    @Parent() form: Form,
    @Args('pagination') pagination: PaginationInput
  ): Promise<QuestionsPage> {
    return this.questionService.getPage(pagination.page, pagination.pageSize, { formId: form.id })
  }

}