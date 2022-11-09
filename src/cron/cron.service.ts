import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AwsRegion } from '../adapter/controller/aws.dto';
import { VpcCommand } from '../usecase/command/vpc.command';
import { SubnetCommand } from '../usecase/command/subnet.command';

@Injectable()
export class CronService implements OnApplicationBootstrap {
  constructor(private readonly commandBus: CommandBus) {}
  async onApplicationBootstrap(): Promise<void> {
    await this.handleCron();
  }

  private logger = new Logger('CRON_SERVICE');

  @Cron(CronExpression.EVERY_5_MINUTES)
  async handleCron() {
    this.logger.debug('Executing cron expression');
    Object.values(AwsRegion).map(async (region) => {
      await this.commandBus.execute(
        new VpcCommand({ region: <AwsRegion>region }),
      );
      await this.commandBus.execute(
        new SubnetCommand({ region: <AwsRegion>region }),
      );
    });
  }
}
