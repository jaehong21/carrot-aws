import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { VpcEntity } from '../entity/vpc.entity';
import { SubnetEntity } from '../entity/subnet.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('POSTGRES_HOST'),
        port: 5432,
        username: configService.get<string>('POSTGRES_USER'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: 'postgres',
        // entities: [join(__dirname, '..', '..', '**/*.entity.{js,ts}')],
        entities: [VpcEntity, SubnetEntity],
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
  ],
})
export class PostgresModule {}
