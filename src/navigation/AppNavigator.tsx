import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {COLORS} from '../utils/constants';

// Icons
import {HomeIcon, OrdersIcon, ProfileIcon, MapIcon} from '../components/icons';

// Screens
import {HomeScreen} from '../screens/HomeScreen';
import {PlansScreen} from '../screens/PlansScreen';
import {PurchaseScreen} from '../screens/PurchaseScreen';
import {OrdersScreen} from '../screens/OrdersScreen';
import {ProfileScreen} from '../screens/ProfileScreen';
import {MapScreen} from '../screens/MapScreen';
import {ArchiveScreen} from '../screens/ArchiveScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: {backgroundColor: COLORS.background},
    }}>
    <Stack.Screen name="HomeMain" component={HomeScreen} />
    <Stack.Screen name="Plans" component={PlansScreen} />
    <Stack.Screen name="Purchase" component={PurchaseScreen} />
    <Stack.Screen name="Map" component={MapScreen} />
  </Stack.Navigator>
);

const OrdersStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: {backgroundColor: COLORS.background},
    }}>
    <Stack.Screen name="OrdersMain" component={OrdersScreen} />
    <Stack.Screen name="Archive" component={ArchiveScreen} />
  </Stack.Navigator>
);

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: COLORS.textSecondary,
          tabBarStyle: {
            backgroundColor: COLORS.surface,
            borderTopWidth: 1,
            borderTopColor: COLORS.border,
            paddingBottom: 8,
            paddingTop: 8,
            height: 60,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
          },
        }}>
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{
            tabBarLabel: 'Главная',
            tabBarIcon: ({color, focused}) => (
              <HomeIcon size={24} color={color} active={focused} />
            ),
          }}
        />
        <Tab.Screen
          name="Orders"
          component={OrdersStack}
          options={{
            tabBarLabel: 'Заказы',
            tabBarIcon: ({color, focused}) => (
              <OrdersIcon size={24} color={color} active={focused} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Профиль',
            tabBarIcon: ({color, focused}) => (
              <ProfileIcon size={24} color={color} active={focused} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

