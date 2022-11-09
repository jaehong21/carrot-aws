import { IQuery } from '@nestjs/cqrs';
import { AwsRegion } from '../../adapter/controller/aws.dto';

type SubnetRegionQueryDto = {
  region: AwsRegion;
};

export class SubnetRegionQuery implements IQuery {
  constructor(readonly subnetRegionQueryDto: SubnetRegionQueryDto) {}
}
