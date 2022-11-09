import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SubnetQuery } from '../query/subnet.query';
import { SubnetModel } from '../../model/subnet.model';
import { SubnetPostgresAdapter } from '../../adapter/database/subnet.postgres.adapter';

@Injectable()
@QueryHandler(SubnetQuery)
export class SubnetQueryHandler
  implements IQueryHandler<SubnetQuery, SubnetModel[]>
{
  constructor(private readonly subnetPostgresAdapter: SubnetPostgresAdapter) {}

  // private logger = new Logger('SUBNET_QUERY_HANDLER');

  async execute(query: SubnetQuery): Promise<SubnetModel[]> {
    return this.subnetPostgresAdapter.findSubnet();
  }
}
