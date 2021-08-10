import firestore from '@react-native-firebase/firestore';
import {Observable} from 'rxjs'

const getDataFromFireStore = (collection ,id) => {

    
    return new Promise((resolve, reject) => {
        try {
            firestore().collection(collection).doc(id).get().then((user) => {
               
                resolve(user.data())
            }).catch((err) => reject(err));
        } catch (error) {
            reject(error)
        }
    })
    
}

const setDataToFireStore = (collection,id, data) => {

    return new Promise((resolve, reject) => {
        try {
            firestore().collection(collection).doc(id).set(data).then((user) => {
                resolve(user)
            }).catch((err) => reject(err));
        } catch (error) {
            reject(error)
        }
    })
    
}

const updateToFirebase = (collection, id, data) => {
    return new Promise((resolve, reject) => {
        try {
            firestore().collection(collection).doc(id).set(data).then(() => {
                resolve()
            }).catch((err) => reject(err))
        } catch (error) {
            reject(error)
        }
    })
}



export const firebaseService = {
    getDataFromFireStore, setDataToFireStore, updateToFirebase
}