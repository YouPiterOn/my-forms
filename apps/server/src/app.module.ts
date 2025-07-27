import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { FormModule } from './form/form.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['../../packages/graphql-schemas/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/gen/graphql.ts'),
        outputAs: 'class',
      },
    }),
    FormModule
  ],
  providers: []
})
export class AppModule { }
