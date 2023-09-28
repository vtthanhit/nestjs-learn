import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import config from './config/config';
import { UserModule } from './modules/user/user.module';
import { MailModule } from './mailer/mail.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { FormattedExecutionResult, GraphQLFormattedError } from 'graphql';
import { formatGraphqlError, formatResponse } from './common/utils/format.util';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [config], isGlobal: true }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      useFactory: () => ({
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        context: ({ req, res }) => ({ req, res }),
        stringifyResult: (response: FormattedExecutionResult) =>
          formatResponse(response),
        formatError: (error: GraphQLFormattedError) =>
          formatGraphqlError(error),
      }),
      driver: ApolloDriver,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.db'),
        entities: ['dist/modules/**/entities/*.entity.js'],
        logging: 'all',
        synchronize: false,
        autoLoadEntities: true,
        charset: 'utf8mb4_general_ci',
        supportBigNumbers: true,
        bigNumberStrings: false,
      }),
      inject: [ConfigService],
    }),
    EventEmitterModule.forRoot(),
    MailModule,
    UserModule,
  ],
})
export class AppModule {}
