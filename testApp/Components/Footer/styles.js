import {StyleSheet, Dimensions} from 'react-native';
import { variables } from '../../globalStyles';

const height = Dimensions.get('screen').height;

export const styles = StyleSheet.create({
    
    footer: {
        padding: 15,
        backgroundColor: variables.color.primary,
        alignItems: 'center'
    },

    addBtn: {
        backgroundColor: "white",
        padding: 4,
        width: 40,
        height: 40,
        borderRadius: 100,
        alignItems:"center",
        justifyContent: "center"
    }
})