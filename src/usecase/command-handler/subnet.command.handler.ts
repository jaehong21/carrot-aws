import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import * as AWS from 'aws-sdk';
import { AWSError } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { DescribeSubnetsResult, Subnet } from 'aws-sdk/clients/ec2';
import { SubnetCommand } from '../command/subnet.command';
import { SubnetPostgresAdapter } from '../../adapter/database/subnet.postgres.adapter';
import { SubnetModel } from '../../model/subnet.model';

@Injectable()
@CommandHandler(SubnetCommand)
export class SubnetCommandHandler
  implements ICommandHandler<SubnetCommand, boolean>, OnModuleInit
{
  constructor(
    private readonly configService: ConfigService,
    private readonly subnetPostgresAdapter: SubnetPostgresAdapter,
  ) {}
  onModuleInit(): void {
    AWS.config.update({
      accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
    });
  }

  private logger = new Logger('SUBNET_COMMAND_HANDLER');

  async execute(command: SubnetCommand): Promise<boolean> {
    const ec2 = new AWS.EC2({
      region: command.subnetCommandDto.region,
    });
    return new Promise<boolean>((resolve, reject) => {
      ec2.waitFor(
        'subnetAvailable',
        {},
        (err: AWSError, data: DescribeSubnetsResult) => {
          if (err) {
            this.logger.error(err, err.stack);
            reject(err);
          } else {
            this.logger.debug(
              `Find Subnet on ${command.subnetCommandDto.region} Success`,
            );
            // this.logger.debug(data);
            data.Subnets.map(async (subnet: Subnet) => {
              await this.subnetPostgresAdapter.saveSubnet(
                new SubnetModel({
                  ...subnet,
                  Region: command.subnetCommandDto.region,
                }),
              );
            });
            resolve(true);
          }
        },
      );
    });
  }
}
