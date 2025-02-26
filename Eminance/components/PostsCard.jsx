import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { images, icons } from '../constants'

const PostsCard = ({ itemdata: { name, thumbnail, description, creator } }) => {

    const [play, setPlay] = useState(false);

    return (
        <View className="flex flex-col items-center px-4 mb-14">
            <View className="flex flex-row gap-3 items-start">
                <View className="flex justify-center items-center flex-row flex-1">
                    <View className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
                        <Image source={images.profile} className='w-full h-full rounded-lg' resizeMode='cover' />
                    </View>
                    <View className='justify-center flex-1 ml-3 gap-y-1'>
                        <Text className="font-psemibold text-sm text-white" numberOfLines={1}>{name}</Text>
                        <Text className="text-xs text-gray-100 font-pregular" numberOfLines={1}>Dheeraj</Text>
                    </View>
                    <View className="pt-2">
                        <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
                    </View>
                </View>
            </View>
            {/* source={{uri: thumbnail }} */}
            {play ? (<Text className="text-white">Playing</Text>) : (
                <TouchableOpacity 
                activeOpacity={0.7}
                onPress={()=>{setPlay(true)}}
                className="w-full h-60 rounded-xl mt-3 relative flex justify-center items-center">
                    <Image
                        source={{uri: thumbnail }}
                        className="w-full h-full rounded-xl mt-3"
                        resizeMode='cover'
                        onError={(error) => console.log("Image Load Error: ", error.nativeEvent)}
                    />
                    <Image
                        source={icons.play}
                        className="w-12 h-12 absolute"
                        resizeMode='cover'
                    />
                </TouchableOpacity>
            )}
        </View>
    )
}

export default PostsCard