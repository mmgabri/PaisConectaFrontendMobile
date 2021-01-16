import React from "react";
import { View, Text, Button } from "react-native";

import stylesCommon from '../components/stylesCommon'
import { useAuth } from '../contexts/auth';
import MeusAnuncios from "./MeusAnuncios";

const Mais = ({ navigation }) => {
  const { signOut } = useAuth();

  const continuar = (val) => {
    console.log("continuar")
    anuncio.categoria = val;
    navigation.navigate('AnunciarTipo', { anuncio: anuncio, });
  }

  return (

    <View style={stylesCommon.center}>
      <View>
        <Button title="Meus anúncios" onPress={() => { navigation.navigate('MeusAnuncios') }} />
        <Button
          title="Favoritos"
        />
      </View>
      <Button
        title="Minha Conta"
      />
      <Button title="Sign Out" onPress={() => { signOut() }} />

    </View>

  );
};

export default Mais;