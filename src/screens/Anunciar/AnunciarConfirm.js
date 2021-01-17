import React from 'react';
import { View, Text, TouchableOpacity, StatusBar, StyleSheet, ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from 'react-native-paper';
import AwesomeLoading from 'react-native-awesome-loading';
import { CommonActions } from '@react-navigation/native';

import { useAuth } from '../../contexts/auth';
import { apiAnuncio } from '../../services/api';
import stylesCommon from '../../components/stylesCommon'
import { uploadImage } from '../../services/storageService';
import ItemAnuncio from '../ItemAnuncio';
import { useState } from 'react';


const AnunciarConfirm = ({ route, navigation }) => {
    console.log('--- AnunciarConfirm --- ')

    const [isLoading, setIsLoading] = useState(false);
    const { user, _showAlert } = useAuth();
    const { anuncio } = route.params;
    console.log("anuncio: ", anuncio.imagensDevice)
    const { colors } = useTheme();

    const onHandleSubmit = async () => {

        console.log("onHaldleSubmit: ", anuncio.imagensDevice)

        if (anuncio.imagensDevice) {
            const picsUrls = [];
            await sendingImageArray(anuncio.imagens)
                .then(urls => picsUrls.push(...urls))
                .catch(err => console.log(err));
            return (picsUrls);
        } else {
            return (anuncio.imagens)
        }
    };

    const sendingImageArray = async (imagens) => {
        console.log('sendingImageArray')
        return Promise.all(imagens.map(image => uploadImage(image.base64)));
    }

    const publicarAnuncio = () => {
        console.log('publicar anuncio')
        setIsLoading(true);

        const anuncioObject = {
            id: null,
            titulo: '',
            descricao: '',
            tipo: '',
            categoria: '',
            valor: 0,
            cep: '',
            idUsuario: '',
            imagens: []
        }

        anuncioObject.id = anuncio.id;
        anuncioObject.titulo = anuncio.titulo;
        anuncioObject.descricao = anuncio.descricao;
        anuncioObject.tipo = anuncio.tipo;
        anuncioObject.categoria = anuncio.categoria;
        anuncioObject.cep = anuncio.cep;
        anuncioObject.idUsuario = user.uid;

        if (anuncio.valor == 0) {
            anuncioObject.valor = anuncio.valor
        } else {
            anuncioObject.valor = anuncio.valor.replace(/[^0-9,]*/g, '').replace(',', '.');
        }

        onHandleSubmit()
            .then((picsUrls) => {

                console.log

                anuncioObject.imagens = picsUrls;

                var method = ''
                if (anuncioObject.id) {
                    apiAnuncio.put('/anuncios', anuncioObject)
                        .then(() => {
                            setIsLoading(false);
                            _showAlert('success', 'Anúncio alterado com sucesso', '', 3000);
                            navigation.dispatch(CommonActions.reset({
                                index: 1, routes: [
                                    { name: 'MeusAnuncios' },
                                    { name: 'MeusAnuncios' },
                                ],
                            }));
                        })
                        .catch((error) => {
                            setIsLoading(false);
                            _showAlert('error', 'Ooops!', `Algo deu errado. ` + error, 7000);
                        });
                } else {
                    apiAnuncio.post('/anuncios', anuncioObject)
                        .then(() => {
                            setIsLoading(false);
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
                }
            })
            .catch(error => {
                setIsLoading(false);
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

                        <ItemAnuncio anuncio={anuncio} />

                        <View style={stylesCommon.button}>
                            <TouchableOpacity
                                style={stylesCommon.button_styte}
                                onPress={() => { publicarAnuncio() }}
                            >
                                <LinearGradient
                                    colors={['#08d4c4', '#01ab9d']}
                                    style={stylesCommon.button_styte}
                                >
                                    {!anuncio.id ?
                                        <Text style={[stylesCommon.button_text, {
                                            color: '#fff'
                                        }]}>Publicar</Text>
                                        :
                                        <Text style={[stylesCommon.button_text, {
                                            color: '#fff'
                                        }]}>Alterar</Text>
                                    }
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