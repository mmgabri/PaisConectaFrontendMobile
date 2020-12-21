import React from "react";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
Icon.loadFont();

import { useAuth } from '../contexts/auth';
import {
  HomeStackNavigator,
  BuscarStackNavigator,
  MensagensStackNavigator,
  AnunciarStackNavigator,
  MaisStackNavigator,
  SignInStackNavigator
}
  from './StackNavigator'

const Tab = createMaterialBottomTabNavigator();

const TabNavigator = ({ navigation }) => {
  const { isAuthenticated, loading } = useAuth();
  console.log('Entrou no TabNavigator')
  console.log('isAuthenticated:', isAuthenticated)

  return (
    <Tab.Navigator
      shifting={false}
      initialRouteName="HomeStackNavigator"
      activeColor="white"
      inactiveColor="#363636"
      barStyle={{ backgroundColor: '#009387' }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <View>
              <Icon name="home" size={25} color="#FFF" />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Anunciar"
        component={AnunciarStackNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <View>
              <Icon name="add-circle" size={20} color="#FFF" />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Buscar"
        component={BuscarStackNavigator}
        options={{
          tabBarLabel: 'Buscar',
          tabBarIcon: ({ color }) => (
            <View>
              <Icon name="search" size={25} color="#FFF" />
            </View>
          ),
        }}
      />

      {isAuthenticated &&
        <Tab.Screen
          name="Mensagens"
          component={MensagensStackNavigator}
          options={{
            tabBarLabel: 'Mensagens',
            tabBarIcon: ({ color }) => (
              <View>
                <Icon name="chat" size={20} color="#FFF" />
              </View>
            ),
          }}
        />}

      {isAuthenticated &&
        <Tab.Screen
          name="Mais"
          component={MaisStackNavigator}
          options={{
            tabBarLabel: 'Mais',
            tabBarIcon: ({ color }) => (
              <View>
                <Icon name="menu" size={20} color="#FFF" onPress={() => navigation.openDrawer()} />
              </View>
            ),
          }}
        />}

      {!isAuthenticated &&
        <Tab.Screen
          name="Login"
          component={SignInStackNavigator}
          options={{
            tabBarLabel: 'Login',
            tabBarIcon: ({ color }) => (
              <View>
                <Icon name="login" size={20} color="#FFF" />
              </View>
            ),
          }}
        />}

    </Tab.Navigator >

  );
};

export default TabNavigator;