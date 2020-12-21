import React from "react";
import { View, Text, Button } from "react-native";

import stylesCommon from '../components/stylesCommon'

const Buscar = ({ navigation }) => {
  return (
    <View style={stylesCommon.center}>
      <Text>Tela - Buscar</Text>
      <Button title="Criar uma Conta" onPress={() => navigation.navigate("SignUp")} />
    </View>
  );
};

export default Buscar;