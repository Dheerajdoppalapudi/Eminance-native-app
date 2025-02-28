import { Text, View, ScrollView, Image, ActivityIndicator, Alert, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState } from 'react'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { Register } from '../../lib/appwrite'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const SignUp = () => {

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async () => {
    const result = await Register(form.username, form.email, form.password);

    if (result.success) {
      Alert.alert('Success', result.message);
      router.replace('/sign-in');
    } else {
      Alert.alert('Error', result.message);
    }
    setIsSubmitting(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <KeyboardAwareScrollView
        extraScrollHeight={100}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
      >
        <View className="w-full justify-center min-h-[84vh] px-6 my-6">
          <Image source={images.logo} resizeMode='contain' className="w-[115px] h-[35px]" />
          <Text className='text-2xl text-white text-semibold mt-7 font-psemibold my-3'>Sign Up to Eminanace </Text>
          <FormField
            title="Username"
            value={form.username}
            handleChangetext={(text) => setForm({ ...form, username: text })}
            otherStyles="mt-10"

          />
          <FormField
            title="Email"
            value={form.email}
            handleChangetext={(text) => setForm({ ...form, email: text })}
            otherStyles="mt-7"
            keyboardType='email-address'
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangetext={(text) => setForm({ ...form, password: text })}
            otherStyles="mt-7"
          />
          <CustomButton title="Sign Up" handlePress={submit} containerStyles="mt-7" isLoading={isSubmitting} />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">Have an Account already?</Text>
            <Link href="/sign-in" className='text-lg font-psemibold text-secondary'>Sign-In</Link>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

export default SignUp