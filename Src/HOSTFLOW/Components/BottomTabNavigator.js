// navigation/BottomTabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/HomeScreen';
import { View, Text, Image } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import EventScreen from '../Screens/EventScreen';
import ShortlistScreen from '../Screens/ShortListScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Shortlist from '../assets/icons/Shortlist';
import EventIcon from '../assets/icons/eventicon';
import HomeIcon from '../assets/icons/home';
import ProfileIcon from '../Components/profile';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const insets = useSafeAreaInsets();
  
  return (
    <Tab.Navigator
    
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarLabelStyle: { 
          fontSize: 10,
          marginTop: 4,
        },
        tabBarStyle: {
          backgroundColor: '#000',
          borderTopColor: '#1a1a1a',
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom,
          paddingTop: 8,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderLeftWidth: 1,
          borderRightWidth: 1,
          borderColor: '#1a1a1a',
          position: 'absolute',
          left: 10,
          right: 10,
          bottom: 0,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        },
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;
          let IconComponent;

          if (route.name === 'Home') {
            IconComponent = <HomeIcon width={size} height={size} fill={focused ? '#a95eff' : '#999'} />;
          }
          else if (route.name === 'Event') {
            IconComponent = <EventIcon width={size} height={size} fill={focused ? '#a95eff' : '#999'} />;
          }
          else if (route.name === 'Shortlists') {
            IconComponent = <Shortlist width={size} height={size} fill={focused ? '#a95eff' : '#999'} />;
          }
          else if (route.name === 'Profile') {
            IconComponent = <ProfileIcon width={size} height={size} fill={focused ? '#a95eff' : '#999'} />;
          }

          return (
            <View style={{
              backgroundColor: 'transparent',
              borderRadius: 1,
              padding: -10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              {IconComponent}
            </View>
          );
        },
        tabBarActiveTintColor: '#a95eff',
        tabBarInactiveTintColor: '#999',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Event" component={EventScreen} />
      <Tab.Screen name="Shortlists" component={ShortlistScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const DummyScreen = () => (
  <View style={{ flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{ color: '#fff' }}>Coming Soon</Text>
  </View>
);

export default BottomTabNavigator;
