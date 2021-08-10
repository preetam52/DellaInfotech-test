import {StyleSheet, Dimensions} from 'react-native';
import { variables } from '../../globalStyles';

const height = Dimensions.get('screen').height;

export const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        minHeight: height,
        // alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10
    },

    inp: {
        elevation: 1,
        backgroundColor: "white",
        color: "black",
        
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