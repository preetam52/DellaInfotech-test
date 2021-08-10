import {StyleSheet, Dimensions, StatusBar} from 'react-native';
import { variables } from '../../globalStyles';

export const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        minHeight: variables.height,
        backgroundColor: "white"
    },

    dp: {
        padding: 10
    },

    profilePicture: {
        width: 100,
        height:100,
        borderRadius: 100
    },

    loginBtn: {
        padding: 12,
        marginVertical: 10,
        backgroundColor: variables.color.primary,
        alignItems: "center"
    },

    btnTxt: {
        color: "white"
    }
})