import React from "react";
import { View, Text } from "react-native";
import { useAuth } from '../contexts/auth';
import stylesCommon from '../components/stylesCommon'

const Home = ({ navigation }) => {
  const { user } = useAuth();

  console.log("--- Entrou no Home ---")
  //  console.log("user:", user.email)

  return (
    <View style={stylesCommon.center}>
      <Text>Tela - Home </Text>
      {user && 
      <Text>{user.email} , {user.displayName}</Text>
      
      }
    </View>
  );
};

export default Home;