import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { FormModule } from './form/form.module';
import depthLimit from 'graphql-depth-limit';
import { ResponseModule } from './response/response.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      graphiql: true,
      validationRules: [depthLimit(5)],
      typePaths: [process.env.GRAPHQL_SCHEMA_PATH || '../../packages/graphql-schemas/*.graphql']
    }),
    FormModule,
    ResponseModule
  ],
  providers: []
})
export class AppModule { }
