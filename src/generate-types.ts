import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const definistionsFactory = new GraphQLDefinitionsFactory();
definistionsFactory.generate({
  typePaths : ['./**/*.graphql'],
  path: join(process.cwd(),'src/graphql/types.ts') ,
  outputAs: 'class',
  watch: true,
  skipResolverArgs: true
})