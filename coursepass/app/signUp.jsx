import { View, Text,Image, StatusBar,StyleSheet,Button, TextInput,TouchableOpacity, ScrollView , KeyboardAvoidingView, Platform} from 'react-native'
import React, {useState} from 'react'
import { router } from 'expo-router';
import Input from '../components/input';
import axios from 'axios';
import Loading from '../components/loader';
import { useNavigation } from '@react-navigation/native';
import PopUp from '../components/toast';



export default function Login() {
  const [visible, setVisible] = useState(false)
   const navigation = useNavigation();

 const [inputs, setInput] = useState({
  email:"",
  Fname: "",
  Lname:"",
  password:"",
  whatsap_num:"",
  username:""

 })
 const {email,Fname,Lname,password, whatsap_num, username} =inputs

 
 const [errors, setIsError] = useState({})
  let valid = true
 const validate = async ()=>{
  //validate email
  if(!inputs.email){
    handleError("please input email", "email")
    valid = false 
  }  else if (!inputs.email.match(/\S+@\S+\.\S+/)){
    handleError("please input valid email", "email")
    valid = false 
  }
 
 //validate password
 if(!inputs.whatsap_num){
  handleError("please input whatsapp number", "whatsap_num")
  valid = false 
}  else if (!inputs.whatsap_num.match(/^\+?[1-9]\d{12,14}$/)){
  handleError("please input valid whatsap number", "whatsap_num")
  valid = false 
}

//validate password
if(!inputs.password){
  handleError("please input whatsapp number", "password")
  valid = false 
}  else if (!inputs.password.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/)){
  handleError("your password should 8 character long, and include uppercase,lowercase and character", "password")
  valid = false 
}
//validate Fname
if(!inputs.Fname){
  handleError("please input First name", "Fname")
  valid = false 
}  
if(!inputs.Lname){
  handleError("please input Last name", "Lname")
  valid = false 
} 
if(!inputs.username){
  handleError("please input username", "username")
  valid = false 
}
if (valid){
  print("execute")

    try {
      setVisible(true)
      const response = await axios.post("http://172.20.10.5:5000/api/v1/auth/register", {
        email:email,
        Fname:Fname,
        Lname:Lname,
        password:password, 
        whatsap_num:whatsap_num,
        username:username
      });
      if (response.status === 201) {
        setVisible(false)
     
        navigation.navigate('confirmEmail', { username: username, email:email });
        
      
        console.log('registration successfull !!!', response.data );
        
      } else {
        setVisible(false)
        console.log (response.data.message);
       
      }
    } catch (err) {
      setVisible(false)
    PopUp({type: "error", title: "Error", message: `${err.response.data.error}`});
    
    }
  
  
  
}
}

  const handleOnChange = (text,input )=>{
 setInput(prevState => ({...prevState, [input]: text}))
  }
  const handleError=(error, input)=>{
    setIsError((pre => ({...pre, [input]:error})))

  }

  return (
    <View className='bg-white h-full w-full'>
        <Loading visible={visible} data="sending code..."/>
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
      

      <ScrollView 
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 20,  }}>
          <Input onChangeText={text =>  handleOnChange(text, "Fname") } error={errors.Fname} onFocus={()=>{ handleError(null, "Fname")}} placeholder="enter your first name " label="First Name"/>
          <Input onChangeText={text =>  handleOnChange(text, "Lname") } error={errors.Lname} onFocus={()=>{ handleError(null, "Lname")}}   placeholder="enter your Last name " label="Last Name"/>
          <Input onChangeText={text =>  handleOnChange(text, "email") } error={errors.email} onFocus={()=>{ handleError(null, "email")}} placeholder="enter your email address " label="email Name"/>
          <Input onChangeText={text =>  handleOnChange(text, "username") } error={errors.username} onFocus={()=>{ handleError(null, "username")}}  placeholder="enter your username " label="username"/>
          <Input onChangeText={text =>  handleOnChange(text, "whatsap_num") } error={errors.whatsap_num} onFocus={()=>{ handleError(null, "whatsap_num")}}  keyboardType="numeric" placeholder="enter your whatsapp number " label="whatsapp"/>
          <Input onChangeText={text =>  handleOnChange(text, "password") }  error={errors.password} onFocus={()=>{ handleError(null, "password")}}  placeholder="enter your password" password label="Password"/>
          <TouchableOpacity onPress={validate} 
          className='bg-accent  p-3 rounded-2xl mb-3 mt-3'   >
              <Text className='text-xl font-bold text-base text-center '> Confirm email</Text>
          </TouchableOpacity>

          <View className='flex-row justify-center p-3 '>      
            <Text>Already had an account?</Text>
            <TouchableOpacity onPress={()=> navigation.navigate("login")} >
           
                <Text className='text-accent font-bold'> Login</Text>
            </TouchableOpacity>
          </View> 
      </ScrollView>
    
 
  
     
    </KeyboardAvoidingView>
    
    
        

        
      
    </View>
  )
} 



