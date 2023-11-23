import {adaptNavigationTheme, MD3LightTheme} from 'react-native-paper';
import {DefaultTheme as NavigationDefaultTheme} from '@react-navigation/native';

import {spacingUnit} from './configs';
import type {Theme} from './types';
import {spacing} from './units';

export const Palette: Theme = {
  ...MD3LightTheme, // or MD3DarkTheme
  roundness: 1.5,
  isV3: true,
  mode: 'adaptive',
  spacingUnit,
  spacing,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#6B705C',
    primaryContainer: 'rgba(107,112,92,0.43)',
    onPrimary: '#fff',
    secondary: '#fff',
    onSurface: '#000',
    onBackground: '#000',
    background: '#fff',
    outline: '#6B705C',
    warn: '#F2C94C',
  },
};

export const {LightTheme: navigationLightTheme} = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  materialLight: Palette,
});
