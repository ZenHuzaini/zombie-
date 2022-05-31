import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as util from 'util';

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
dotenv.config();
const readFile = util.promisify(fs.readFile);

type EnvConfigProperty = 'NODE_ENV' | 'MONGODB_PASSWORD' | 'MONGODB_USER';
export type EnvConfig = { [key in EnvConfigProperty]: string };

type Env = 'development' | 'production';

const ENV = (process.env.NODE_ENV || 'production') as Env;

if (ENV === 'development') {
  dotenv.config({ path: `.env.${ENV}` });
}

export class ConfigService {
  private readonly envConfig: EnvConfig;
  private initialized = false;
  private applicationVersion: string;

  public constructor() {
    this.envConfig = process.env as EnvConfig;

    if (ENV !== 'development') {
      console.log('//TODO: for development');
    }
  }

  public async init(): Promise<void> {
    if (this.initialized) {
      return;
    }

    this.initialized = true;
  }

  private checkIfInitialised(): void {
    if (!this.initialized) {
      throw new Error('ConfigService not initialised.');
    }
  }

  public getValue(key: EnvConfigProperty, throwOnMissing = true): string {
    const value = this.envConfig[key];

    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }
    return value;
  }

  public getAll(): EnvConfig {
    this.checkIfInitialised();
    return this.envConfig;
  }

  public getPublicTypeOrmConfig(): TypeOrmModuleOptions {
    const typeOrmConfig: TypeOrmModuleOptions = {
      ...this.getCommonTypeOrmConfig(),
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/../migrations/public/*{.ts,.js}'],
      // cli: {
      //   migrationsDir: './src/migrations/public',
      // },
      migrationsRun: true,
    };

    return typeOrmConfig;
  }

  public getApplicationVersion(): string {
    return this.applicationVersion;
  }

  public getMongDBUrl(): string {
    const url = `mongodb+srv://${this.getValue('MONGODB_USER')}:${this.getValue(
      'MONGODB_PASSWORD',
    )}@zombie.if2gj.mongodb.net/zombie?retryWrites=true&w=majority`;

    return url;
  }

  private getCommonTypeOrmConfig(): Partial<TypeOrmModuleOptions> {
    const typeOrmConfig: Partial<TypeOrmModuleOptions> = {
      type: 'mongodb',
      url: this.getMongDBUrl(),
      useNewUrlParser: true,
      migrationsTableName: 'migrations',
      synchronize: false,
      useUnifiedTopology: true,
      logging: true,
    };

    return typeOrmConfig;
  }
}
