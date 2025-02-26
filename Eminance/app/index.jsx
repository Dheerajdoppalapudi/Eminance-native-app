import { Text, View, ScrollView, Image } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { Redirect, router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../constants'
import CustomButton from '../components/CustomButton'
import { useGlobalContext } from '../context/GlobalProvider'

const IndexLayout = () => {
  const {isLoading, isLoggedIn} = useGlobalContext();

  if(!isLoading && isLoggedIn) return <Redirect href="/home"/>

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{height: '100%'}}>
        <View className=" w-full justify-center items-center min-h-[85vh] px-4">
          <Image 
          source={images.logo}
          className='w-[130] h-[84px]'
          resizeMode='contain'
          />
          <Image 
          source={images.cards}
          className='w-[380px] h-[300px]'
          resizeMode='contain'
          />
          <View className='relative mt-5'>
            <Text className='text-3xl text-white fond-bold text-center'>Discover Endless Possiblities with {''}
              <Text className='text-secondary-200'>Eminance</Text>
            </Text>
          </View>
          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            where creativity meets innovation: Embark on journey of limitless exploration with Eminance 
          </Text>
          <CustomButton title="Continue with Email" handlePress={()=>router.push('/sign-in')} containerStyles ="w-full mt-7"/>
        </View>
      </ScrollView>
      <StatusBar backgroundColor='#161622' style='light'/>
    </SafeAreaView>
  )
}

export default IndexLayout