import {Alert, FlatList} from 'react-native';
import {Button, Text} from 'react-native-paper';
import styled from '@emotion/native';
import {Realm} from '@realm/react';

import CouponCard from '@src/components/atoms/CouponCard';
import {CouponsRealmContext} from '@src/models';
import {Coupon} from '@src/models/Coupons';
import {spacing} from '@src/theme/units';

const {useQuery, useRealm} = CouponsRealmContext;

const CouponsScreen = () => {
  const realm = useRealm();
  const coupons = useQuery(Coupon, c =>
    c.sorted('isUsed', false).sorted('expirationDate', true),
  );

  const handleDelete = (code: string) => {
    const coupon = realm.objectForPrimaryKey(Coupon, code);

    Alert.alert('حذف کد تخفیف', 'آیا از حذف کد تخفیف مطمئن هستید؟', [
      {
        text: 'بله',
        onPress: () => {
          realm.write(() => {
            realm.delete(coupon);
          });
        },
      },
      {
        text: 'خیر',
      },
    ]);
  };

  return (
    <Container>
      <Title variant="titleLarge">کد های تخفیف</Title>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={coupons}
        renderItem={({item, index}) => (
          // @ts-ignore
          <CouponCard index={index} onDelete={handleDelete} {...item} />
        )}
      />
    </Container>
  );
};

export default CouponsScreen;

const Container = styled.View(props => ({
  flex: 1,
  width: '100%',
  backgroundColor: props.theme.colors.background,
  paddingHorizontal: spacing(2),
  paddingVertical: spacing(4),
}));

const Title = styled(Text)(() => ({
  textAlign: 'right',
  marginBottom: spacing(2),
}));
