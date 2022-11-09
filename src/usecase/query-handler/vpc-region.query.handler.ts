import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { VpcModel } from '../../model/vpc.model';
import { VpcPostgresAdapter } from '../../adapter/database/vpc.postgres.adapter';
import { VpcRegionQuery } from '../query/vpc-region.query';

@Injectable()
@QueryHandler(VpcRegionQuery)
export class VpcRegionQueryHandler
  implements IQueryHandler<VpcRegionQuery, VpcModel[]>
{
  constructor(private readonly vpcPostgresAdapter: VpcPostgresAdapter) {}

  // private logger = new Logger('VPC_REGION_QUERY_HANDLER');

  async execute(query: VpcRegionQuery): Promise<VpcModel[]> {
    return this.vpcPostgresAdapter.findVpcByRegion(
      query.vpcRegionQueryDto.region,
    );
  }
}
