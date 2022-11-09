import { ICommand } from '@nestjs/cqrs';
import { AwsRegion } from '../../adapter/controller/aws.dto';

type VpcCommandDto = {
  // vpcList: VpcList;
  region: AwsRegion;
};

export class VpcCommand implements ICommand {
  constructor(readonly vpcCommandDto: VpcCommandDto) {}
}
