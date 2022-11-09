import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SubnetRegionQuery } from '../query/subnet-region.query';
import { SubnetModel } from '../../model/subnet.model';
import { SubnetPostgresAdapter } from '../../adapter/database/subnet.postgres.adapter';

@Injectable()
@QueryHandler(SubnetRegionQuery)
export class SubnetRegionQueryHandler
  implements IQueryHandler<SubnetRegionQuery, SubnetModel[]>
{
  constructor(private readonly subnetPostgresAdapter: SubnetPostgresAdapter) {}

  // private logger = new Logger('VPC_REGION_QUERY_HANDLER');

  async execute(query: SubnetRegionQuery): Promise<SubnetModel[]> {
    return this.subnetPostgresAdapter.findSubnetByRegion(
      query.subnetRegionQueryDto.region,
    );
  }
}
