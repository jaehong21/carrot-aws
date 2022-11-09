import { IsEnum } from 'class-validator';

export class ResponseDto {
  status: number;
  message: string;
  data: any;
}

export enum AwsRegion {
  US_EAST_2 = 'us-east-2',
  US_EAST_1 = 'us-east-1',
  US_WEST_1 = 'us-west-1',
  US_WEST_2 = 'us-west-2',
  // AFRICA_SOUTH_1 = 'af-south-1',
  // ASIA_EAST_1 = 'ap-east-1',
  ASIA_SOUTHEAST_1 = 'ap-southeast-1',
  ASIA_SOUTHEAST_2 = 'ap-southeast-2',
  // ASIA_SOUTHEAST_3 = 'ap-southeast-3',
  ASIA_SOUTH_1 = 'ap-south-1',
  ASIA_NORTHEAST_3 = 'ap-northeast-3',
  ASIA_NORTHEAST_2 = 'ap-northeast-2',
  ASIA_NORTHEAST_1 = 'ap-northeast-1',
  CA_CENTRAL_1 = 'ca-central-1',
  EU_CENTRAL_1 = 'eu-central-1',
  EU_WEST_1 = 'eu-west-1',
  EU_WEST_2 = 'eu-west-2',
  EU_WEST_3 = 'eu-west-3',
  // EU_SOUTH_1 = 'eu-south-1',
  EU_NORTH_1 = 'eu-north-1',
  // ME_SOUTH_1 = 'me-south-1',
  // ME_CENTRAL_1 = 'me-central-1',
  SA_EAST_1 = 'sa-east-1',
  // US_GOV_EAST_1 = 'us-gov-east-1',
  // US_GOV_WEST_2 = 'us-gov-west-1',
}

export class AwsRegionDto {
  @IsEnum(AwsRegion)
  region: AwsRegion;
}
