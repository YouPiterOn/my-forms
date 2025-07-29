import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { Form, FormInput, FormsPage, PaginationInput, Question, QuestionsPage, Response } from "src/gen/graphql.generated";
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

  @ResolveField(() => Question)
  async questions(
    @Parent() form: Form
  ): Promise<Question[]> {
    return this.questionService.getAllByFormId(form.id)
  }

  @Mutation(() => Form)
  async createForm(
    @Args('input') input: FormInput
  ): Promise<Form> {
    return this.formService.create(input);
  }
}