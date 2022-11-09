import { IQuery } from '@nestjs/cqrs';
import { AwsRegion } from '../../adapter/controller/aws.dto';

type VpcRegionQueryDto = {
  region: AwsRegion;
};

export class VpcRegionQuery implements IQuery {
  constructor(readonly vpcRegionQueryDto: VpcRegionQueryDto) {}
}
