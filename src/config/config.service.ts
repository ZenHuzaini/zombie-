// import * as dotenv from 'dotenv';
// import * as fs from 'fs';
// import * as util from 'util';
// import * as path from 'path';
// import * as os from 'os';
// import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// import { SecretClient } from '@azure/keyvault-secrets';
// import { DefaultAzureCredential } from '@azure/identity';
// import { tryParseJson } from '../utils/core/tryParseJson';
// import { IBearerStrategyOption } from 'passport-azure-ad';
// import {
//   DEFAULT_PUBLIC_ENTITY_SCHEMA_NAME,
//   DEFAULT_TENANT_ENTITY_SCHEMA_NAME,
// } from '../constants/db';
// import { SqlServerConnectionOptions } from 'typeorm/driver/sqlserver/SqlServerConnectionOptions';
// import { FileQueryResultCache } from '../utils/caching/fileQueryResultCache';
// import { PACKAGE_JSON_PATH } from '../constants/paths';

// const readFile = util.promisify(fs.readFile);

// type EnvConfigProperty =
//   | 'NODE_ENV'
//   | 'SQLAZURECONNSTR_SERVER'
//   | 'SQLAZURECONNSTR_PORT'
//   | 'SQLAZURECONNSTR_USER'
//   | 'SQLAZURECONNSTR_PASSWORD'
//   | 'SQLAZURECONNSTR_DATABASE'
//   | 'UPLOAD_MAX_FILE_SIZE'
//   | 'UPLOAD_MAX_FILE_COUNT'
//   | 'VAULT'
//   | 'SENDGRID_API_KEY'
//   | 'SENDER_EMAIL'
//   | 'DEV_EMAILS'
//   | 'AUTH_TENANT_ID'
//   | 'AUTH_CLIENT_ID'
//   | 'AUTH_AUDIENCE'
//   | 'AUTH_ISSUER'
//   | 'JWT_TOKEN_SECRET'
//   | 'JWT_TOKEN_EXPIRATION'
//   | 'BASE_URL_EMAIL'
//   | 'ALLOWED_CORS_DOMAINS'
//   | 'CACHE_TIME'
//   | 'MAX_CACHE_SIZE'
//   | 'DATA_ENCRYPTION_KEY';
// export type EnvConfig = { [key in EnvConfigProperty]: string };

// type Env = 'development' | 'production';

// interface DbUser {
//   machineName: string;
//   server: string;
//   port: string;
//   user: string;
//   password: string;
//   database: string;
// }

// const ENV = (process.env.NODE_ENV || 'production') as Env;
// dotenv.config();
// if (ENV === 'development') {
//   dotenv.config({ path: `.env.${ENV}` });
//   const machineName = os.hostname();
//   const dbUsers = tryParseJson<DbUser[]>(
//     fs.readFileSync(path.join(__dirname, '../../db-users.json')).toString(),
//     [],
//   );
//   const defaultUser = dbUsers.find((user) => user.machineName === 'default');
//   const dbUser =
//     dbUsers.find((user) => user.machineName === machineName) || defaultUser;
//   process.env.SQLAZURECONNSTR_PASSWORD = dbUser.password;
//   process.env.SQLAZURECONNSTR_USER = dbUser.user;
//   process.env.SQLAZURECONNSTR_SERVER =
//     dbUser.server === '127.0.0.1' ? 'localhost' : dbUser.server;
//   process.env.SQLAZURECONNSTR_PORT = dbUser.port;
//   process.env.SQLAZURECONNSTR_DATABASE = dbUser.database;
// }

// const DATA_ENCRYPTION_KEY_LENGTH = 32;

// export const DEFAULT_ENV_VALUES: Partial<EnvConfig> = {
//   UPLOAD_MAX_FILE_COUNT: '5',
//   UPLOAD_MAX_FILE_SIZE: '100000000', // 100 MB
//   JWT_TOKEN_EXPIRATION: '3600', // 1 hour
//   CACHE_TIME: '3600', // 1 hour
//   MAX_CACHE_SIZE: '100000000', // 100 MB
// };

