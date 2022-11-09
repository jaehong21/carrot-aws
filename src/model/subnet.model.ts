import {
  PrivateDnsNameOptionsOnLaunch,
  Subnet,
  SubnetIpv6CidrBlockAssociationSet,
} from 'aws-sdk/clients/ec2';
import { IModel } from './model.interface';
import { AwsRegion } from '../adapter/controller/aws.dto';

export interface SubnetType extends Subnet {
  Region: AwsRegion;
  UpdateTime?: number;
}
export class SubnetModel implements SubnetType, IModel {
  constructor(properties: SubnetType) {
    Object.assign(this, properties);
    if (!properties.UpdateTime) {
      this.UpdateTime = Date.now();
    }
  }

  VpcId: string;
  OwnerId: string;
  State: string;
  SubnetId: string;
  SubnetArn: string;
  CidrBlock: string;
  DefaultForAz: boolean;
  AvailabilityZone: string;
  AvailabilityZoneId: string;
  AvailableIpAddressCount: number;
  EnableDns64: boolean;
  Ipv6Native: boolean;
  AssignIpv6AddressOnCreation: boolean;
  Ipv6CidrBlockAssociationSet: SubnetIpv6CidrBlockAssociationSet;
  PrivateDnsNameOptionsOnLaunch: PrivateDnsNameOptionsOnLaunch;
  Tags: { Key: string; Value: string }[];

  Region: AwsRegion;
  UpdateTime?: number;

  properties() {
    return {
      vpcId: this.VpcId,
      ownerId: this.OwnerId,
      state: this.State,
      subnetId: this.SubnetId,
      subnetArn: this.SubnetArn,
      cidrBlock: this.CidrBlock,
      defaultForAz: this.DefaultForAz,
      availabilityZone: this.AvailabilityZone,
      availabilityZoneId: this.AvailabilityZoneId,
      availableIpAddressCount: this.AvailableIpAddressCount,
      enableDns64: this.EnableDns64,

      region: this.Region,
      updateTime: this.UpdateTime,
    };
  }
}
