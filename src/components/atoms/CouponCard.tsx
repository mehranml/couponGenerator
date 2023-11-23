import type {ViewProps} from 'react-native';
import {Pressable} from 'react-native';
import {Text} from 'react-native-paper';
import styled from '@emotion/native';
import type {Theme} from '@emotion/react';
import moment from 'moment-jalaali';

import type {Coupon} from '@src/models/Coupons';
import {spacing} from '@src/theme/units';

type CouponCardProps = Coupon & {
  index?: number;
  onDelete: (code: string) => void;
};

const CouponCard = ({
  code,
  discountPercentage,
  discountAmount,
  maximumPrice,
  expirationDate,
  isUsed,
  onDelete,
  index,
}: CouponCardProps) => {
  const remainTime = moment(expirationDate).locale('fa').fromNow(true);
  const isValid = moment(expirationDate).isAfter(moment());

  return (
    <CouponItemContainer onLongPress={() => onDelete(code)}>
      {index !== undefined ? (
        <Text variant="titleLarge">.{(index + 1).toLocaleString('fa')}</Text>
      ) : null}
      <Content valid={isValid}>
        <Text variant="titleLarge">کد تخفیف: {code}</Text>
        {discountPercentage ? (
          <Text variant="bodyLarge">
            درصد تخفیف: ٪{discountPercentage.toLocaleString('fa')}
          </Text>
        ) : null}
        {discountAmount ? (
          <Text variant="bodyLarge">
            مبلغ تخفیف:{discountAmount.toLocaleString('fa')} تومان
          </Text>
        ) : null}
        {maximumPrice ? (
          <Text variant="bodyLarge">
            حداکثر تخفیف: {maximumPrice.toLocaleString('fa')} تومان
          </Text>
        ) : null}
        {expirationDate ? (
          <Text variant="bodyLarge">
            انقضا:
            {isValid ? remainTime : ' منقضی شده'}
          </Text>
        ) : null}
        <Text variant="bodyLarge">
          وضعیت: {isUsed ? 'استفاده شده' : 'استفاده نشده'}
        </Text>
      </Content>
    </CouponItemContainer>
  );
};

export default CouponCard;

type ContentProps = ViewProps & {valid?: boolean; theme?: Theme};

const Content = styled.View((props: ContentProps) => ({
  flex: 1,
  alignItems: 'flex-end',
  backgroundColor: props.valid
    ? props.theme?.colors.primaryContainer
    : props.theme?.colors.surfaceDisabled,

  borderRadius: spacing(1),
  padding: spacing(2),
  gap: spacing(1),
}));
const CouponItemContainer = styled(Pressable)(() => ({
  width: '100%',
  flexDirection: 'row-reverse',
  gap: spacing(0.5),
  marginBottom: spacing(2),
}));
