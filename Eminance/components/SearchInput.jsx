import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'

const SearchInput = ({ title, value, placeholder, handleChangetext, otherstyles, ...props }) => {
    const [showPassword, setShowPassword] = useState(false)
    return (

        <View className='border-2 w-full h-16 border-black-200 px-4 bg-darkgray rounded-2xl focus:border-secondary items-center flex-row space-x-4'>
            <TextInput
                className='text-base mt-0.5 text-white flex-1 font-pregular'
                value={value}
                placeholder={placeholder}
                placeholderTextColor='#7b7b8b'
                onChangeText={handleChangetext}
                secureTextEntry={title == 'Password' && !showPassword}
            />
            <TouchableOpacity>
                <Image source={icons.search} className='w-5 h-5' resizeMode='contain' />
            </TouchableOpacity>
        </View>
    )
}

export default SearchInput