import { IQuery } from '@nestjs/cqrs';

type SubnetQueryDto = {};

export class SubnetQuery implements IQuery {
  constructor(readonly subnetQueryDto: SubnetQueryDto) {}
}
