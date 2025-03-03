import { View, Text, FlatList, ScrollView, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useRef } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import { icons } from '../../constants'


const Bookmark = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const scrollViewRef = useRef();

  const sendMessage = () => {
    if (input.trim().length === 0) return;

    const userMessage = { id: Date.now().toString(), text: input, sender: 'user' };
    const botMessage = { id: (Date.now() + 1).toString(), text: input, sender: 'bot' };

    setMessages((prevMessages) => [...prevMessages, userMessage, botMessage]);
    setInput('');
  };

  npm install @tensorflow/tfjs @tensorflow/tfjs-react-native
npm install react-native-tflite

  return (
    <View className="bg-vvdarkgrey h-full">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
        <View className="w-full flex-row items-center justify-center py-4">
          <Text className="text-white text-xl font-psemibold text-center">Eminance</Text>
          {/* <Image source={icons.sparkicon} className='w-7 h-7' resizeMode='contain' /> */}
        </View>
        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
          className="flex-1"
        >
            {messages.map((message) => (
            <View className={`w-full px-4 my-2 flex ${message.sender === 'user' ? 'items-end' : 'items-start'}`} key={message.id}>
              <View className={`max-w-[75%] p-3 rounded-lg ${message.sender === 'user' ? 'bg-darkgray' : 'bg-Chatcomponet'}`}>
                <Text className="text-white">{message.text}</Text>
              </View>
            </View>
          ))}
          </ScrollView>
        <View className="absolute bottom-0 w-full p-2 bg-vdarkgrey flex-row items-center">
          <TextInput
            className="flex-1 bg-darkgray text-white p-3 rounded-lg mr-3"
            placeholder="Type a message..."
            placeholderTextColor="#ccc"
            value={input}
            onChangeText={setInput}
          />
          <TouchableOpacity onPress={sendMessage} className="bg-darkgray p-3 rounded-lg">
            <Text className="text-white">Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}

export default Bookmark