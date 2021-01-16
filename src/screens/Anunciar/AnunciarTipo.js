import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useTheme } from 'react-native-paper';

import stylesCommon from '../../components/stylesCommon'

const AnunciarTipo = ({ route, navigation }) => {
    console.log('--- AnunciarTipo --- ')

    const { anuncio } = route.params;
    const { colors } = useTheme();

    const continuar = (val) => {
        console.log("continuar")
        anuncio.tipo = val;
        console.log(anuncio.tipo)
        if (anuncio.tipo == 'VENDA') {
            navigation.navigate('AnunciarValor', { anuncio: anuncio, });
        } else {
            navigation.navigate('AnunciarCep', { anuncio: anuncio, });
        }
    }

    return (

        <View style={stylesCommon.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content" />
            <Animatable.View
                animation="fadeInUpBig"
                style={[stylesCommon.footer, {
                    backgroundColor: colors.background
                }]}
            >
                <Text style={[stylesCommon.text_footer, {
                    color: colors.text
                }]}>Qual a finalidade do seu anúncio?</Text>

                <View style={stylesCommon.action}>
                    <TouchableOpacity
                        onPress={() => { continuar('VENDA') }}
                        style={[stylesCommon.button_styte, {
                            borderColor: '#009387',
                            borderWidth: 1,
                            marginTop: 15
                        }]}
                    >
                        <Text style={[stylesCommon.button_text, {
                            color: '#009387'
                        }]}>Venda</Text>
                    </TouchableOpacity>
                </View>


                <View style={stylesCommon.action, { marginTop: 1 }}>
                    <TouchableOpacity
                        onPress={() => { continuar('DOACAO') }}
                        style={[stylesCommon.button_styte, {
                            borderColor: '#009387',
                            borderWidth: 1,
                            marginTop: 15
                        }]}
                    >
                        <Text style={[stylesCommon.button_text, {
                            color: '#009387'
                        }]}>Doação</Text>
                    </TouchableOpacity>
                </View>

            </Animatable.View>
        </View>
    );
};

export default AnunciarTipo;