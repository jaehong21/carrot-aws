## Table of Contents 
[Preparation](#Preparation) <br />
[Running the app](#Running-the-app) <br />
[Documentation](#Documentation) <br />
[Description](#Description) <br />
[Contact](#Contact)

## Introduction

<a href="https://aws.amazon.com/" target="blank"><img src="https://voicefoundry.com/wp-content/uploads/2018/09/feature-aws.jpg" width="300" alt="Nest Logo" /></a>

[//]: # (<a href="https://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="140" alt="Nest Logo" /></a>)
NestJS is a progressive Node.js Framework
<br />
carrot-aws provides you simple VPC and Subnet information on AWS 

## Preparation

<span style="color:gray">docker-compose.yaml</span> <br />
1. Fill `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` for the AWS account you want to access
2. Check port **_3000_** and **_5432_** is empty on your environment
3. You can set your own `POSTGRES_USER` and `POSTGRES_PASSWORD`
4. You can uncomment volumes to save further information on docker volumes

```yaml
version: "3"

services:
  carrot-aws:
    depends_on:
      - postgres
    build:
      context: .
      dockerfile: ./Dockerfile
    container_name: carrot-aws
    ports:
      - "3000:3000"
    links:
      - postgres:postgres
    environment:
      AWS_ACCESS_KEY_ID: xxx
      AWS_SECRET_ACCESS_KEY: xxx
      POSTGRES_HOST: postgres
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password

  postgres:
    image: postgres
    restart: unless-stopped
    container_name: postgres
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
#   volumes:
#     - ./postgresql/:/var/lib/postgresql/data
```

## Running the app
### with docker
Make sure there is no existing postgres image.
Already existing postgres image can cause error because
different credentials with given values in docker-compose.yaml
```bash
# (Optional) prune existing docker images before running the app 
$ docker-compose down --rmi all

# docker run (foreground)
$ docker-compose up

# docker run (background)
$ docker-compose up -d 
```
<br />

### without docker
```bash
# npm i -g @nestjs/cli

# development
$ nest start --watch

# production
$ yarn start:prod
```
Postgresql with database name 'postgres' needed and <br />
.env file is needed with values below
```dotenv
AWS_ACCESS_KEY_ID=xxx
AWS_SECRET_ACCESS_KEY=xxx
POSTGRES_HOST=xxx
POSTGRES_USER=xxx
POSTGRES_PASSWORD=xxx
```

## Documentation

**GET** /
```bash
# Simple Health Check API returns "OK"
$ curl --request GET 'localhost:3000'
```

**GET** /region
```bash
# Get list of valid AWS regions
$ curl --request GET 'localhost:3000/region'
```
<br />

**GET** /vpc
```bash
# Get VPC information from all region
$ curl --request GET 'localhost:3000/vpc'
```

**GET** /vpc/{region}
```bash
# Get VPC information for given AWS region
$ curl --request GET 'localhost:3000/vpc/ap-northeast-2'
```

**GET** /subnet
```bash
# Get Subnet information from all region
$ curl --request GET 'localhost:3000/subnet'
```

**GET** /subnet/{region}
```bash
# Get Subnet information for given AWS region
$ curl --request GET 'localhost:3000/subnet/ap-northeast-2'
```
<br />

**POST** /vpc/{region}
```bash
# Update VPC information for given AWS region
$ curl --request POST 'localhost:3000/vpc/ap-northeast-2'
```
**POST** /subnet/{region}
```bash
# Update Subnet information for given AWS region
$ curl --request POST 'localhost:3000/subnet/ap-northeast-2'
```

## Description
```bash
├── adapter
│   ├── controller
│   └── database
├── app.module.ts
├── config
├── cron
├── entity
├── main.ts
├── mapper
├── model
└── usecase
    ├── command
    ├── command-handler
    ├── query
    └── query-handler
```
### Adapter
```bash
├── adapter
    ├── controller
    └── database
```
```typescript
  // vpc.controller.ts

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
```
Adapter contains implementation of **controller** and **repository**
Which can be easily convertible to other controllers and repositories.
(Port & Adapter is still working on)

### Usecase (Query & Command)
```typescript
// Command
type VpcCommandDto = {
  region: AwsRegion;
};
export class VpcCommand implements ICommand {
  constructor(readonly vpcCommandDto: VpcCommandDto) {}
}

// CommandHandler
@Injectable()
@CommandHandler(VpcCommand)
export class VpcCommandHandler
  implements ICommandHandler<VpcCommand, boolean>, OnModuleInit
{
  
  // ...

  async execute(command: VpcCommand): Promise<boolean> {
    const ec2 = new AWS.EC2({
      region: command.vpcCommandDto.region,
    });
    return new Promise<boolean>((resolve, reject) => {
      // ...
    });
  }
}
```
Usecase is based on CQRS pattern which is composed with command and query. 
Supported by @nestjs/cqrs package, it broadcasts Command/Query/Event

### Model
```typescript
export class VpcModel implements VpcType, IModel {
  constructor(properties: VpcType) {
    Object.assign(this, properties);
  }

  VpcId: string;
  CidrBlock: string;
  DhcpOptionsId: string;
  
  // ...
  
  properties() {
    return {
      vpcId: this.VpcId,
      // ...
    };
  }
}

```
Model is similar to the concept of Domain.
Which is the key and the base of the program.

### Entity
```typescript
@Entity('vpc_tb')
export class VpcEntity implements IEntity {
  @PrimaryColumn({ name: 'vpc_id' })
  vpcId: string;
  
  // ...
  
  @Column({ name: 'update_time', type: 'bigint' })
  updateTime?: number;
}
```
Implementation of Entity in Postgresql database.
There are specific database configuration on `config` folder.

### Mapper
```typescript
export abstract class IMapper<T, E> {
  abstract createEntity(T: IModel): E;
  abstract createModel(E: IEntity): T;
}
```
Mapper that converts between Model(Domain) and Entity

### Cron
```typescript
@Cron(CronExpression.EVERY_5_MINUTES)
  async handleCron() {
    this.logger.debug('Executing cron expression');
    Object.values(AwsRegion).map(async (region) => {
      await this.commandBus.execute(
        new VpcCommand({ region: <AwsRegion>region }),
      );
      await this.commandBus.execute(
        new SubnetCommand({ region: <AwsRegion>region }),
      );
    });
  }
```
Guarantees update VPC & Subnet information for every 5 minutes



## Contact

- Author - Jung Jaehong
- Portfolio - [https://www.notion.so/jaehong21](https://www.notion.so/jaehong21/Jaehong-Jung-371e37a4015a4189bc329b419cc241c7)
- LinkedIn - [jaehong21](https://www.linkedin.com/in/jaehong21/)

## License

Nest is [MIT licensed](). <br />
