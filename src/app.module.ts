import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { VpcController } from './adapter/controller/vpc.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { VpcCommandHandler } from './usecase/command-handler/vpc.command.handler';
import { PostgresModule } from './config/postgres.module';
import { VpcPostgresAdapter } from './adapter/database/vpc.postgres.adapter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VpcEntity } from './entity/vpc.entity';
import { VpcMapper } from './mapper/vpc.mapper';
import { SubnetCommandHandler } from './usecase/command-handler/subnet.command.handler';
import { SubnetEntity } from './entity/subnet.entity';
import { SubnetPostgresAdapter } from './adapter/database/subnet.postgres.adapter';
import { SubnetMapper } from './mapper/subnet.mapper';
import { SubnetController } from './adapter/controller/subnet.controller';
import { VpcQueryHandler } from './usecase/query-handler/vpc.query.handler';
import { VpcRegionQueryHandler } from './usecase/query-handler/vpc-region.query.handler';
import { SubnetQueryHandler } from './usecase/query-handler/subnet.query.handler';
import { SubnetRegionQueryHandler } from './usecase/query-handler/subnet-region.query.handler';
import { ScheduleModule } from '@nestjs/schedule';
import { CronService } from './cron/cron.service';
import { AppController } from './app.controller';
import * as Joi from 'joi';

const mapper = [VpcMapper, SubnetMapper];
const handler = [
  VpcCommandHandler,
  SubnetCommandHandler,
  VpcQueryHandler,
  VpcRegionQueryHandler,
  SubnetQueryHandler,
  SubnetRegionQueryHandler,
];
const adapter = [VpcPostgresAdapter, SubnetPostgresAdapter];

@Module({
  imports: [
    CqrsModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        AWS_ACCESS_KEY_ID: Joi.string().required(),
        AWS_SECRET_ACCESS_KEY: Joi.string().required(),
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
      }),
    }),
    PostgresModule,
    TypeOrmModule.forFeature([VpcEntity, SubnetEntity]),
  ],
  controllers: [VpcController, SubnetController, AppController],
  providers: [...mapper, ...handler, ...adapter, CronService],
})
export class AppModule {}
