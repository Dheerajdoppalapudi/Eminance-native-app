import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, router } from 'expo-router'
import { Alert } from "react-native";

const API_URL = 'http://localhost:8000/api';
const DRONE_URL = 'http://localhost:8000/drone';


export const Register = async (username, email, password) => {
    try {
        const response = await axios.post(`${API_URL}/signup/`, {
            username,
            email,
            password,
        });

        if (response.status === 201) {
            return { success: true, message: 'User registered successfully' };
        }
    } catch (error) {
        console.error('Register Error:', error.response?.data || error);
        return { success: false, message: error.response?.data || 'Registration failed' };
    }
};

export const SignInApi = async (username, password) => {
    try {

        const response = await axios.post(`${API_URL}/token/`, { username, password });
        console.log("response: ", response.data)
        if (response.status === 200) {
            const { access, refresh } = response.data;

            await AsyncStorage.setItem('accessToken', access);
            await AsyncStorage.setItem('refreshToken', refresh);

            return { success: true, message: 'Login successful' };
        }
    } catch (error) {
        console.error('Login Error:', error.response?.data || error);
        return { success: false, message: 'Invalid credentials' };
    }
};

export const getCurrentUser = async () => {
    try {
        const token = await AsyncStorage.getItem("accessToken");

        if (!token) {
            console.log("No access token found");
            router.replace("/sign-in");
            return null;
        }
        const response = await axios.get(`${API_URL}/user/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log("User Profile: ", response.data);
        return response.data;

    } catch (error) {
        console.log("Error fetching user profile: ", error.response?.data || error.message);
        return null;
    }
};

export const getAllPosts = async () => {
    try {
        const token = await AsyncStorage.getItem("accessToken");

        if (!token) {
            console.log("No access token found");
            Alert.alert(
                "Session Expired",
                "Your session has timed out. Please log in again.",
                [{ text: "OK", onPress: () => router.replace("/sign-in") }] // Redirect on "OK"
            );
            return null;
        }
        const response = await axios.get(`${DRONE_URL}/ideaslist/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        console.log("Error fetching user profile: ", error.response ? error.response.data : error.message);
        return null;
    }
};

export const getLatestPosts = async () => {
    try {
        const token = await AsyncStorage.getItem("accessToken");

        if (!token) {
            console.log("No access token found");
            router.replace("/sign-in");
            return null;
        }
        const response = await axios.get(`${DRONE_URL}/ideaslist/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        console.log("Error fetching user profile: ", error.response ? error.response.data : error.message);
        return null;
    }
};

export const UpdateUserProfile = async (updatedData) => {
    try {
        const token = await AsyncStorage.getItem("accessToken");

        if (!token) {
            console.log("No access token found/Expired");
            Alert.alert(
                "Session Expired",
                "Your session has timed out. Please log in again.",
                [{ text: "OK", onPress: () => router.replace("/sign-in") }] // Redirect on "OK"
            );

            return null;
        }

        const response = await axios.put(`${API_URL}/user/update/`, updatedData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 200) {
            return { success: true, message: 'Profile updated successfully' };
        }
    } catch (error) {
        console.error('Update Profile Error:', error.response?.data || error);
        return { success: false, message: error.response?.data || 'Profile update failed' };
    }
};

export const GetUserPosts = async () => {
    try {
        const token = await AsyncStorage.getItem("accessToken");

        if (!token) {
            console.log("No access token found");
            return null;
        }

        const response = await axios.get(`${DRONE_URL}/userposts/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // console.log("response: ", response)

        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error('error getting user Posts:', error.response?.data || error);
        return { success: false, message: error.response?.data || 'getting user posts Failed' };
    }
};

export const signOut = async () => {
    try {
        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.removeItem('refreshToken');

        Alert.alert(
            "Logout",
            "Logout Succesfull",
            [{ text: "OK", onPress: () => router.replace("/sign-in") }]
        );

        return { success: true, message: 'Logged out successfully' };
    } catch (error) {
        console.error('Logout Error:', error);
        return { success: false, message: 'Logout failed' };
    }
};