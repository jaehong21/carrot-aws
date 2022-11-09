import { Column, Entity, PrimaryColumn } from 'typeorm';
import { IEntity } from './entity.interface';
import { AwsRegion } from '../adapter/controller/aws.dto';

@Entity('vpc_tb')
export class VpcEntity implements IEntity {
  @PrimaryColumn({ name: 'vpc_id' })
  vpcId: string;

  @Column({ name: 'cidr_block' })
  cidrBlock: string;

  @Column({ name: 'owner_id' })
  ownerId: string;

  @Column()
  state: string;

  @Column({ name: 'is_default', default: false })
  isDefault: boolean;

  @Column()
  region: AwsRegion;

  @Column({ name: 'update_time', type: 'bigint' })
  updateTime?: number;
}
