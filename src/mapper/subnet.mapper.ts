import { IMapper } from './mapper.interface';
import { SubnetModel } from '../model/subnet.model';
import { SubnetEntity } from '../entity/subnet.entity';

export class SubnetMapper implements IMapper<SubnetModel, SubnetEntity> {
  createEntity(model: SubnetModel): SubnetEntity {
    return model.properties();
  }
  createModel(entity: SubnetEntity): SubnetModel {
    return new SubnetModel({
      VpcId: entity.vpcId,
      OwnerId: entity.ownerId,
      State: entity.state,
      SubnetId: entity.subnetId,
      SubnetArn: entity.subnetArn,
      CidrBlock: entity.cidrBlock,
      DefaultForAz: entity.defaultForAz,
      AvailabilityZone: entity.availabilityZone,
      AvailabilityZoneId: entity.availabilityZoneId,
      AvailableIpAddressCount: entity.availableIpAddressCount,
      EnableDns64: entity.enableDns64,
      Region: entity.region,
      UpdateTime: entity.updateTime,
    });
  }
}
