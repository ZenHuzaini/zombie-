import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { ItemModule } from './modules/item/item.module';
import { UserModule } from './modules/user/user.module';
import { ZombieModule } from './modules/zombie/zombie.module';
import { ScheduleModule } from '@nestjs/schedule';

const isDev = process.env.NODE_ENV === 'development';
const GRAPHQL_SCHEMA_PATH = join(__dirname, 'schema.gql');

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      debug: isDev,
      playground: true,
      cors: false,
      autoSchemaFile: GRAPHQL_SCHEMA_PATH,
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
    ScheduleModule.forRoot(),
    ZombieModule,
    ConfigModule,
    UserModule,
    ItemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
