import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from 'react-native';

import { SliderBox } from 'react-native-image-slider-box';
import ImagePicker from 'react-native-image-crop-picker';

import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from 'react-native-paper';

import stylesCommon from '../../components/stylesCommon'

const width = Dimensions.get('window').width * 0.9;

const AnunciarImagens = ({ route, navigation }) => {
    console.log('--- AnunciarDescricao --- ')

    const [imagens, setImagens] = useState([]);
    const { colors } = useTheme();

    const { anuncio } = route.params;
    console.log("anuncio id:", anuncio.id)

    const continuar = () => {
        console.log("continuar")
        anuncio.imagens = imagens;
        navigation.navigate('AnunciarConfirm', { anuncio: anuncio, });
    }

    const onHadleSelectImageCamera = () => {
        console.log('onHadleSelectImage')

        cleanPicker();

        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
            includeBase64: true
        }).then(res => {
            let source = [];
            source.push({
                uri: res.path,
                base64: res.data
            })
            anuncio.imagensDevice = true;
            setImagens(source);
        })
    }

    const onHadleSelectImage = () => {
        console.log('onHadleSelectImage')

        cleanPicker();

        ImagePicker.openPicker({
            width: 300,
            height: 400,
            multiple: true,
            includeBase64: true,
        }).then(res => {
            let source = [];

            res.map(data => source.push({
                uri: data.path,
                base64: data.data
            }));
            anuncio.imagensDevice = true;
            setImagens(source);
        })
    }

    const cleanPicker = () => {
        setImagens([]);
        ImagePicker.clean().then(() => {
        }).catch(error => {
            console.log("cleanPicker:", error)
        });
    }

    useEffect(() => {
        console.log('useEffect')

        if (anuncio.id){
            console.log("Alteração do anúncio")
            setImagens(anuncio.imagens)
            anuncio.imagensDevice = false
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

                {imagens.length == 0 &&
                    <Text style={[stylesCommon.text_footer, {
                        color: colors.text
                    }]}>Você tem imagens do anúncio?</Text>}

                <View style={styles.imageViewContainer}>
                    <SliderBox resizeMethod={'resize'}
                        images={imagens}
                        parentWidth={width}
                        ImageComponentStyle={{ height: 300, width: width }} />
                </View>

                <View style={stylesCommon.action}>
                    <TouchableOpacity
                        onPress={onHadleSelectImage}
                        style={[stylesCommon.button_styte, {
                            borderColor: '#009387',
                            borderWidth: 1,
                            marginTop: 0
                        }]}
                    >
                        <Text style={[stylesCommon.button_text, {
                            color: '#009387'
                        }]}>Escolher na galeria</Text>
                    </TouchableOpacity>
                </View>


                <View style={stylesCommon.action, { marginTop: 1 }}>
                    <TouchableOpacity
                        onPress={onHadleSelectImageCamera}
                        style={[stylesCommon.button_styte, {
                            borderColor: '#009387',
                            borderWidth: 1,
                            marginTop: 2
                        }]}
                    >
                        <Text style={[stylesCommon.button_text, {
                            color: '#009387'
                        }]}>Tirar uma foto</Text>
                    </TouchableOpacity>
                </View>

                <View style={stylesCommon.action, { marginTop: 28 }}>
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
                </View>

            </Animatable.View>
        </View>
    );
};

export default AnunciarImagens;

const styles = StyleSheet.create({
    imageViewContainer: {
        margin: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
})