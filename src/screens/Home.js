import React, { createContext, useState, useEffect, useContext, useRef } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, StatusBar } from "react-native";
import * as Animatable from 'react-native-animatable';
import { useTheme } from 'react-native-paper';
import stylesCommon from '../components/stylesCommon'
import { apiAnuncio } from '../services/api';
import { useAuth } from '../contexts/auth';
import ListAnuncio from './ListAnuncio'

const Home = ({ navigation }) => {
  console.log("--- Home ---")
  const { user, _showAlert } = useAuth();
  const [anuncio, setAnuncio] = useState([]);
  const { colors } = useTheme();

  function onClick(item) {
    console.log('onClick - ', item)
    navigation.navigate('Anuncio', { anuncio: item, });
}

  useEffect(() => {
    console.log('useEffect')
    
    apiAnuncio.get(`/anuncios`)
      .then((response) => {
        console.log('Anúncios: ', response.data)
        setAnuncio(response.data)
      })
      .catch((error) => {
        _showAlert('error', 'Ooops!', `Algo deu errado. ` + error, 7000);
      });

  }, [])

  return (

    <View style={styles.container}>
      <StatusBar backgroundColor='#009387' barStyle="light-content" />
      <Animatable.View
        animation="fadeInUpBig"
        style={[stylesCommon.footer, {
          backgroundColor: colors.background
        }]}
      >
        <ListAnuncio anuncios={anuncio} onClick={onClick}></ListAnuncio>

      </Animatable.View>

    </View>

  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F8',
    margin: -10
  },
});
