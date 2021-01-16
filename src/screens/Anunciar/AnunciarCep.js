import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StatusBar, } from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text'

import stylesCommon from '../../components/stylesCommon'

const AnunciarCep = ({ route, navigation }) => {
    console.log('--- AnunciarCep --- ')
    const [isFocused, setIsFocused] = useState(false);
    const [input, setInput] = useState('');
    const [isMessageWarning, setIsMessageWarning] = useState(false);
    const [enableButton, setEnableButton] = useState(false);
    const { anuncio } = route.params;

    const { colors } = useTheme();

    const handleInputChange = (val) => {
        setInput(val);
        setIsMessageWarning(false)

        if (val.length > 8) {
            setEnableButton(true)
        } else {
            setEnableButton(false)
        }
    }

    const continuar = () => {
        console.log("continuar")
        anuncio.cep = input;
        if (input.length > 8) {
            navigation.navigate('AnunciarImagens', { anuncio: anuncio, });
        } else {
            setIsMessageWarning(true)
        }
    }

    useEffect(() => {
        setInput(anuncio.cep)
        if (anuncio) {
            setIsMessageWarning(false)
            setEnableButton(true)
        }
    }, [])

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
                }]}>Qual o seu CEP?</Text>

                <View style={stylesCommon.action}>
                    <TextInputMask
                        type={'zip-code'}
                        keyboardType="numeric"
                        onFocus={() => setIsFocused(true)}
                        selectionColor="#009387"
                        underlineColorAndroid={isFocused ? "#009387" : "#D3D3D3"}
                        placeholder="digite aqui"
                        placeholderTextColor="#666666"
                        style={[stylesCommon.textInput, {
                            color: colors.text
                        }]}
                        autoCapitalize="none"
                        value={input}
                        onChangeText={(val) => handleInputChange(val)}>
                    </TextInputMask>
                </View>

                {isMessageWarning &&
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={stylesCommon.errorMsg}>cep inválido</Text>
                    </Animatable.View>
                }


                <View style={stylesCommon.button}>
                    {enableButton ?
                        <TouchableOpacity
                            style={stylesCommon.button_styte}
                            onPress={() => { continuar() }}
                        >
                            <LinearGradient
                                colors={['#08d4c4', '#01ab9d']}
                                style={stylesCommon.button_styte}
                            >
                                <Text style={[stylesCommon.button_text, {
                                    color: '#fff'
                                }]}>Continuar</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            style={stylesCommon.button_styte}
                            onPress={() => { continuar() }}
                        >
                            <LinearGradient
                                colors={['#86d6cc', '#86d6cc']}
                                style={stylesCommon.button_styte}
                            >
                                <Text style={[stylesCommon.button_text, {
                                    color: '#fff'
                                }]}>Continuar</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    }
                </View>

            </Animatable.View>
        </View>
    );
};

export default AnunciarCep;