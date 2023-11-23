import {useMemo, useState} from 'react';
import {KeyboardAvoidingView, TouchableOpacity, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {Button, Text, TextInput} from 'react-native-paper';
import styled from '@emotion/native';
import moment from 'moment-jalaali';

import {discountCodeGen} from '@src/generators/codeGen';
import {CouponsRealmContext} from '@src/models';
import {Coupon} from '@src/models/Coupons';
import {spacing} from '@src/theme/units';

const {useRealm} = CouponsRealmContext;

const Generate = () => {
  const [percent, setPercent] = useState(0);
  const [price, setPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [code, setCode] = useState<string | null>(null);
  const [date, setDate] = useState<Date>(moment().add(30, 'day').toDate());
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');

  const realm = useRealm();

  const disabled = useMemo(
    () => percent === 0 && price === 0,
    [percent, price],
  );

  const handleGenerateCode = () => {
    if (percent === 0 && price === 0) {
      return;
    }
    const c = discountCodeGen();
    setCode(c);
  };

  const handleSaveCode = () => {
    if (!code) {
      return;
    }
    // save code
    try {
      realm.write(
        () => new Coupon(realm, code, date, maxPrice, percent, price, false),
      );
    } catch (e) {
      setError('خطا در ذخیره کد' + e);
    }
  };

  return (
    <Container>
      <Content>
        <WelcomeText variant={'headlineSmall'}>خوش آمدید</WelcomeText>
        <Label>درصد تخفیف</Label>
        <CTextInput
          keyboardType={'number-pad'}
          left={<TextInput.Affix text="%" />}
          value={percent.toString()}
          disabled={!!price}
          onChangeText={t => setPercent(Number(t))}
          mode={'outlined'}
        />
        <ORText>و یا</ORText>
        <Label>مبلغ تخفیف</Label>
        <CTextInput
          value={price.toString()}
          disabled={!!percent}
          inputMode={'numeric'}
          onChangeText={t => setPrice(Number(t))}
          left={<TextInput.Affix text="تومان" />}
          keyboardType={'number-pad'}
          mode={'outlined'}
        />
        <Label> حداکثر مبلغ تخفیف</Label>
        <CTextInput
          value={maxPrice.toString()}
          inputMode={'numeric'}
          disabled={!!price}
          onChangeText={t => setMaxPrice(Number(t))}
          left={<TextInput.Affix text="تومان" />}
          keyboardType={'number-pad'}
          mode={'outlined'}
        />
        <DateButton onPress={() => setOpen(true)}>
          <DateButtonText>
            تاریخ انقضا: {date.toLocaleDateString('fa')}
          </DateButtonText>
        </DateButton>
        <DatePicker
          modal
          locale="fa"
          mode="date"
          title="تاریخ انقضا"
          cancelText={'لغو'}
          confirmText={'تایید'}
          open={open}
          date={date}
          onConfirm={d => {
            setOpen(false);
            setDate(d);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
        <CodeArea>
          <>
            <CreatedCode variant={'bodyLarge'}>کد تخفیف شما:</CreatedCode>
            <Code variant={'headlineSmall'}>{code}</Code>
          </>
          <ErrorText variant={'bodyLarge'}>{error}</ErrorText>
        </CodeArea>
        {code ? (
          <Buttons>
            <Button
              disabled={disabled}
              onPress={handleGenerateCode}
              mode="outlined">
              کد جدید
            </Button>
            <Button
              disabled={disabled}
              onPress={handleSaveCode}
              mode="contained">
              ثبت کد
            </Button>
          </Buttons>
        ) : (
          <Button
            disabled={disabled}
            onPress={handleGenerateCode}
            mode="contained">
            ساخت کد جدید
          </Button>
        )}
      </Content>
    </Container>
  );
};

export default Generate;

const WelcomeText = styled(Text)(props => ({
  color: props.theme.colors.primary,
  textAlign: 'right',
}));

const Container = styled(KeyboardAvoidingView)(props => ({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'flex-end',
  backgroundColor: props.theme.colors.background,
}));

const Content = styled(View)(() => ({
  flex: 1,
  width: '100%',
  paddingHorizontal: spacing(2),
  paddingVertical: spacing(4),
}));

const CTextInput = styled(TextInput)(props => ({
  width: '100%',
  marginTop: spacing(0.5),
  backgroundColor: props.theme.colors.background,
  borderColor: props.theme.colors.primary,
  borderWidth: 1,
  borderRadius: 4,
  textAlign: 'right',
  color: props.theme.colors.primary,
  height: spacing(8),
  paddingHorizontal: spacing(2),
}));

const Label = styled(Text)(props => ({
  color: props.theme.colors.primary,
  textAlign: 'right',
  marginTop: spacing(2),
}));

const CreatedCode = styled(Text)(props => ({
  color: props.theme.colors.primary,
  textAlign: 'right',
  marginTop: spacing(2),
}));
const Code = styled(Text)(props => ({
  color: props.theme.colors.onBackground,
  backgroundColor: props.theme.colors.primaryContainer,
  borderRadius: 4,
  padding: spacing(2),
  fontWeight: 'bold',
  textAlign: 'center',
  marginTop: spacing(2),
  marginBottom: spacing(2),
}));

const CodeArea = styled(View)(() => ({
  flex: 1,
  width: '100%',
}));

const Buttons = styled(View)(() => ({
  width: '100%',
  gap: spacing(2),
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

const ORText = styled(Text)(props => ({
  color: props.theme.colors.primary,
  textAlign: 'center',
  marginTop: spacing(1),
  marginBottom: -spacing(3),
}));

const DateButton = styled(TouchableOpacity)(props => ({
  width: '100%',
  height: 56,
  borderRadius: 4,
  borderWidth: 2,
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: spacing(2),
  backgroundColor: props.theme.colors.background,
  borderColor: props.theme.colors.primary,
  paddingHorizontal: spacing(2),
}));

const DateButtonText = styled(Text)(props => ({
  color: props.theme.colors.primary,
  textAlign: 'right',
  width: '100%',
}));
const ErrorText = styled(Text)(props => ({
  color: props.theme.colors.error,
  textAlign: 'right',
  width: '100%',
}));
