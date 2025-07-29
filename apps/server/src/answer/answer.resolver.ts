import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { Answer, Question } from "src/gen/graphql.generated";
import { QuestionDataLoader } from "src/question/dataloader/question.dataloader";

@Resolver(() => Answer)
export class AnswerResolver {
  constructor (
    private readonly questionDataLoader: QuestionDataLoader
  ) {}

  @ResolveField(() => Question)
  async question(
    @Parent() answer: Answer,
  ) {
    return this.questionDataLoader.load(answer.questionId);
  }
}