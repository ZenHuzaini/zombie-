import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { UserModule } from './modules/user/user.module';
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
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        await configService.init();
        return configService.getPublicTypeOrmConfig();
      },
    }),
    ZombieModule,
    ConfigModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
