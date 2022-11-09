import { Controller, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AwsRegionDto, ResponseDto } from './aws.dto';
import { SubnetCommand } from '../../usecase/command/subnet.command';
import { SubnetQuery } from '../../usecase/query/subnet.query';
import { SubnetRegionQuery } from '../../usecase/query/subnet-region.query';

@Controller('/subnet')
export class SubnetController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  // private logger = new Logger('VPC_CONTROLLER');

  @Get()
  async findSubnet(): Promise<ResponseDto> {
    const subnetQuery = new SubnetQuery({});
    const data = await this.queryBus.execute(subnetQuery);
    return {
      status: 200,
      message: 'Find All Subnet Success',
      data,
    };
  }

  @Get('/:region')
  async findSubnetByRegion(
    @Param() awsRegionDto: AwsRegionDto,
  ): Promise<ResponseDto> {
    const subnetRegionQuery = new SubnetRegionQuery({
      region: awsRegionDto.region,
    });
    const data = await this.queryBus.execute(subnetRegionQuery);
    return {
      status: 200,
      message: `Find All Subnet on ${awsRegionDto.region} Success`,
      data,
    };
  }

  @Post('/:region')
  async saveSubnet(@Param() awsRegionDto: AwsRegionDto): Promise<ResponseDto> {
    const subnetCommand = new SubnetCommand({ region: awsRegionDto.region });
    await this.commandBus.execute(subnetCommand);
    return {
      status: 201,
      message: 'Subnet List Saved Success',
      data: {},
    };
  }
}