// export class ConfigService {
//   private readonly envConfig: EnvConfig;
//   private initialized = false;
//   private readonly secretClient: SecretClient;
//   private applicationVersion: string;

//   public constructor() {
//     this.envConfig = process.env as EnvConfig;

//     if (ENV !== 'development') {
//       const vaultName = this.getValue('VAULT', true);

//       const url = `https://${vaultName}.vault.azure.net`;
//       const credential = new DefaultAzureCredential();
//       this.secretClient = new SecretClient(url, credential);
//     }

//     this.ensureValues([
//       'AUTH_TENANT_ID',
//       'AUTH_CLIENT_ID',
//       'SENDER_EMAIL',
//       'JWT_TOKEN_SECRET',
//       'BASE_URL_EMAIL',
//       'DATA_ENCRYPTION_KEY',
//     ]);

//     if (ENV !== 'development') {
//       this.ensureValues(['SENDGRID_API_KEY']);
//     }

//     const dataEncryptionKey = this.getDataEncryptionKey();
//     if (dataEncryptionKey.length !== DATA_ENCRYPTION_KEY_LENGTH) {
//       throw new Error(
//         `DATA_ENCRYPTION_KEY configuration variable should be exaclty ${DATA_ENCRYPTION_KEY_LENGTH} characters`,
//       );
//     }
//   }

//   public async init(): Promise<void> {
//     if (this.initialized) {
//       return;
//     }

//     this.initialized = true;

//     if (ENV !== 'development') {
//       const parsedDatabaseUrl =
//         this.envConfig.SQLAZURECONNSTR_SERVER.match(/^(.+?)\./gim);
//       let dbServerName = '';
//       if (parsedDatabaseUrl) {
//         dbServerName = parsedDatabaseUrl[0].slice(0, -1);
//       }

//       const dbPassword = await this.secretClient.getSecret(
//         `${dbServerName}-sqlServerAdminPassword`,
//       );
//       const dbUser = await this.secretClient.getSecret(
//         `${dbServerName}-sqlServerAdminUsername`,
//       );

//       this.envConfig.SQLAZURECONNSTR_PASSWORD = dbPassword.value;
//       this.envConfig.SQLAZURECONNSTR_USER = dbUser.value;
//     }

//     this.ensureValues([
//       'SQLAZURECONNSTR_SERVER',
//       'SQLAZURECONNSTR_PORT',
//       'SQLAZURECONNSTR_DATABASE',
//       'SQLAZURECONNSTR_USER',
//       'SQLAZURECONNSTR_PASSWORD',
//     ]);

//     const packageJson = await readFile(PACKAGE_JSON_PATH);
//     const { version } = tryParseJson<{ version: string }>(
//       packageJson.toString(),
//       { version: 'Unknown' },
//     );
//     this.applicationVersion = version;
//   }

//   private checkIfInitialised(): void {
//     if (!this.initialized) {
//       throw new Error('ConfigService not initialised.');
//     }
//   }

//   private ensureValues(keys: EnvConfigProperty[]): void {
//     keys.forEach((k) => this.getValue(k, true));
//   }

//   public getValue(key: EnvConfigProperty, throwOnMissing = true): string {
//     if (key === 'SQLAZURECONNSTR_PASSWORD' || key === 'SQLAZURECONNSTR_USER') {
//       this.checkIfInitialised();
//     }
//     const value = this.envConfig[key] || DEFAULT_ENV_VALUES[key];
//     if (!value && throwOnMissing) {
//       throw new Error(`config error - missing env.${key}`);
//     }
//     return value;
//   }

//   public getAll(): EnvConfig {
//     this.checkIfInitialised();
//     return this.envConfig;
//   }

//   public getPublicTypeOrmConfig(): TypeOrmModuleOptions {
//     const typeOrmConfig: TypeOrmModuleOptions = {
//       ...this.getCommonTypeOrmConfig('default'),
//       entities: [__dirname + '/../**/*.entity{.ts,.js}'],
//       migrations: [__dirname + '/../migrations/public/*{.ts,.js}'],
//       cli: {
//         migrationsDir: './src/migrations/public',
//       },
//       schema: DEFAULT_PUBLIC_ENTITY_SCHEMA_NAME,
//       migrationsRun: true,
//     };

