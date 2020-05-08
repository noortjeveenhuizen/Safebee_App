import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import connectHesjes from '../screens/connectHesjes';
import connect from '../screens/connect';
import QRScanner from '../screens/QRScanner';

//Auth imports
import Login from '../screens/Auth/loginScreen';
import Register from '../screens/Auth/registerScreen';
import LoadingScreen from '../screens/Auth/loadingScreen';

//Map imports
import Map from '../screens/map';
import GeoLocationMap from '../screens/map2';

//Settings imports
import SettingsTab from '../screens/Settings/settings';
import FAQ from '../screens/Settings/FAQ';
import Help from '../screens/Settings/help';
import Meldingen from '../screens/meldingen';

//Profiel imports
import ProfielTab from '../screens/Profile/profile';
import ConnectHesje from '../screens/Profile/connectHesje';
import DisconnectHesje from '../screens/Profile/disconnectHesje';

//Radius imports

//Onboarding
import SelecteerGroep from '../screens/Profile/Groepen/selecteerGroep';
import CreateGroep from '../screens/Profile/Groepen/createGroep';

//Initialize FireBase
import * as firebase from 'firebase';

let firebaseConfig = {
  apiKey: 'AIzaSyC4S1VsYyUp1cFGyNgDjTrQZ0uuLiOC-Q4',
  authDomain: 'safebee-4f297.firebaseapp.com',
  databaseURL: 'https://safebee-4f297.firebaseio.com',
  projectId: 'safebee-4f297',
  storageBucket: 'safebee-4f297.appspot.com',
  messagingSenderId: '357730359210',
  appId: '1:357730359210:web:6399581ebf2be8eeb9bdd3',
  measurementId: 'G-182CQNE80E',
};

firebase.initializeApp(firebaseConfig);

const Tab = createBottomTabNavigator();

const AuthStack = createStackNavigator();
const SettingsStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator screenOptions={{ gestureEnabled: true }}>
      <AuthStack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
    </AuthStack.Navigator>
  );
};

const SettingsStackScreen = () => {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="SettingsTab"
        component={SettingsTab}
        options={{
          title: 'Settings',
          headerStyle: {
            backgroundColor: '#F6C004',
          },
          headerTitleAlign: 'center',
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <SettingsStack.Screen name="Meldingen" component={Meldingen} />
      <SettingsStack.Screen name="FAQ" component={FAQ} />
      <SettingsStack.Screen name="Help" component={Help} />
      <SettingsStack.Screen name="QRScanner" component={QRScanner} />
      <SettingsStack.Screen name="Login" component={Login} />
    </SettingsStack.Navigator>
  );
};

const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator screenOptions={{ gestureEnabled: true }}>
      <ProfileStack.Screen
        name="ProfielTab"
        component={ProfielTab}
        options={{
          title: 'Profiel',
          headerStyle: {
            backgroundColor: '#F6C004',
          },
          headerTitleAlign: 'center',
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <ProfileStack.Screen
        name="Groepen"
        component={SelecteerGroep}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name="CreateGroep"
        component={CreateGroep}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen name="ConnectHesje" component={ConnectHesje} />
      <ProfileStack.Screen name="DisconnectHesje" component={DisconnectHesje} />
    </ProfileStack.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        activeTintColor: '#F6C004',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen
        name="Home"
        component={GeoLocationMap}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="location-on" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profiel"
        component={ProfileStackScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="person" size={35} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Instellingen"
        component={SettingsStackScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcon name="dots-horizontal" size={35} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const SafebeeApp = createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: TabNavigator,
      Auth: AuthStackScreen,
    },
    {
      initialRouteName: 'Loading',
    }
  )
);

export default SafebeeApp;
