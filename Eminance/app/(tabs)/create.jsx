import { View, Text, TextInput, Image, TouchableOpacity, ScrollView, Alert } from "react-native";
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { createUserPosts } from '../../lib/appwrite'
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";

const create = () => {

  const [form, setForm] = useState({
    name: "",
    description: "",
    image: null
  })

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Required", "You need to allow access to your photos.");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setForm({ ...form, image: result.assets[0].uri });
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      if (!form.name || form.description) {
        Alert.alert(
          "Validation Error",
          "title and Description cant be Empty"
        );
        return null;
      }
      formData.append("name", form.name);
      formData.append("description", form.description);

      if (form.image) {
        const imageFile = {
          uri: form.image,
          name: `image_${Date.now()}.jpg`,
          type: "image/jpeg",
        };
        formData.append("thumbnail", imageFile);

        console.log("Image File:", imageFile);
      }

      const result = await createUserPosts(formData);

      if (result.success) {
        Alert.alert("Success", "Post Created Successfully!");
      } else {
        Alert.alert("Error", result.message);
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className="w-full min-h-[84vh] px-6 my-6 items-center">
          <Text className="text-white text-2xl font-bold mb-4">Create Post</Text>
          {form.image && <Image source={{ uri: form.image }} className="w-32 h-32 rounded-lg mb-4" />}

          <FormField
            placeholder="Enter Post title"
            value={form.name}
            handleChangetext={(text) => setForm({ ...form, name: text })}
            otherStyles="mt-10"
          />

          <FormField
            placeholder="Enter Description"
            value={form.description}
            handleChangetext={(text) => setForm({ ...form, description: text })}
            otherStyles="mt-2"
          />


          <TouchableOpacity onPress={pickImage} className="w-full bg-blue-500 p-4 rounded-lg mb-4 items-center mt-5">
            <Text className="text-white font-bold">{form.image ? "Change Image" : "Upload Image"}</Text>
          </TouchableOpacity>

          <CustomButton title="Create Post" handlePress={handleSubmit} containerStyles="mt-7 w-full" />

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default create