import { Text, View, ScrollView, Image, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState } from 'react'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { SignInApi } from '../../lib/appwrite'

const SignIn = () => {

  const [form, setForm] = useState({
    username: '',
    password: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async () => {

    // setIsSubmitting(true);
    const result = await SignInApi(form.username, form.password);

    if (result.success) {
      Alert.alert('Success', result.message);
      router.replace('/home');
    } else {
      Alert.alert('Error', result.message);
    }
    setIsSubmitting(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className=" w-full justify-center min-h-[84vh] px-6 my-6">
          <Image source={images.logo} resizeMode='contain' className="w-[185px] h-[35px]" />
          <Text className='text-2xl text-white text-semibold mt-10 font-psemibold my-6'>Login</Text>
          <FormField
            title="Username"
            value={form.username}
            placeholder="Enter Username"
            handleChangetext={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-10 bg-darkgray"
          />
          <FormField
            title="Password"
            placeholder="Enter Password"
            value={form.password}
            handleChangetext={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />
          <CustomButton title="Sign In" handlePress={submit} containerStyles="mt-7" isLoading={isSubmitting} />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">Dont have an Account?</Text>
            <Link href="/sign-up" className='text-lg font-psemibold text-secondary'>Sign-Up</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn