import {
  Vpc,
  VpcCidrBlockAssociationSet,
  VpcIpv6CidrBlockAssociationSet,
} from 'aws-sdk/clients/ec2';
import { IModel } from './model.interface';
import { AwsRegion } from '../adapter/controller/aws.dto';

export interface VpcType extends Vpc {
  Region: AwsRegion;
  UpdateTime?: number;
}
export class VpcModel implements VpcType, IModel {
  constructor(properties: VpcType) {
    Object.assign(this, properties);
    if (!properties.UpdateTime) {
      this.UpdateTime = Date.now();
    }
  }

  VpcId: string;
  CidrBlock: string;
  DhcpOptionsId: string;
  // InstanceTenancy: string;
  IsDefault: boolean;
  State: string;
  OwnerId: string;
  Ipv6CidrBlockAssociationSet: VpcIpv6CidrBlockAssociationSet;
  CidrBlockAssociationSet: VpcCidrBlockAssociationSet;
  Tags: { Key: string; Value: string }[];

  Region: AwsRegion;
  UpdateTime?: number;

  properties() {
    return {
      vpcId: this.VpcId,
      cidrBlock: this.CidrBlock,
      ownerId: this.OwnerId,
      state: this.State,
      isDefault: this.IsDefault,

      region: this.Region,
      updateTime: this.UpdateTime,
    };
  }
}
