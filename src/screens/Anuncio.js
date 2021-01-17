import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StatusBar, ScrollView, StyleSheet, Image, Dimensions, } from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from 'react-native-paper';
import AwesomeLoading from 'react-native-awesome-loading';
import Feather from 'react-native-vector-icons/Feather';

import { useAuth } from '../contexts/auth';
import { apiAnuncio } from '../services/api';
import stylesCommon from '../components/stylesCommon';
import ItemAnuncio from '../screens/ItemAnuncio';
import { color } from 'react-native-reanimated';

const width = Dimensions.get('window').width * 0.9;
const height = Dimensions.get('window').height * 0.8;

const Anuncio = ({ route, navigation }) => {
    console.log('--- Anuncio --- ')
    // const [anuncio, setAnuncio] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { user, _showAlert } = useAuth();
    const { anuncio } = route.params;
    console.log("anuncio:", anuncio)
    const { colors } = useTheme();

    console.log("width", width)
    console.log("width", height)

    const sendMessage = () => {
        console.log('sendMessage')

    }

    if (isLoading) {
        return (
            <View>

                <AwesomeLoading indicatorId={11} size={80} isActive={true} text="" />
            </View>
        )
    }

    if (!isLoading) {
        return (
            <View style={stylesCommon.container}>
                <StatusBar backgroundColor='#009387' barStyle="light-content" />
                <ScrollView>
                    <Animatable.View
                        animation="fadeInUpBig"
                        style={[stylesCommon.footer, {
                            backgroundColor: colors.background
                        }]}
                    >

                        <ItemAnuncio anuncio={anuncio} />

                        <View style={stylesCommon.button}>
                            <TouchableOpacity
                                style={stylesCommon.button_styte}
                                onPress={() => { sendMessage() }}
                            >
                                <LinearGradient
                                    colors={['#08d4c4', '#01ab9d']}
                                    style={stylesCommon.button_styte}
                                >
                                    <Text style={[stylesCommon.button_text, {
                                        color: '#fff'
                                    }]}>Enviar mensagem</Text>

                                </LinearGradient>
                            </TouchableOpacity>

                        </View>

                    </Animatable.View>

                </ScrollView>
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.touchableOpacityStyle}>
                    <Feather
                        style={styles.floatingButtonStyle}
                        name="message-circle"
                        size={15}
                        onPress={() => { sendMessage }}
                    ></Feather>

                </TouchableOpacity>
            </View>
        )
    }
};

export default Anuncio;

const styles = StyleSheet.create({

    touchableOpacityStyle: {
        position: 'absolute',
        marginTop: 350,
        alignSelf: "flex-end",
        alignItems: "center"
    },
    floatingButtonStyle: {
        margin: 3,
        fontSize: 40,
        color: "green",
        width: 50,
        height: 353,
        fontWeight: 'bold'

    },
});