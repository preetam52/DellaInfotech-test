import React, { Component } from "react";
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    ImageBackground,
    View, TouchableOpacity, Image, Dimensions
} from "react-native";
import Icon from 'react-native-vector-icons/dist/Ionicons'
import { variables } from "../../globalStyles";
import {styles} from "./styles"



class ImageModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            liked: false
        }
    }
    

   

    render() {
        return (
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.props.isOpen}
                    onRequestClose={() => {
                        this.props.closeModal();
                    }}
                >
                     <ImageBackground resizeMode="contain" source={this.props.post}
                    style={styles.img} >
                        <View style={styles.options}>

                        <TouchableOpacity onPress={() => this.setState({liked: !this.state.liked})} style={styles.opt}><Icon name="md-heart" size={25} color={this.state.liked? variables.color.primary : "#F8F0E3"}/></TouchableOpacity>
                        <TouchableOpacity style={styles.opt}><Icon name="md-chatbox" size={25} color={"#F8F0E3"}/></TouchableOpacity>
                        <TouchableOpacity style={styles.opt}><Icon name="md-arrow-redo" size={25} color={"#F8F0E3"}/></TouchableOpacity>
                    </View>
                    </ImageBackground>

                    
                </Modal>

               
            </View>
        );
    }
}



export default ImageModal;
