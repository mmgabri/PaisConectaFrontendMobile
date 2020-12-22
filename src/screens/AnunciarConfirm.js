import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StatusBar, StyleSheet, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from 'react-native-paper';
import { SliderBox } from 'react-native-image-slider-box';

import stylesCommon from '../components/stylesCommon'
import { uploadImage } from '../services/storageService';

const width = Dimensions.get('window').width * 0.9;

const AnunciarConfirm = ({ route, navigation }) => {
    console.log('--- AnunciarConfirm --- ')

    const [input, setInput] = useState('');
    const [isMessageWarning, setIsMessageWarning] = useState(false);
    const [enableButton, setEnableButton] = useState(false);
    const { anuncio } = route.params;
    const { colors } = useTheme();

    const handleInputChange = (val) => {
        setInput(val);
        setIsMessageWarning(false)
        if (val.length > 20) {
            setEnableButton(true)
        } else {
            setEnableButton(false)
        }
    }

    const onHandleSubmit = async () => {
        const picsUrls = [];
        await sendingImageArray(anuncio.images)
            .then(urls => picsUrls.push(...urls))
            .catch(err => console.log(err));
        return (picsUrls);
    };

    const sendingImageArray = async (images) => {
        console.log('sendingImageArray')
        return Promise.all(images.map(image => uploadImage(image.base64)));
    }

    const saveAnuncio = () => {
        onHandleSubmit()
            .then((picsUrls) => {
                console.log('UPLOAD CONCLUIDO:', picsUrls)
                console.log("Incluir rotina para chamada da API aqui")
            })
            .catch(error => {
                console.log('UPLOAD COM ERRO:', error)
            })
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
                }]}>Confirme os dados do seu anúncio</Text>

                <View style={styles.imageViewContainer}>
                    <SliderBox resizeMethod={'resize'}
                        images={anuncio.images}
                        parentWidth={width}
                        ImageComponentStyle={{ height: 300, width: width }} />
                </View>

                <View style={stylesCommon.button}>
                    <TouchableOpacity
                        style={stylesCommon.button_styte}
                        onPress={() => { saveAnuncio() }}
                    >
                        <LinearGradient
                            colors={['#08d4c4', '#01ab9d']}
                            style={stylesCommon.button_styte}
                        >
                            <Text style={[stylesCommon.button_text, {
                                color: '#fff'
                            }]}>Publicar</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                <View style={stylesCommon.action, { marginTop: 10 }}>
                    <TouchableOpacity
                        onPress={() => navigation.push('Home')}
                        style={[stylesCommon.button_styte, {
                            borderColor: '#009387',
                            borderWidth: 1,
                            marginTop: 2
                        }]}
                    >
                        <Text style={[stylesCommon.button_text, {
                            color: '#009387'
                        }]}>Cancelar</Text>
                    </TouchableOpacity>
                </View>

            </Animatable.View>
        </View>
    );
};

export default AnunciarConfirm;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    imageViewContainer: {
        margin: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonsContainer: {
        height: '30%',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: width,
    },
    buttonStyle: {
        height: 40,
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4287f5',
        borderRadius: 5,
    },
    textButton: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF',
    }
})