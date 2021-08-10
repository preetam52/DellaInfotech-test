import {StyleSheet, Dimensions, StatusBar} from 'react-native';
import { variables } from '../../globalStyles';

export const styles = StyleSheet.create({
    
    img: {
        width: variables.width,
        height: variables.height,
        flex:1,
        justifyContent: 'flex-end',
    },
    options: {
        flexDirection: "row",
        backgroundColor: variables.color.secondary,
        padding: 10
    },

    opt: {
        flex: 1,
        alignItems:"center"
    }
})