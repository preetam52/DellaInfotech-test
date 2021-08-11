import React, { useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import { variables } from '../../globalStyles'
import ImageModal from '../Modal/ImageModal'


const Gallery = ({posts}) => {
    const [isOpen, setisOpen] = useState(false)
    const [activePost, setActivePost] = useState({})
    const extractItemKey = (item, index) => `${index}`
    const renderItem = ({ item, index }) => (
        <React.Fragment >
            <TouchableOpacity activeOpacity={0.7} onPress={() => imageClicked({uri: item.url})}>
                <Image
                    style={{
                        flex:1,
                        width: variables.width/3.05,
                        height: variables.width/3.05,
                        margin: 1
                    }}
                    source={{uri: item.url}}
                />
            </TouchableOpacity>
        </React.Fragment>
    )

    const imageClicked = (post) => {
        setActivePost(post)
        setisOpen(true)
    }

    const closeModal = () => setisOpen(false)
    return (
        <View style={{ flex: 1 }}>
            <ImageModal isOpen={isOpen} closeModal={() => closeModal()} post={activePost}/>
            <FlatList
                data={posts}
                numColumns={3}
                keyExtractor={extractItemKey}
                renderItem={renderItem}
                ListHeaderComponent={() => (!posts?.length ? 
                    <Text style={{textAlign: "center"}}>The list is empty.</Text>  
                    : null)}
            />
        </View>
    )
}

export default Gallery
