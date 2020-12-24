import React from "react";
import { View, Text } from "react-native";
import stylesCommon from '../components/stylesCommon'

const MeusAnuncios = ({ navigation }) => {
    console.log("--- Meus anúncios ---")

    return (
        <View style={stylesCommon.center}>
            <Text>Meus anúncios</Text>
            <Text>Lista de anúncios</Text>
        </View>
    );
};

export default MeusAnuncios;