import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StatusBar, StyleSheet, Dimensions, ScrollView } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';

const AlertService = ({ route, navigation }) => {
    console.log('--- AlertService --- ')

    const [queueSize, setQueueSize] = useState(0);
    let dropDownAlertRef = useRef(null);

    const _onClose = (data) => {
        console.log(data);
        _updateQueueSize();
    };
    const _onCancel = (data) => {
        console.log(data);
        _updateQueueSize();
    };
    const _onTap = (data) => {
        console.log(data);
        _updateQueueSize();
    };
    const _updateQueueSize = () => {
        setQueueSize(dropDownAlertRef.getQueueSize());
    };
    const _showAlertQueue = () => {
        const types = ['info', 'warn', 'error', 'success', 'custom'];
        const message =
            'Officia eu do labore incididunt consequat sunt sint ullamco cillum.';
        let count = 1;
        types.map((type) => {
            dropDownAlertRef.alertWithType(
                type,
                `Alert ${count} of ${types.length}`,
                message,
            );
            count++;
        });
    };

    return (

        <DropdownAlert
            ref={(ref) => {
                if (ref) {
                    dropDownAlertRef = ref;
                }
            }}
            containerStyle={styles.content}
            showCancel={true}
            onCancel={_onCancel}
            onTap={_onTap}
            titleNumOfLines={2}
            messageNumOfLines={0}
            onClose={_onClose}
        />
    );
}



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