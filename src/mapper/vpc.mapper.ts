import { IMapper } from './mapper.interface';
import { VpcModel } from '../model/vpc.model';
import { VpcEntity } from '../entity/vpc.entity';

export class VpcMapper implements IMapper<VpcModel, VpcEntity> {
  createEntity(model: VpcModel): VpcEntity {
    return model.properties();
  }
  createModel(entity: VpcEntity): VpcModel {
    return new VpcModel({
      VpcId: entity.vpcId,
      Region: entity.region,
      CidrBlock: entity.cidrBlock,
      OwnerId: entity.ownerId,
      State: entity.state,
      IsDefault: entity.isDefault,
      UpdateTime: entity.updateTime,
    });
  }
}
