import { GraphQLDefinitionsFactory } from "@nestjs/graphql";
import { join } from "path";

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  typePaths: ['../../packages/graphql-schemas/*.graphql'],
  path: join(process.cwd(), 'src/gen/graphql.ts'),
  outputAs: 'class',
  watch: true,
});
