import React, { createContext, useState, useEffect, useContext, useRef } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, StatusBar } from "react-native";
import { enunsTipoCategoria } from '../services/enuns';
import { formatValor } from '../services/utils';
import Feather from 'react-native-vector-icons/Feather';

const ListAnuncio = ({ anuncios, showMoreVertical, editar, excluir, finalizar }) => {
    console.log("--- ListAnuncio ---")

    const [showOptions, setShowOptions] = useState(false);
    const [idSelected, setIdSelected] = useState('');

    function Item({ item }) {
        return (
            <View style={styles.listItem}>
                <Image source={{ uri: item.imagens[0] }} style={{ width: 80, height: 80 }} />
                <View style={{ alignItems: "center", flex: 1 }}>

                    <Text style={{ fontWeight: "bold", alignSelf: "flex-start", marginLeft: 10 }}>{item.titulo}</Text>
                    <Text style={{ alignSelf: "flex-start", marginLeft: 10 }} >
                        {enunsTipoCategoria(item.categoria)}
                    </Text>
                    <Text style={{ alignSelf: "flex-start", marginLeft: 10 }} >
                        {formatValor(item.valor)}
                    </Text>
                </View>

                {showMoreVertical &&
                    <View style={{
                        flex: 1,
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "flex-end",
                    }}>
                        {showOptions && idSelected == item.id ?
                            <>
                                <Feather
                                    style={{ margin: 3, color: "blue" }}
                                    name="edit-2"
                                    size={15}
                                    onPress={() => { editar(item) }}
                                > Editar</Feather>
                                <Feather
                                    style={{ margin: 3, color: "red" }}
                                    name="trash-2"
                                    size={15}
                                    onPress={() => { excluir(item) }}
                                > Excluir</Feather>
                                <Feather
                                    style={{ margin: 3, color: "#009387" }}
                                    name="check"
                                    size={15}
                                    onPress={() => { finalizar(item) }}
                                > Finalizar</Feather>
                            </>
                            :
                            <Feather
                                name="more-vertical"
                                size={15}
                                onPress={() => { setShowOptions(true), setIdSelected(item.id) }}
                            ></Feather>
                        }
                    </View>
                }
            </View>
        );
    }

    return (
        <FlatList
            style={{ flex: 1 }}
            data={anuncios}
            renderItem={({ item }) => <Item item={item} />}
            keyExtractor={item => item.id.toString()}
        />
    )
};

export default ListAnuncio;

const styles = StyleSheet.create({
    listItem: {
        borderLeftColor: "blue",
        margin: 5,
        padding: 5,
        backgroundColor: "#FFF",
        width: "100%",
        flex: 1,
        alignSelf: "center",
        flexDirection: "row",
        borderRadius: 5,
    }
});
