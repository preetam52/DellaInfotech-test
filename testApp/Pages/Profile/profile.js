import React, { Component, useState, useEffect } from 'react'
import { SafeAreaView, Text, View, Image, BackHandler } from 'react-native'
import Footer from '../../Components/Footer/footer'
import Gallery from '../../Components/Gallery/gallery'
import { firebaseService } from '../../services/firebaseServices'
import { styles } from './styles'
import firestore from '@react-native-firebase/firestore';


export default Profile  = (props) => {
    
    const [uid, setUid] = useState(props.navigation.getParam('uid'));
    const [posts, setPosts] = useState([]);
    
    function User( uid ) {
        useEffect(() => {
            let backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress)
          const subscriber = firestore()
            .collection('users')
            .doc(uid)
            .onSnapshot(documentSnapshot => {
              console.log('User data: ', documentSnapshot.data());
              if(documentSnapshot.data())
              setPosts(documentSnapshot.data().posts)

            });
      
          // Stop listening for updates when no longer required
          return () => subscriber();
        }, [uid]);
      }
      User(uid)

      const handleBackPress = async () => {
        if (props.navigation.isFocused()) {
          BackHandler.exitApp();
        }
        else {
          props.navigation.goBack(null)
        }
      }
    
        return (
            <SafeAreaView>
                <View style={styles.container}>

                    <View style={styles.dp}>
                    <Image style={styles.profilePicture} source={{uri:"https://funkylife.in/wp-content/uploads/2021/06/whatsapp-dp-pic-24-scaled.jpg"}}/>
                    </View>

                    <Gallery posts={posts}/>

                    
                <Footer uid={uid} posts={posts}/>
                </View>
            </SafeAreaView>
        )
    
}
