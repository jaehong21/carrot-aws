import { IQuery } from '@nestjs/cqrs';

type VpcQueryDto = {};

export class VpcQuery implements IQuery {
  constructor(readonly vpcQueryDto: VpcQueryDto) {}
}
