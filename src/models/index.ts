import {createRealmContext, Realm} from '@realm/react';

import {Coupon} from './Coupons';

Realm.copyBundledRealmFiles();

export const CouponsRealmContext = createRealmContext({
  schema: [Coupon],
  path: 'bundle.realm',
});
