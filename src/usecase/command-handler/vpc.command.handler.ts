import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { VpcCommand } from '../command/vpc.command';
import * as AWS from 'aws-sdk';
import { AWSError } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { DescribeVpcsResult, Vpc } from 'aws-sdk/clients/ec2';
import { VpcModel } from '../../model/vpc.model';
import { VpcPostgresAdapter } from '../../adapter/database/vpc.postgres.adapter';

@Injectable()
@CommandHandler(VpcCommand)
export class VpcCommandHandler
  implements ICommandHandler<VpcCommand, boolean>, OnModuleInit
{
  constructor(
    private readonly configService: ConfigService,
    private readonly vpcPostgresAdapter: VpcPostgresAdapter,
  ) {}
  onModuleInit(): void {
    AWS.config.update({
      accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
    });
  }

  private logger = new Logger('VPC_COMMAND_HANDLER');

  async execute(command: VpcCommand): Promise<boolean> {
    const ec2 = new AWS.EC2({
      region: command.vpcCommandDto.region,
    });
    return new Promise<boolean>((resolve, reject) => {
      ec2.waitFor(
        'vpcExists',
        {},
        (err: AWSError, data: DescribeVpcsResult) => {
          if (err) {
            this.logger.debug(command.vpcCommandDto.region);
            this.logger.error(err, err.stack);
            reject(err);
          } else {
            this.logger.debug(
              `Find VPC on ${command.vpcCommandDto.region} Success`,
            );
            // this.logger.debug(data);
            data.Vpcs.map(async (vpc: Vpc) => {
              await this.vpcPostgresAdapter.saveVpc(
                new VpcModel({ ...vpc, Region: command.vpcCommandDto.region }),
              );
            });
            resolve(true);
          }
        },
      );
    });
  }
}
