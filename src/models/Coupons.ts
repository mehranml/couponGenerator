import {Realm} from '@realm/react';

export class Coupon extends Realm.Object<Coupon> {
  code!: string;
  maximumPrice?: number;
  discountPercentage?: number;
  discountAmount?: number;
  expirationDate?: Date;
  isUsed!: boolean;
  static schema: Realm.ObjectSchema = {
    name: 'Coupon',
    primaryKey: 'code',
    properties: {
      code: 'string',
      maximumPrice: {type: 'int', optional: true, default: 0},
      discountPercentage: {type: 'int', optional: true, default: 0},
      discountAmount: {type: 'int', optional: true, default: 0},
      expirationDate: {type: 'date'},
      isUsed: {type: 'bool', default: false},
    },
  };
  constructor(
    realm: Realm,
    code: string,
    expirationDate: Date,
    maximumPrice?: number,
    discountPercentage?: number,
    discountAmount?: number,
    isUsed: boolean = false,
  ) {
    super(realm, {
      code,
      expirationDate,
      maximumPrice,
      discountPercentage,
      discountAmount,
      isUsed,
    });
  }
}
