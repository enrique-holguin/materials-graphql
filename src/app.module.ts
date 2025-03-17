import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { FilesModule } from './files/files.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configDB } from './database/config';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { join } from 'path';
import { ManufacturersModule } from './manufacturers/manufacturers.module';


@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(),'src/graphql/schema.gql')
    }),
    // GraphQLModule.forRoot({
    //   driver: ApolloDriver,
    //   typePaths: ['./**/*.graphql'],
    // }),
    TypeOrmModule.forRoot(configDB),
    FilesModule,
    ProductsModule,
    CategoriesModule,
    ManufacturersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
