import { View, Text,Image, StatusBar,StyleSheet, TextInput, Button,TouchableOpacity, ScrollView , KeyboardAvoidingView, Platform} from 'react-native'
import React, {useState} from 'react'
import { router } from 'expo-router';


export default function Login() {
 const [isFocused, setIsFocused] = useState(false)
  
  return (
    <View className='bg-white h-full w-full'>
        <StatusBar style='light'/>
        <View className=' items-center mt-20 '>
          <Text className='text-4xl text-accent'>COURSEPASS</Text>
        </View>
        <View className='items-center mt-20  '>
          <Text className='text-4xl text-accent font-bold'>REGISTER</Text>
        </View>

        <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 20 }}>
           <TextInput 
                className=' bg-black/5 p-5 mb-4 rounded-2xl w-fullrounded-2xl '
                style={[isFocused ? styles.focusedInput: null]}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder='Fullname'  placeholderTextColor={'gray'}
            />
            <TextInput  
                className=' bg-black/5 p-5 mb-4 rounded-2xl w-fullrounded-2xl '
                style={[isFocused ? styles.focusedInput: null]}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder='Username' secureTextEntry placeholderTextColor={'gray'}
            />
               <TextInput  
                className=' bg-black/5 p-5 mb-4 rounded-2xl w-fullrounded-2xl '
                style={[isFocused ? styles.focusedInput: null]}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder='Email' secureTextEntry placeholderTextColor={'gray'}
            />
               <TextInput  
                className=' bg-black/5 p-5 mb-4 rounded-2xl w-fullrounded-2xl '
                style={[isFocused ? styles.focusedInput: null]}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder='Phone(whatsapp)' secureTextEntry placeholderTextColor={'gray'}
            />
               <TextInput  
                className=' bg-black/5 p-5 mb-4 rounded-2xl w-fullrounded-2xl '
                style={[isFocused ? styles.focusedInput: null]}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder='Password' secureTextEntry placeholderTextColor={'gray'}
            />
               <TextInput  
                className=' bg-black/5 p-5 mb-4 rounded-2xl w-fullrounded-2xl '
                style={[isFocused ? styles.focusedInput: null]}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder='confirm Password' secureTextEntry placeholderTextColor={'gray'}
            />
         
          <TouchableOpacity  className='bg-accent  p-3 rounded-2xl mb-3'>
              <Text className='text-xl font-bold text-base text-center '> Confirm email</Text>
          </TouchableOpacity>

          <View className='flex-row justify-center p-3'>      
            <Text>Already had an account?</Text>
            <TouchableOpacity  >
           
                <Text className='text-accent font-bold'> Login</Text>
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