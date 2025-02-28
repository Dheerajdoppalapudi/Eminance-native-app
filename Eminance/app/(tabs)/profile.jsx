import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, ScrollView, Image, Button } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { getCurrentUser, UpdateUserProfile, GetUserPosts, signOut } from '../../lib/appwrite'
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { useGlobalContext } from '../../context/GlobalProvider';
import { images } from '../../constants'
import { Link, router } from 'expo-router'
import * as Location from "expo-location";

const Profile = () => {

  const { user } = useGlobalContext();

  const [userinfo, setUserInfo] = useState(null);
  const [userDataPosts, setUserDataPosts] = useState([])
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    setLoading(true)

    fetchUserProfile();
    fetchUserPosts();
    getLocation();

    setLoading(false)
  }, []);

  const fetchUserProfile = async () => {
    const userData = await getCurrentUser();
    if (userData) {
      setUserInfo(userData);
    }
  };

  const fetchUserPosts = async () => {
    const userData = await GetUserPosts();
    if (userData) {
      setUserDataPosts(userData);
    }
    // console.log("userData: ", userDataPosts, "length: ", userDataPosts.length)
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePic(result.assets[0].uri);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const logout = async () => {
    try {
      await signOut();
      router.replace("/sign-in");
    } catch (error) {
      console.log("Error signing out:", error);
    }
  };

  const getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let locationData = await Location.getCurrentPositionAsync({});
      setLocation(locationData.coords);

      let addressData = await Location.reverseGeocodeAsync({
        latitude: locationData.coords.latitude,
        longitude: locationData.coords.longitude,
      });

      if (addressData.length > 0) {
        setAddress(addressData[0]); // Get the first address result
      }
    } catch (error) {
      Alert.alert("Error", "Could not fetch location");
    }
  };

  if (loading) {
    return (
      <SafeAreaView className="bg-primary h-full flex items-center justify-center">
        <ActivityIndicator size="large" color="#fff" />
      </SafeAreaView>
    );
  }

  const submit = async () => {
    const result = await UpdateUserProfile(userinfo);

    if (result.success) {
      Alert.alert('Success', result.message);
      fetchUserProfile();
    } else {
      Alert.alert('Error', result.message);
    }
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <StatusBar style="light" />
      <ScrollView>
        <View className="w-full min-h-[84vh] px-6 my-6 items-center">
          {/* className="w-full justify-center min-h-[84vh] px-6 my-6" */}
          <TouchableOpacity onPress={pickImage}>
            <Image
              source={images.profile}
              className="w-32 h-32 rounded-full border-2 border-white"
              resizeMode="cover"
            />
            <View className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full">
              <Text className="text-white text-xs">+</Text>
            </View>
          </TouchableOpacity>
          <Text className='text-white text-3xl font-bold mb-2'>{user ? user.username : "User"}</Text>
          <View className="mb-4">
            {errorMsg ? (
              <Text>{errorMsg}</Text>
            ) : location ? (
              <Text className="text-white">Latitude: {location.latitude}, Longitude: {location.longitude}
                {/* <Text>Country: {address.country}</Text>
              <Text>State: {address.region}</Text> */}
              </Text>
            ) : (
              <Text className="text-white">Fetching location...</Text>
            )}

            {/* <Button title="Get Location" onPress={getLocation} /> */}
          </View>
          <FormField
            title="Username"
            value={userinfo ? userinfo.username : ""}
            handleChangetext={(text) => setUserInfo({ ...userinfo, username: text })}
            otherStyles="mt-10"
          />
          <FormField
            title="Email"
            value={userinfo ? userinfo.email : ""}
            handleChangetext={(text) => setUserInfo({ ...userinfo, email: text })}
            otherStyles="mt-7"
            keyboardType='email-address'
          />
          <CustomButton title="Update" handlePress={submit} containerStyles="w-full mt-7" />
          <View className="mt-10 w-full">
            <Text className="text-white text-xl font-bold mb-3">Your Posts</Text>

            {userDataPosts.length === 0 ? (
              <Text className="text-gray-400 text-center">No posts available</Text>
            ) : (
              userDataPosts.map((post, index) => (
                <View key={index} className="bg-gray-800 p-4 rounded-lg mb-4 shadow-md">
                  <Text className="text-white text-lg font-bold">{post.name}</Text>
                  <Text className="text-gray-400 text-sm mt-1">
                    Created At: {formatDate(post.created_at)}
                  </Text>
                  <Text className="text-gray-300 text-sm mt-2">{post.description}</Text>
                  {post.thumbnail && (
                    <Image
                      source={{ uri: post.thumbnail }}
                      className="w-full h-48 rounded-lg mt-3"
                      resizeMode="cover"
                    />
                  )}
                </View>
              ))
            )}

          </View>
          <TouchableOpacity className={`w-full bg-vvdarkgrey rounded-xl min-h-[62px] justify-center items-center`}
            onPress={logout}
            activeOpacity={0.7}
            disabled={loading}
          >
            <Text className={`font-psemibold text-white`}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile