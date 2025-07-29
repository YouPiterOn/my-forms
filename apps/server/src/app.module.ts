import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { FormModule } from './form/form.module';
import depthLimit from 'graphql-depth-limit';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      graphiql: true,
      validationRules: [depthLimit(5)],
      typePaths: ['../../packages/graphql-schemas/*.graphql']
    }),
    FormModule
  ],
  providers: []
})
export class AppModule { }
