import { Controller, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { VpcCommand } from '../../usecase/command/vpc.command';
import { AwsRegionDto, ResponseDto } from './aws.dto';
import { VpcQuery } from '../../usecase/query/vpc.query';
import { VpcRegionQuery } from '../../usecase/query/vpc-region.query';

@Controller('/vpc')
export class VpcController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  // private logger = new Logger('VPC_CONTROLLER');

  @Get()
  async findVpc(): Promise<ResponseDto> {
    const vpcQuery = new VpcQuery({});
    const data = await this.queryBus.execute(vpcQuery);
    return {
      status: 200,
      message: 'Find All VPC Success',
      data,
    };
  }

  @Get('/:region')
  async findVpcByRegion(
    @Param() awsRegionDto: AwsRegionDto,
  ): Promise<ResponseDto> {
    const vpcRegionQuery = new VpcRegionQuery({ region: awsRegionDto.region });
    const data = await this.queryBus.execute(vpcRegionQuery);
    return {
      status: 200,
      message: `Find All VPC on ${awsRegionDto.region} Success`,
      data,
    };
  }

  @Post('/:region')
  async saveVpc(@Param() awsRegionDto: AwsRegionDto): Promise<ResponseDto> {
    const vpcCommand = new VpcCommand({ region: awsRegionDto.region });
    await this.commandBus.execute(vpcCommand);
    return {
      status: 201,
      message: 'VPC List Saved Success',
      data: {},
    };
  }
}
