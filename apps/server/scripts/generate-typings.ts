import { GraphQLDefinitionsFactory } from "@nestjs/graphql";
import { join } from "path";

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  typePaths: [process.env.GRAPHQL_SCHEMA_PATH || '../../packages/graphql-schemas/*.graphql'],
  path: join(process.cwd(), 'src/gen/graphql.generated.ts'),
  outputAs: 'class'
});