//     return typeOrmConfig;
//   }

//   public getTenantTypeOrmConfig(tenantId?: number): TypeOrmModuleOptions {
//     const name =
//       typeof tenantId === 'number' ? `tenant_${tenantId}` : 'default';
//     const typeOrmConfig: TypeOrmModuleOptions = {
//       ...this.getCommonTypeOrmConfig(name),
//       entities: [
//         __dirname + '/../**/*.tenant-entity{.ts,.js}',
//         __dirname + '/../modules/user/user.entity{.ts,.js}',
//         __dirname + '/../modules/log-item/logItem.entity{.ts,.js}',
//       ],
//       migrations: [__dirname + '/../migrations/tenant/*{.ts,.js}'],
//       cli: {
//         migrationsDir: './src/migrations/tenant',
//       },
//       schema:
//         typeof tenantId === 'number'
//           ? `tenant_${tenantId}`
//           : DEFAULT_TENANT_ENTITY_SCHEMA_NAME,
//       migrationsRun: true,
//     };

//     return typeOrmConfig;
//   }

//   public getApplicationVersion(): string {
//     return this.applicationVersion;
//   }

//   public getSendGridApiKey(): string {
//     return this.getValue('SENDGRID_API_KEY', false);
//   }

//   public getDataEncryptionKey(): string {
//     return this.getValue('DATA_ENCRYPTION_KEY');
//   }

//   public getDevEmails(): string[] {
//     return tryParseJson<string[]>(this.getValue('DEV_EMAILS'), []);
//   }

//   public getAllowedCorsDomains(): string[] {
//     return tryParseJson<string[]>(this.getValue('ALLOWED_CORS_DOMAINS'), []);
//   }

//   public getSenderEmail(): string {
//     return this.getValue('SENDER_EMAIL');
//   }

//   public getAzureBearerStrategyOptions(): IBearerStrategyOption {
//     const tenantId = this.getValue('AUTH_TENANT_ID');
//     const clientId = this.getValue('AUTH_CLIENT_ID');

//     const options: IBearerStrategyOption = {
//       identityMetadata: `https://login.microsoftonline.com/${tenantId}/v2.0/.well-known/openid-configuration`,
//       clientID: clientId,
//       validateIssuer: true,
//       loggingLevel: 'error',
//     };

//     const audience = this.getValue('AUTH_AUDIENCE', false);
//     const issuer = this.getValue('AUTH_ISSUER', false);
//     if (audience) {
//       options.audience = audience;
//     }
//     if (issuer) {
//       options.issuer = issuer;
//     }

//     return options;
//   }

//   private getCommonTypeOrmConfig(
//     name: string,
//   ): Partial<TypeOrmModuleOptions> & Partial<SqlServerConnectionOptions> {
//     const cacheTime = Number(this.getValue('CACHE_TIME'));
//     const maxCacheSize = Number(this.getValue('MAX_CACHE_SIZE'));
//     const typeOrmConfig: Partial<TypeOrmModuleOptions> = {
//       name,
//       type: 'mssql',
//       host: this.getValue('SQLAZURECONNSTR_SERVER'),
//       port: Number(this.getValue('SQLAZURECONNSTR_PORT')),
//       username: this.getValue('SQLAZURECONNSTR_USER'),
//       password: this.getValue('SQLAZURECONNSTR_PASSWORD'),
//       database: this.getValue('SQLAZURECONNSTR_DATABASE'),
//       migrationsTableName: 'migrations',
//       synchronize: false,
//       options: {
//         encrypt: true,
//         enableArithAbort: false,
//       },
//       stream: true,
//       requestTimeout: 60000, // 1 minute
//       cache: {
//         provider: () =>
//           new FileQueryResultCache({
//             connectionName: name,
//             cacheTime,
//             maxCacheSize,
//           }),
//       },
//       // logging: ['query', 'error'],
//     };

//     return typeOrmConfig;
//   }

//   public getTypeOrmCacheOptions(): number {
//     const cacheTime = Number(this.getValue('CACHE_TIME'));
//     return cacheTime * 1000;
//   }
// }
