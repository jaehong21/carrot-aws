import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { VpcModel } from '../../model/vpc.model';
import { VpcPostgresAdapter } from '../../adapter/database/vpc.postgres.adapter';
import { VpcQuery } from '../query/vpc.query';

@Injectable()
@QueryHandler(VpcQuery)
export class VpcQueryHandler implements IQueryHandler<VpcQuery, VpcModel[]> {
  constructor(private readonly vpcPostgresAdapter: VpcPostgresAdapter) {}

  // private logger = new Logger('VPC_QUERY_HANDLER');

  async execute(query: VpcQuery): Promise<VpcModel[]> {
    return this.vpcPostgresAdapter.findVpc();
  }
}
