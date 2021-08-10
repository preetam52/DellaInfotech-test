import React from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, ToastAndroid } from 'react-native'
import { styles } from './styles'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import { variables } from '../../globalStyles';
import { firebaseService } from '../../services/firebaseServices';
import Icon from 'react-native-vector-icons/dist/Ionicons'



class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        // firebaseService.getRealtimeFromFirebase('users').subscribe((snap) => {
        //     console.log("snappppp", snap);
        // })
    }

    static getDerivedStateFromProps(props, current_state) {
        if (current_state.posts !== props.posts) {
            console.log("props changeeeeeeed", props.posts);

            return {
                posts: props.posts,
            }
        }
        return null
    }

    launchImageLibrarys = () => {
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
            quality: 0.7,
            mediaType: "mixed"
        };
        launchImageLibrary(options, (response) => {
            // console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                console.log('size', response.fileSize)
                let path = this.getPlatformPath(response.assets[0]).value;
                console.log("mmm", path);
                let fileName = this.getFileName(response.fileName, path);
                this.setState({ imagePath: path });
                this.uploadImageToStorage(path, fileName);


            }
        });
    }

    getFileName(name, path) {
        if (name != null) { return name; }

        if (Platform.OS === "ios") {
            path = "~" + path.substring(path.indexOf("/Documents"));
        }
        console.log(path);
        return path.split("/").pop();
    }

    uploadImageToStorage(path, name) {
        console.log({ path, name });
        this.setState({ isLoading: true });
        let reference = storage().ref(`images/${name}`);
        let task = reference.putFile(path);
        let status
        task.then(() => {
            console.log('Image uploaded to the bucket!');
            status = 'Image uploaded successfully';
            this.myToaster(status)
            this.setState({ isLoading: false, status: 'Image uploaded successfully' }, () => {

                reference.getDownloadURL()
                    .then((url) => {
                        console.log("urlllll", url);
                        const arr = JSON.parse(JSON.stringify(this.state.posts))
                        arr.push({ url: url })
                        console.log("================>", this.state.posts, arr);
                        firebaseService.updateToFirebase('users', this.props.uid, { posts: arr })
                    })
                    .catch((e) => console.log('getting downloadURL of image error => ', e));
            });
        }).catch((e) => {
            status = 'Something went wrong';
            this.myToaster(status)
            console.log('uploading image error => ', e);
            this.setState({ isLoading: false, status: 'Something went wrong' });
        });
    }

    /**
     * Get platform specific value from response
     */
    getPlatformPath({ path, uri }) {
        return Platform.select({
            android: { "value": uri },
            ios: { "value": uri }
        })
    }

    getPlatformURI(imagePath) {
        let imgSource = imagePath;
        if (isNaN(imagePath)) {
            imgSource = { uri: this.state.imagePath };
            if (Platform.OS == 'android') {
                imgSource.uri = "file:///" + imgSource.uri;
            }
        }
        return imgSource
    }

    myToaster = (msg) => {
        ToastAndroid.showWithGravity(
            msg,
            ToastAndroid.SHORT, //can be SHORT, LONG
            ToastAndroid.BOTTOM //can be TOP, BOTTON, CENTER
        );
    }


    render() {
        console.log("posssssst", this.state.posts);
        return (
            <View style={styles.footer}>

                <TouchableOpacity activeOpacity={0.7} style={styles.addBtn} onPress={() => !this.state.isLoading && this.launchImageLibrarys()}>

                    {this.state.isLoading ? <ActivityIndicator color={variables.color.primary} /> : <Icon name={'md-camera'} size={25}
                        color={variables.color.primary} ></Icon>}

                </TouchableOpacity>

            </View>
        )
    }

}

export default Footer
