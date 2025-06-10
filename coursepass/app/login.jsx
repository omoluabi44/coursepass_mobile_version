import {
  View, Text, Image, StatusBar, StyleSheet, TextInput, Button,
  TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform,
  Modal, TouchableWithoutFeedback, Keyboard, Pressable, ActivityIndicator
} from 'react-native'
import React, {useState} from 'react'
import {useDispatch} from 'react-redux';
import {router} from 'expo-router';
import {loginUser} from '../redox/actions/loginActionCreator';
import PopUp from "../components/toast"
import axios from 'axios';
import Load from '../components/loader';
import {useNavigation} from '@react-navigation/native';

export default function Login() {
  const navigation = useNavigation();
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [email, setEmail] = useState('')
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSignUp = () => {router.push('./signUp')};
  const dispatch = useDispatch();
  async function logIn() {
    try {
      await new Promise((resolve, reject) => {
        dispatch(loginUser(username, password)).then(resolve).catch(reject);
      });
      router.replace("/(Protected)/(Pages)");
    } catch (error) {
      console.error("Login faileds:", error);
      // PopUp({ type: "error", title: "Login Failedf", message:`${ error}` });
   



    }
  }


  const handleChangepassword = async () => {

    try {
      const response = await axios.post('https://api.coursepass.me/api/v1/auth/change_password_request', {email})

      console.log(response.data.message);
      setLoading(false)
      PopUp({type: "success", title: "Successful", message: `${response.data.message}`});
      router.push("/forgetPassword")
      navigation.navigate("forgetPassword", {email})


    } catch (error) {
      console.log(error.response.data.error);
      console.log("exie");
      
      setLoading(false)
      setVisible(false)
      PopUp({type: "error", title: "Error", message: `${error.response.data.error}`});

    }
  }


  return (



    <View className='bg-white h-full w-full'>
      <Load visible={loading} data="sending code...."/>
      <StatusBar style='light' />
      <View className=' items-center mt-20 '>
        <Image
             style={{width:100,  height: 100, marginBottom: 20}}
                source={require('../assets/images/newLogo.png')}
              />
              <Text className="text-accent font-bold text-xl">CoursePass</Text>
      </View>
      <View className='items-center  mt-10 '>
        <Text className='text-4xl text-accent font-bold'>LOGIN</Text>
      </View>
      <Modal
        visible={visible}
        animationType="slide"
        transparent={true}
      // onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
          <View className="flex-1 justify-center items-center  px-4">
            <View className="bg-white w-full max-w-md rounded-2xl p-6 shadow-lg">
              <Text className="text-lg font-bold mb-4 text-center">Change Password</Text>

              <View className="mb-4">
                <Text className="text-gray-700 mb-1">Email address</Text>
                <TextInput
                  multiline
                  onChangeText={setEmail}
                  value={email}
                  numberOfLines={4}
                  className="border border-gray-300 rounded-lg p-3 text-base text-gray-800"
                  placeholder="Enter your email address"
                />
              </View>


              <View className="flex-row justify-between">
                <Pressable
                  className="bg-gray-300 px-4 py-2 rounded-lg"
                  onPress={() =>
                    setVisible(false)}
                >
                  <Text className="text-gray-700 font-medium">Cancel</Text>
                </Pressable>

                <Pressable
                  className="bg-accent px-4 py-2 rounded-lg"
                  onPress={() => {
                    setVisible(false)
                    handleChangepassword()
                    setLoading(true)
                  }}
                >
                  <Text className="text-white font-medium">Send</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}
      >
        <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center', padding: 20}}keyboardShouldPersistTaps="handled" >
          <TextInput
            className=' bg-black/5 p-5 mb-4 rounded-2xl w-fullrounded-2xl '
            style={[isFocused ? styles.focusedInput : null]}
            value={username}
            onChangeText={setUsername}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder='Email or Username' placeholderTextColor={'gray'}
          />
          <TextInput
            className=' bg-black/5 p-5 mb-4 rounded-2xl w-fullrounded-2xl '
            style={[isFocused ? styles.focusedInput : null]}
            value={password}
            onChangeText={setPassword}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder='Password' secureTextEntry placeholderTextColor={'gray'}
          />

          <TouchableOpacity onPress={logIn} className='bg-accent  p-3 rounded-2xl mb-3'>
            <Text className='text-xl font-bold text-base text-center '> Login</Text>
          </TouchableOpacity>
          <View className="items-center">


            <View className='flex-row justify-center p-3'>
              <Text>dont have an account?</Text>
              <TouchableOpacity onPress={handleSignUp} >

                <Text className='text-accent font-bold'> Register</Text>
              </TouchableOpacity>

            </View>
            <TouchableOpacity onPress={() => setVisible(true)} >

              <Text className='text-accent font-bold'> forgot password?</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </View>









  )
}



const styles = StyleSheet.create({
  focusedInput: {
    borderColor: '#3498DB', // Change color when focused
    borderWidth: 1,
  },
})