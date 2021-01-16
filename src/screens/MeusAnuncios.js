import React, { createContext, useState, useEffect, useContext, useRef } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, StatusBar } from "react-native";
import * as Animatable from 'react-native-animatable';
import { useTheme } from 'react-native-paper';
import stylesCommon from '../components/stylesCommon'
import { apiAnuncio } from '../services/api';
import { useAuth } from '../contexts/auth';
import ListAnuncio from './ListAnuncio'

const MeusAnuncios = ({ navigation }) => {
    console.log("--- Maus anúncios ---")

    const { user, _showAlert } = useAuth();
    const [anuncio, setAnuncio] = useState([]);
    const { colors } = useTheme();


    function editar(item) {
        console.log('editar - ', item)
        navigation.navigate('AnunciarTitulo', { anuncio: item, });
    }

    function excluir(item) {
        console.log('excluir - ', item)
        apiAnuncio.delete(`/anuncios/${item.id}`)
            .then((respose) => {
                _showAlert('success', 'Anúncio excluido com sucesso', '', 3000);
            })
            .catch((error) => {
                _showAlert('error', 'Ooops!', `Algo deu errado. ` + error, 7000);
            });
    }

    function finalizar(item) {
        console.log('finalizar - ', item)
    }

    useEffect(() => {
        console.log('useEffect')

        apiAnuncio.get(`/anuncios/user/${user.uid}`)
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
                <ListAnuncio
                    anuncios={anuncio}
                    showMoreVertical={true}
                    editar={editar}
                    excluir={excluir}
                    finalizar={finalizar}
                />

            </Animatable.View>

        </View>

    );
};

export default MeusAnuncios;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F8',
        margin: -10
    },
});
