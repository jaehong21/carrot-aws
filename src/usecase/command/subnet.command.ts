import { ICommand } from '@nestjs/cqrs';
import { AwsRegion } from '../../adapter/controller/aws.dto';

type SubnetCommandDto = {
  // vpcList: VpcList;
  region: AwsRegion;
};

export class SubnetCommand implements ICommand {
  constructor(readonly subnetCommandDto: SubnetCommandDto) {}
}
