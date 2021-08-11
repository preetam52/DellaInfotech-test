import React, { Component } from 'react'
import { Text, View, SafeAreaView, useColorScheme, TextInput, TouchableOpacity} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import { styles } from './styles';
import auth from '@react-native-firebase/auth';
import { firebaseService } from '../../services/firebaseServices';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    

    componentDidMount() {
        auth().onAuthStateChanged( (user) => {
            if (user) {

                firebaseService.getDataFromFireStore('users', user.uid).then((data) => {
                    if(!data) {
                        let myUser = {
                            uid: user.uid,
                            posts: []
                        }
                        firebaseService.setDataToFireStore('users',user.uid, myUser)
                    }
                })
                this.props.navigation.navigate("Profile", {uid: user.uid});
            } 
            else 
            {
                // reset state if you need to 
                console.log("verify otp manually");
            }
        });
    };  

    onTextChange = (val, key) => {
        this.setState({
            [key] : val
        })
    }

    requestForOTP = async () => {
        try {
            const confirmation = await auth().signInWithPhoneNumber(`+91${this.state.phoneNo}`);
            this.setState({confirmation})
          } catch (error) {
            alert(error);
          }
    }

    verifyOTP = async () => {
        try {
            await this.state.confirmation.confirm(this.state.otp);
            this.setState({confirmation: null}, () => {
                
                this.props.navigation.navigate('Profile')})
          } catch (error) {
              console.log("err", error);
            alert('Invalid code', error);
          }
    }
    render() {

        return (
            <SafeAreaView >
                <View style={styles.container}>
                    {!this.state.confirmation ? <View>
                    <TextInput style={styles.inp} placeholder="Enter your mobile number" placeholderTextColor= "#70757a" keyboardType="phone-pad"
                    onChangeText={(e) => this.onTextChange(e, 'phoneNo')}/>

                    <TouchableOpacity style={styles.loginBtn} activeOpacity={0.8} onPress={() => this.state.phoneNo && this.requestForOTP()}>
                        <Text style={styles.btnTxt}>Request for OTP</Text>
                    </TouchableOpacity>
                    </View>
                    
                    :

                    <View>
                    <TextInput style={styles.inp} placeholder="Enter your OTP" placeholderTextColor= "#70757a" keyboardType="phone-pad"
                    onChangeText={(e) => this.state.otp && this.onTextChange(e, 'otp')}/>

                    <TouchableOpacity style={styles.loginBtn} activeOpacity={0.8} onPress={() => this.verifyOTP()}>
                        <Text style={styles.btnTxt}>Verify</Text>
                    </TouchableOpacity>
                    </View>
                    }
                    

                </View>
            </SafeAreaView>
        )
    }
}
