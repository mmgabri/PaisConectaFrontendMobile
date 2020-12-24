import React from 'react';
import { View, Text, TouchableOpacity, StatusBar, StyleSheet, Dimensions, ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from 'react-native-paper';
import { SliderBox } from 'react-native-image-slider-box';
import AwesomeLoading from 'react-native-awesome-loading';
import { CommonActions } from '@react-navigation/native';

import { enunsTipoAnuncio, enunsTipoCategoria } from '../services/enuns'
import { useAuth } from '../contexts/auth';
import { apiAnuncio } from '../services/api';
import stylesCommon from '../components/stylesCommon'
import { uploadImage } from '../services/storageService';
import { useState } from 'react';

const width = Dimensions.get('window').width * 0.9;

const AnunciarConfirm = ({ route, navigation }) => {
    console.log('--- AnunciarConfirm --- ')

    const [isLoading, setIsLoading] = useState(false);
    const { user, _showAlert } = useAuth();
    const { anuncio } = route.params;
    const { colors } = useTheme();

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

    const publicarAnuncio = () => {
        console.log('publicar anuncio')
        setIsLoading(true);
        const anuncioObject = {
            titulo: '',
            descricao: '',
            tipo: '',
            categoria: '',
            valor: 0,
            cep: '',
            idUsuario: '',
            imagens: []
        }

        anuncioObject.titulo = anuncio.titulo;
        anuncioObject.descricao = anuncio.descricao;
        anuncioObject.tipo = anuncio.tipo;
        anuncioObject.categoria = anuncio.categoria;
        anuncioObject.valor = anuncio.valor;
        anuncioObject.cep = anuncio.cep;
        anuncioObject.idUsuario = user.uid;

        onHandleSubmit()
            .then((picsUrls) => {
                console.log('UPLOAD CONCLUIDO:', picsUrls)
                anuncioObject.imagens = picsUrls;
                console.log('anuncioObject:', anuncioObject)
                apiAnuncio.post('/anuncios', anuncioObject)
                    .then(() => {
                        setIsLoading(false);
                        console.log('Chamada da apiAnuncio com sucesso')
                        _showAlert('success', 'Anúncio publicado com sucesso', '', 3000);
                        navigation.dispatch(CommonActions.reset({
                            index: 1, routes: [
                                { name: 'Anunciar' },
                                { name: 'MeusAnuncios' },
                            ],
                        }));
                    })
                    .catch((error) => {
                        setIsLoading(false);
                        _showAlert('error', 'Ooops!', `Algo deu errado. ` + error, 7000);
                    });
            })
            .catch(error => {
                setIsLoading(false);
                console.log('UPLOAD COM ERRO:', error)
                _showAlert('error', 'Ooops!', `Algo deu errado. ` + error, 7000);
            })
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
                        <Text style={[stylesCommon.text_footer, {
                            color: colors.text
                        }]}>Confirme os dados do seu anúncio</Text>

                        <View style={styles.imageViewContainer}>
                            <SliderBox resizeMethod={'resize'}
                                images={anuncio.images}
                                parentWidth={width}
                                ImageComponentStyle={{ height: 300, width: width }} />
                        </View>

                        <View style={[stylesCommon.text_footer, { marginTop: 15 }]} >
                            <Text style={[styles.text_titulo_detail]}>Titulo</Text>
                            <Text style={[stylesCommon.text_footer, {
                                color: colors.text
                            }]}>{anuncio.titulo}</Text>
                        </View>

                        <View style={[stylesCommon.text_footer, { marginTop: 15 }]} >
                            <Text style={[styles.text_titulo_detail]}>Descrição</Text>
                            <Text style={[stylesCommon.text_footer, {
                                color: colors.text
                            }]}>{anuncio.descricao}</Text>
                        </View>

                        <View style={[stylesCommon.text_footer, { marginTop: 15 }]} >
                            <Text style={[styles.text_titulo_detail]}>Categoria</Text>
                            <Text style={[stylesCommon.text_footer, {
                                color: colors.text
                            }]}>{enunsTipoCategoria(anuncio.categoria)}</Text>
                        </View>

                        <View style={[stylesCommon.text_footer, { marginTop: 15 }]} >
                            <Text style={[styles.text_titulo_detail]}>Tipo</Text>
                            <Text style={[stylesCommon.text_footer, {
                                color: colors.text
                            }]}>{enunsTipoAnuncio(anuncio.tipo)}</Text>
                        </View>

                        {anuncio.tipo == 'VENDA' &&
                            <View style={[stylesCommon.text_footer, { marginTop: 15 }]} >
                                <Text style={[styles.text_titulo_detail]}>Valor</Text>
                                <Text style={[stylesCommon.text_footer, {
                                    color: colors.text
                                }]}>{anuncio.valor}</Text>
                            </View>}

                        <View style={[stylesCommon.text_footer, { marginTop: 15 }]} >
                            <Text style={[styles.text_titulo_detail]}>CEP</Text>
                            <Text style={[stylesCommon.text_footer, {
                                color: colors.text
                            }]}>{anuncio.cep}</Text>
                        </View>


                        <View style={stylesCommon.button}>
                            <TouchableOpacity
                                style={stylesCommon.button_styte}
                                onPress={() => { publicarAnuncio() }}
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

                </ScrollView>
            </View>
        )
    }
};

export default AnunciarConfirm;

const styles = StyleSheet.create({
    text_titulo_detail: {
        color: '#363636',
        fontWeight: 'bold',
        textAlign: 'left',
        fontSize: 18

    },
    imageViewContainer: {
        margin: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
})