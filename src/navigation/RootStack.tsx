import {createStackNavigator} from '@react-navigation/stack';

import TabNavigation from '@src/navigation/TabNavigation';

export type RootStackParamList = {
  Tabs: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const RootStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Group>
      <Stack.Screen name="Tabs" component={TabNavigation} />
    </Stack.Group>
  </Stack.Navigator>
);

export default RootStack;
