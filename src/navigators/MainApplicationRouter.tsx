import * as React from 'react';
import {Routes} from '../constants/Routes';
import AttendanceScreen from '../screens/AttendanceScreen';
import AttendanceLogsScreen from '../screens/AttendanceLogsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const Tab = createBottomTabNavigator();
export const MainApplicationRouter = () => {
  return (
    <Tab.Navigator
      initialRouteName={Routes.AttendanceScreen}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === Routes.AttendanceScreen) {
            iconName = focused ? 'finger-print' : 'finger-print';
          } else if (route.name === Routes.NotificationsScreen) {
            iconName = focused ? 'notifications' : 'notifications';
          } else if (route.name === Routes.AttendanceLogsScreen) {
            iconName = focused ? 'list' : 'list';
          } else {
            iconName = focused ? 'person' : 'person';
          }

          // You can return any component that you like here!
          return <Ionicons size={size} color={color} name={iconName ?? ''} />;
        },
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name={Routes.AttendanceScreen} component={AttendanceScreen} />
      <Tab.Screen
        name={Routes.AttendanceLogsScreen}
        component={AttendanceLogsScreen}
      />
      <Tab.Screen
        name={Routes.NotificationsScreen}
        component={NotificationsScreen}
      />
      <Tab.Screen
        name={Routes.ProfileScreen}
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
