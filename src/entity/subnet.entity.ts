import { Column, Entity, PrimaryColumn } from 'typeorm';
import { IEntity } from './entity.interface';
import { AwsRegion } from '../adapter/controller/aws.dto';

@Entity('subnet_tb')
export class SubnetEntity implements IEntity {
  @PrimaryColumn({ name: 'subnet_id' })
  subnetId: string;

  @Column({ name: 'subnet_arn' })
  subnetArn: string;

  @Column({ name: 'vpc_id' })
  vpcId: string;

  @Column({ name: 'owner_id' })
  ownerId: string;

  @Column()
  state: string;

  @Column({ name: 'cidr_block' })
  cidrBlock: string;

  @Column({ name: 'default_for_az' })
  defaultForAz: boolean;

  @Column({ name: 'availability_zone' })
  availabilityZone: string;

  @Column({ name: 'availability_zone_id' })
  availabilityZoneId: string;

  @Column({ name: 'available_ip_address_count' })
  availableIpAddressCount: number;

  @Column({ name: 'enable_dns64' })
  enableDns64: boolean;

  @Column()
  region: AwsRegion;

  @Column({ name: 'update_time', type: 'bigint' })
  updateTime?: number;
}
