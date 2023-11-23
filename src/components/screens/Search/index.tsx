import {useState} from 'react';
import {Button, Text, TextInput} from 'react-native-paper';
import styled from '@emotion/native';
import moment from 'moment-jalaali';

import CouponCard from '@src/components/atoms/CouponCard';
import {CouponsRealmContext} from '@src/models';
import {Coupon} from '@src/models/Coupons';
import {spacing} from '@src/theme/units';

const {useObject, useRealm} = CouponsRealmContext;

const SearchScreen = () => {
  const [code, setCode] = useState<string>('');
  const [price, setPrice] = useState(0);
  const [calculatePrice, setCalculatePrice] = useState(0);

  const coupon = useObject(Coupon, code);
  const realm = useRealm();
  const isValid = moment(coupon?.expirationDate).isAfter(moment());
  const handleUpdateCoupon = () => {
    if (!coupon) {
      return;
    }
    realm.write(() => {
      coupon.isUsed = true;
    });
  };

  const handleCalculatePrice = () => {
    if (!coupon) {
      return;
    }
    if (coupon.discountPercentage) {
      const calcPrice =
        (Number(coupon.discountPercentage) * Number(price)) / 100;
      if (coupon.maximumPrice && calcPrice > Number(coupon.maximumPrice)) {
        setCalculatePrice(coupon.maximumPrice);
        return;
      }
      setCalculatePrice(calcPrice);
      return;
    } else if (coupon.discountAmount) {
      const calcPrice = Number(price) - Number(coupon.discountAmount);
      if (calcPrice < 0) {
        setCalculatePrice(0);
        return;
      }
      setCalculatePrice(calcPrice);
      return;
    }
    setCalculatePrice(price);
  };

  return (
    <Container>
      <Title variant="titleLarge">جستجوی کد تخفیف</Title>
      <TextInput
        mode="outlined"
        placeholder="کد تخفیف را وارد کنید"
        onChangeText={setCode}
      />
      <CouponContent>
        {coupon ? (
          <>
            {/* @ts-ignore*/}
            <CouponCard {...coupon} />
            <Title variant="titleMedium">محاسبه قیمت</Title>
            <TextInput
              onBlur={handleCalculatePrice}
              mode="outlined"
              placeholder="مبلغ کل را وارد کنید"
              onChangeText={e => setPrice(Number(e))}
            />
            <PriceText variant={'titleMedium'}>
              قیمت با اعمال تخفیف: {calculatePrice.toLocaleString('fa')} تومان
            </PriceText>
          </>
        ) : null}
      </CouponContent>
      <Button
        disabled={!isValid || coupon?.isUsed}
        onPress={handleUpdateCoupon}
        mode="contained">
        استفاده از کد تخفیف
      </Button>
    </Container>
  );
};

export default SearchScreen;

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

const CouponContent = styled.View(() => ({
  flex: 1,
  width: '100%',
  paddingVertical: spacing(2),
}));

const PriceText = styled(Text)(() => ({
  textAlign: 'right',
  marginTop: spacing(1),
}));
