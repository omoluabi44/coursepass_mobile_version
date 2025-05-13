import { View, Text,Image, StatusBar,StyleSheet, TextInput, Button,TouchableOpacity, ScrollView , KeyboardAvoidingView, Platform} from 'react-native'
import React, {useState} from 'react'
import { useDispatch } from 'react-redux';
import { router } from 'expo-router';
import { loginUser } from '../redox/actions/loginActionCreator';


export default function Login() {
 const [password, setPassword] = useState('')
 const [username, setUsername] = useState('')
 const [isFocused, setIsFocused] = useState(false)
 const handleSignUp = () => {router.push('./signUp')};
 const dispatch = useDispatch();
 async function logIn() {
  try {
    await new Promise((resolve, reject) => {
      dispatch(loginUser(username, password)).then(resolve).catch(reject);
    });
    router.replace("/(Protected)/(Pages)");
  } catch (error) {
    console.error("Login failed:", error);

  }
}

  
  return (
    <View className='bg-white h-full w-full'>
        <StatusBar style='light'/>
        <View className=' items-center mt-20 '>
          <Text className='text-4xl text-accent'>COURSEPASS</Text>
        </View>
        <View className='items-center mt-20  '>
          <Text className='text-4xl text-accent font-bold'>LOGIN</Text>
        </View>

        <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 20 }}>
           <TextInput 
                className=' bg-black/5 p-5 mb-4 rounded-2xl w-fullrounded-2xl '
                style={[isFocused ? styles.focusedInput: null]}
                value={username}
                onChangeText={setUsername}              
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder='Email or Username'  placeholderTextColor={'gray'}
            />
            <TextInput  
                className=' bg-black/5 p-5 mb-4 rounded-2xl w-fullrounded-2xl '
                style={[isFocused ? styles.focusedInput: null]}
                value={password}
                onChangeText={setPassword}     
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder='Password' secureTextEntry placeholderTextColor={'gray'}
            />
         
          <TouchableOpacity onPress={logIn} className='bg-accent  p-3 rounded-2xl mb-3'>
              <Text className='text-xl font-bold text-base text-center '> Login</Text>
          </TouchableOpacity>

          <View className='flex-row justify-center p-3'>      
            <Text>dont have an account?</Text>
            <TouchableOpacity onPress={handleSignUp} >
           
                <Text className='text-accent font-bold'> Register</Text>
            </TouchableOpacity>
          </View>
       
      </ScrollView>
    </KeyboardAvoidingView>
    
    
        

        
        {/* <View className='h-full w-80 flex  justify-around pt-10 pb-10'  >
         
          <View     className='flex items-center'>
              <Text className='text-black font-bold tracking-wider text-5xl'> Login </Text>
        
          </View>
               
                <View className='flex items-center mx-4 space-y-4'>
                  <View className='bg-black/5 p-5 mb-4 rounded-2xl w-full'>
                  <TextInput placeholder='Email'  placeholderTextColor={'gray'}/>
                  </View>
                  
                  <View className='bg-black/5 p-5 mb-4 rounded-2xl w-full'>
                          <TextInput placeholder='Password'  placeholderTextColor={'gray'} secureTextEntry/>
                  </View>
                  <View className='w-full'>
                      <TouchableOpacity  className='bg-accent  p-3 rounded-2xl mb-3'>
                      <Text className='text-xl font-bold text-base text-center '> Login</Text>
                      </TouchableOpacity>
                  </View>
                  <View className='flex-row justify-center p-3'>
                    
                          <Text>dont have an account?</Text>
                          <TouchableOpacity  >
                      <Text className='text-accent'> Login</Text>
                      </TouchableOpacity>
            
                </View>

              </View>
        </View> */}
    </View>
  )
} 



const styles = StyleSheet.create({
  focusedInput: {
    borderColor: '#3498DB', // Change color when focused
    borderWidth: 1,
  },
})