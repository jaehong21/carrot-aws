import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VpcEntity } from '../../entity/vpc.entity';
import { Repository } from 'typeorm';
import { VpcModel } from '../../model/vpc.model';
import { VpcMapper } from '../../mapper/vpc.mapper';
import { AwsRegion } from '../controller/aws.dto';

@Injectable()
export class VpcPostgresAdapter {
  constructor(
    private vpcMapper: VpcMapper,
    @InjectRepository(VpcEntity) private vpcRepository: Repository<VpcEntity>,
  ) {}

  async saveVpc(vpc: VpcModel): Promise<VpcModel> {
    const entity = await this.vpcRepository.save(
      this.vpcMapper.createEntity(vpc),
    );
    return this.vpcMapper.createModel(entity);
  }

  async findVpc(): Promise<VpcModel[]> {
    const model_list: VpcModel[] = [];
    const entity_list = await this.vpcRepository.find();
    entity_list.map((entity) => {
      model_list.push(this.vpcMapper.createModel(entity));
    });
    return model_list;
  }

  async findVpcByRegion(region: AwsRegion): Promise<VpcModel[]> {
    const model_list: VpcModel[] = [];
    const entity_list = await this.vpcRepository.find({
      where: { region },
    });
    entity_list.map((entity) => {
      model_list.push(this.vpcMapper.createModel(entity));
    });
    return model_list;
  }
}
