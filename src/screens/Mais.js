import React from "react";
import { View, Text, Button } from "react-native";

import stylesCommon from '../components/stylesCommon'
import { useAuth } from '../contexts/auth';

const Mais = ({ navigation }) => {
  const { signOut } = useAuth();

  return (

    <View style={stylesCommon.center}>
      <View>
        <Button
          title="Meus anúncios"
        />
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