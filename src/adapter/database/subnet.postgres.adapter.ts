import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubnetMapper } from '../../mapper/subnet.mapper';
import { SubnetEntity } from '../../entity/subnet.entity';
import { SubnetModel } from '../../model/subnet.model';
import { AwsRegion } from '../controller/aws.dto';

@Injectable()
export class SubnetPostgresAdapter {
  constructor(
    private subnetMapper: SubnetMapper,
    @InjectRepository(SubnetEntity)
    private subnetRepository: Repository<SubnetEntity>,
  ) {}

  async saveSubnet(subnet: SubnetModel): Promise<SubnetModel> {
    const entity = await this.subnetRepository.save(
      this.subnetMapper.createEntity(subnet),
    );
    return this.subnetMapper.createModel(entity);
  }

  async findSubnet(): Promise<SubnetModel[]> {
    const model_list: SubnetModel[] = [];
    const entity_list = await this.subnetRepository.find();
    entity_list.map((entity) => {
      model_list.push(this.subnetMapper.createModel(entity));
    });
    return model_list;
  }

  async findSubnetByRegion(region: AwsRegion): Promise<SubnetModel[]> {
    const model_list: SubnetModel[] = [];
    const entity_list = await this.subnetRepository.find({
      where: { region },
    });
    entity_list.map((entity) => {
      model_list.push(this.subnetMapper.createModel(entity));
    });
    return model_list;
  }
}
