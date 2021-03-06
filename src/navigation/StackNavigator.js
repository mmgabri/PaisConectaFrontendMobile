import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { CommonActions } from '@react-navigation/native';

import Mais from '../screens/Mais'
import Home from '../screens/Home'
import Buscar from '../screens/Buscar'
import Mensagens from '../screens/Mensagens'
import SignIn from '../screens/SignIn'
import SignUp from '../screens/SignUp'
import Anunciar from '../screens/anunciar/Anunciar'
import AnunciarTitulo from '../screens/anunciar/AnunciarTitulo'
import AnunciarDescricao from '../screens/anunciar/AnunciarDescricao'
import AnunciarCategoria from '../screens/anunciar/AnunciarCategoria'
import AnunciarTipo from '../screens/anunciar/AnunciarTipo'
import AnunciarValor from '../screens/anunciar/AnunciarValor'
import AnunciarCep from '../screens/anunciar/AnunciarCep'
import AnunciarImagens from '../screens/anunciar/AnunciarImagens'
import AnunciarConfirm from '../screens/anunciar/AnunciarConfirm'
import MeusAnuncios from '../screens/MeusAnuncios'
import Anuncio from '../screens/Anuncio'

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#9AC4F8",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#009387',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }
    }>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Anuncio" component={Anuncio}
        options={{
          title: 'Anúncio',
        }} />
    </Stack.Navigator>
  );
}

const AnunciarStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#009387',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }
    }>
      <Stack.Screen name="Anunciar" component={Anunciar}
        options={{
          title: 'Anunciar',
        }} />
      <Stack.Screen name="AnunciarTitulo" component={AnunciarTitulo}
        options={{
          title: 'Anunciar - Titulo',
        }} />
      <Stack.Screen name="AnunciarDescricao" component={AnunciarDescricao}
        options={{
          title: 'Anunciar - Descrição',
        }} />
      <Stack.Screen name="AnunciarCategoria" component={AnunciarCategoria}
        options={{
          title: 'Anunciar - Categoria',
        }} />
      <Stack.Screen name="AnunciarTipo" component={AnunciarTipo}
        options={{
          title: 'Anunciar - Tipo',
        }} />
      <Stack.Screen name="AnunciarValor" component={AnunciarValor}
        options={{
          title: 'Anunciar - Valor',
        }} />
      <Stack.Screen name="AnunciarCep" component={AnunciarCep}
        options={{
          title: 'Anunciar - Cep',
        }} />
      <Stack.Screen name="AnunciarImagens" component={AnunciarImagens}
        options={{
          title: 'Anunciar - Imagens',
        }} />
      <Stack.Screen name="AnunciarConfirm" component={AnunciarConfirm}
        options={{
          title: 'Anunciar - Confirm',
        }} />
      <Stack.Screen name="MeusAnuncios" component={MeusAnuncios}
        options={{
          title: 'Meus anúncios',
        }} />
      <Stack.Screen name="Anuncio" component={Anuncio}
        options={{
          title: 'Meu anúncio',
        }} />
      <Stack.Screen name="Home" component={Home}
        options={{
          title: 'Home',
        }} />
    </Stack.Navigator>
  );
}

const BuscarStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Buscar" component={Buscar} />
    </Stack.Navigator>
  );
}

const MensagensStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Mensagens" component={Mensagens} />
    </Stack.Navigator>
  );
}

const MaisStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#009387',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }
    }>
      <Stack.Screen name="Mais" component={Mais}
        options={{
          title: 'Mais',
        }} />
      <Stack.Screen name="AnunciarTitulo" component={AnunciarTitulo}
        options={{
          title: 'Anunciar - Titulo',
        }} />
      <Stack.Screen name="AnunciarDescricao" component={AnunciarDescricao}
        options={{
          title: 'Anunciar - Descrição',
        }} />
      <Stack.Screen name="AnunciarCategoria" component={AnunciarCategoria}
        options={{
          title: 'Anunciar - Categoria',
        }} />
      <Stack.Screen name="AnunciarTipo" component={AnunciarTipo}
        options={{
          title: 'Anunciar - Tipo',
        }} />
      <Stack.Screen name="AnunciarValor" component={AnunciarValor}
        options={{
          title: 'Anunciar - Valor',
        }} />
      <Stack.Screen name="AnunciarCep" component={AnunciarCep}
        options={{
          title: 'Anunciar - Cep',
        }} />
      <Stack.Screen name="AnunciarImagens" component={AnunciarImagens}
        options={{
          title: 'Anunciar - Imagens',
        }} />
      <Stack.Screen name="AnunciarConfirm" component={AnunciarConfirm}
        options={{
          title: 'Anunciar - Confirm',
        }} />
      <Stack.Screen name="MeusAnuncios" component={MeusAnuncios}
        options={{
          title: 'Meus anúncios',
        }} />
      <Stack.Screen name="Anuncio" component={Anuncio}
        options={{
          title: 'Meu anúncio',
        }} />
    </Stack.Navigator>
  );
}


const SignInStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#009387',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }
    }>
      <Stack.Screen name="Login" component={SignIn}
        options={{
          title: 'Login',
        }}
      />
      <Stack.Screen name="SignUp" component={SignUp}
        options={{
          title: 'Criar conta',
        }} />
    </Stack.Navigator>
  );
}

export {
  HomeStackNavigator,
  BuscarStackNavigator,
  AnunciarStackNavigator,
  MensagensStackNavigator,
  MaisStackNavigator,
  SignInStackNavigator
};