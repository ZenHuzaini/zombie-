import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ZombieModule } from './modules/zombie/zombie.module';

const isDev = process.env.NODE_ENV === 'development';
const GRAPHQL_SCHEMA_PATH = join(__dirname, 'schema.gql');

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      debug: isDev,
      playground: true,
      cors: false,
      autoSchemaFile: true, //GRAPHQL_SCHEMA_PATH,
      // Enabled so developers can  discover the api
      // As all apis are secured by the auth middleware it is only possible for authenticated users to inspect the api
      introspection: true,
      path: '/api/graphql',
    }),
    ZombieModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
