import {Platform} from 'react-native';
import {css} from '@emotion/native';
import type {Theme} from '@emotion/react';
import {useTheme} from '@emotion/react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import MagicIcon from '@src/assets/magic.svg';
import CouponsScreen from '@src/components/screens/Coupons';
import GenerateScreen from '@src/components/screens/Generate';
import SearchScreen from '@src/components/screens/Search';
import {spacingPX} from '@src/theme/units';
// import NotImplementedScreen from '@src/components/screens/NotImplemented';

export type BottomNavigationParamList = {
  Generate: undefined;
  Coupons: undefined;
  Search: undefined;
};

const {Navigator, Screen} =
  createBottomTabNavigator<BottomNavigationParamList>();

const TabNavigation = () => {
  const theme = useTheme();
  return (
    <Navigator
      initialRouteName="Search"
      screenOptions={{
        headerShown: false,
        tabBarIconStyle: {display: 'none', height: 0, width: 0},
        tabBarItemStyle: itemStyle(theme),
        tabBarStyle: tabBarStyle(theme),
        tabBarLabelStyle: labelStyle(theme),
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.backdrop,
        tabBarActiveBackgroundColor: theme.colors.background,
        tabBarInactiveBackgroundColor: theme.colors.background,
        // tabBarBadgeStyle: tabBarBadgeStyle(theme),
        // title: translations.common.mallato,
      }}>
      <Screen
        name="Generate"
        component={GenerateScreen}
        options={{
          // tabBarIcon: MagicIcon,
          tabBarLabel: 'ساخت کد',
        }}
      />
      <Screen
        name="Coupons"
        component={CouponsScreen}
        options={{
          // tabBarIcon: HomeIcon,
          tabBarLabel: 'کدهای من',
        }}
      />
      <Screen
        name="Search"
        component={SearchScreen}
        options={{
          // tabBarIcon: HomeIcon,
          tabBarLabel: 'جستجو',
        }}
      />
    </Navigator>
  );
};

export default TabNavigation;

const tabBarStyle = (theme: Theme) => css`
  //height: 40px;
  //justify-content: center;
  background: ${theme.colors.background};
`;

// const itemStyle = css`
//   padding: ${spacingPX(1)} 0;
// `;

const labelStyle = (theme: Theme) => css`
  font-family: '${theme.fonts.bodyLarge?.fontFamily}';
  color: ${theme.colors.onPrimary};
  padding: ${spacingPX(1)} 0;
  font-size: 18px;
`;
const itemStyle = (theme: Theme) => css`
  padding: ${spacingPX(1)} 0;
  height: 60px;
  background-color: ${theme.colors.primary};
  top: -11px;
`;
// @ts-ignore
