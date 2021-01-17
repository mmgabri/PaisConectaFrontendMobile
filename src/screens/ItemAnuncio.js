import React from 'react';
import { View, Text, StyleSheet, Dimensions, } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SliderBox } from 'react-native-image-slider-box';

import { enunsTipoAnuncio, enunsTipoCategoria } from '../services/enuns'
import stylesCommon from '../components/stylesCommon'

const width = Dimensions.get('window').width * 0.9;

const ItemAnuncio = ({ anuncio }) => {
    console.log('--- ItemAnuncio --- ')
    const { colors } = useTheme();

    return (
        <>

            <View style={styles.imageViewContainer}>
                <SliderBox resizeMethod={'resize'}
                    images={anuncio.imagens}
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

        </>
    )

};

export default ItemAnuncio;

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