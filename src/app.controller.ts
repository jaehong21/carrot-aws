import { Controller, Get } from '@nestjs/common';
import { AwsRegion } from './adapter/controller/aws.dto';

@Controller()
export class AppController {
  @Get()
  healthCheck(): string {
    return 'OK';
  }

  @Get('/region')
  findRegion(): any {
    return AwsRegion;
  }
}
