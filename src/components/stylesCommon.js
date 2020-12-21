import { StyleSheet } from 'react-native'

const stylesCommon = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387'
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 30,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    infoMsg: {
        color: '#3c3b3c',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    button_styte: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    button_text: {
        fontSize: 18,
        fontWeight: 'bold'
    },

    center: {
        alignItems: 'center',
        marginTop: 50
    },
});

export default stylesCommon;