import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Routes} from '../constants/Routes';
import LoginScreen from '../screens/LoginScreen';
import OTPScreen from '../screens/OTPScreen';
import * as React from 'react';
import SplashScreen from '../screens/SplashScreen';

const Stack = createNativeStackNavigator();
export const LoginRouter = () => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.LoginScreen}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={Routes.LoginScreen} component={LoginScreen} />
      <Stack.Screen name={Routes.OTPScreen} component={OTPScreen} />
      <Stack.Screen name={Routes.SplashScreen} component={SplashScreen} />
    </Stack.Navigator>
  );
};
