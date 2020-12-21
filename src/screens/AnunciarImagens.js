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
import { uploadImage } from '../services/storageService';


import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from 'react-native-paper';

import stylesCommon from '../components/stylesCommon'

const width = Dimensions.get('window').width * 0.9;

const AnunciarImagens = ({ navigation }) => {
    console.log('--- AnunciarDescricao --- ')

    const [images, setImages] = useState([]);
    const { colors } = useTheme();

    const continuar = () => {
        console.log("continuar")

        //        anuncio.descricao = input;

        //     console.log(anuncio)

        // if (input.length > 19) {
        //     navigation.navigate('AnunciarCategoria', { anuncio: anuncio, });
        // } else {
        //     setIsMessageWarning(true)
        //  }
    }

    const onHadleSelectImageCamera = () => {
        console.log('onHadleSelectImage')
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
            setImages(source);
            console.log('source:' , source)
            console.log('res:', res)
        })
    }

    const onHadleSelectImage = () => {
        console.log('onHadleSelectImage')

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
            setImages(source);
            console.log('source:' , source)
            console.log('res:', res)
        })
    }

    const cleanPicker = () => {
        ImagePicker.clean().then(() => {
            console.log('removed all tmp images from tmp directory');
        }).catch(e => {
            alert(e);
        });
    }

    const onHandleSubmit = async () => {
        const picsUrls = [];
        await sendingImageArray(images)
            .then(urls => picsUrls.push(...urls))
            .catch(err => console.log(err));

        console.log(picsUrls);
    };

    const sendingImageArray = async (images) => {
        console.log('sendingImageArray')
        return Promise.all(images.map(image => uploadImage(image.base64)));
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
                }]}>Faça upload de imagens do seu anúncio</Text>



                <View style={styles.imageViewContainer}>
                    <SliderBox resizeMethod={'resize'}
                        images={images}
                        parentWidth={width}
                        ImageComponentStyle={{ height: 300, width: width }} />
                </View>

                <View style={styles.buttonsContainer}>

                    <TouchableOpacity onPress={onHadleSelectImage} style={styles.buttonStyle}>
                        <Text style={styles.textButton}>Escolher Imagens na galeria</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={onHadleSelectImageCamera} style={styles.buttonStyle}>
                        <Text style={styles.textButton}>Tirar uma foto</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={onHandleSubmit} style={styles.buttonStyle}>
                        <Text style={styles.textButton}>Enviar</Text>
                    </TouchableOpacity>
                </View>


                <View style={stylesCommon.button}>
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