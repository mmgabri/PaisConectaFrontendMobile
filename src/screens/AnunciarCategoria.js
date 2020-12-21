import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useTheme } from 'react-native-paper';

import stylesCommon from '../components/stylesCommon'

const AnunciarCategoria = ({ route, navigation }) => {
    console.log('--- AnunciarCategoria --- ')

    const { anuncio } = route.params;
    const { colors } = useTheme();

    const continuar = (val) => {
        console.log("continuar")

        anuncio.categoria = val;

        console.log(anuncio)

        //    navigation.navigate('AnunciarDescricao', { anuncio: anuncio, });
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
                }]}>Escolha a categoria do seu anúncio</Text>

                <View style={stylesCommon.action}>
                    <TouchableOpacity
                        onPress={() => { continuar('VENDER') }}
                        style={[stylesCommon.button_styte, {
                            borderColor: '#009387',
                            borderWidth: 1,
                            marginTop: 15
                        }]}
                    >
                        <Text style={[stylesCommon.button_text, {
                            color: '#009387'
                        }]}>Vender</Text>
                    </TouchableOpacity>
                </View>


                <View style={stylesCommon.action, { marginTop: 1 }}>
                    <TouchableOpacity
                        onPress={() => { continuar('DOAR') }}
                        style={[stylesCommon.button_styte, {
                            borderColor: '#009387',
                            borderWidth: 1,
                            marginTop: 15
                        }]}
                    >
                        <Text style={[stylesCommon.button_text, {
                            color: '#009387'
                        }]}>Doar</Text>
                    </TouchableOpacity>
                </View>
                
            </Animatable.View>
        </View>
    );
};

export default AnunciarCategoria;