import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { DeviceViewerScreen } from '../screens/DeviceViewerScreen';
import { DevicesScreen } from '../screens/DevicesScreen';
import { PackagesScreen } from '../screens/PackagesScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { colors } from '../theme/colors';

export type RootStackParamList = {
  Devices: undefined;
  DeviceViewer: { deviceId: string };
  Packages: undefined;
  Profile: undefined;
};

export type TabParamList = {
  DevicesTab: undefined;
  PackagesTab: undefined;
  ProfileTab: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

const navigationTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: colors.background,
    card: colors.surface,
    border: colors.border,
    primary: colors.primary,
    text: colors.text,
  },
};

const tabIcons: Record<keyof TabParamList, keyof typeof Ionicons.glyphMap> = {
  DevicesTab: 'phone-portrait-outline',
  PackagesTab: 'pricetags-outline',
  ProfileTab: 'person-outline',
};

function DevicesStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Devices" component={DevicesScreen} />
      <Stack.Screen name="DeviceViewer" component={DeviceViewerScreen} />
      <Stack.Screen name="Packages" component={PackagesScreen} />
    </Stack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textFaint,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={tabIcons[route.name as keyof TabParamList]} size={size} color={color} />
        ),
      })}
    >
      <Tab.Screen name="DevicesTab" component={DevicesStack} options={{ title: 'Dispositivos' }} />
      <Tab.Screen name="PackagesTab" component={PackagesScreen} options={{ title: 'Planos' }} />
      <Tab.Screen name="ProfileTab" component={ProfileScreen} options={{ title: 'Perfil' }} />
    </Tab.Navigator>
  );
}

export function RootNavigator() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <TabNavigator />
    </NavigationContainer>
  );
}
