import {View, Text, TextInput, SafeAreaView, TouchableOpacity, Keyboard, TouchableWithoutFeedback} from 'react-native'
import React, {useState} from 'react'
import axios from 'axios'
import {router} from 'expo-router';
import {useLocalSearchParams} from 'expo-router';
import PopUp from '../components/toast';
export default function ForgetPassword() {
    const [code, setCode] = useState("")
    const [password, setPassword] = useState("")
    const {email} = useLocalSearchParams()
    console.log(code, password, email);

    const handleChangePassword = async () => {
        try {
            const response = await axios.post('http://172.20.10.5:5000/api/v1/auth/reset_password', {email, code, password})

            console.log(response.data);
        
            PopUp({type: "success", title: "Successful", message: "success"});
            router.push("/login")


        } catch (error) {
            console.log(error);
            PopUp({type: "error", title: "Error", message: `${error.response.data.error}`});

        }


    }

    return (
        <SafeAreaView>

            <View className="items-center mt-20">
                <Text className="text-2xl font-bold"> CHANGE PASSWORD</Text>
            </View>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View className="h-full mt-20 items-center mx-3 ">

                    <TextInput
                        className=' bg-black/5 p-5 mb-4 rounded-2xl mx-10 w-full rounded-2xl '
                        value={code}
                        onChangeText={setCode}
                        placeholder="verifyication code" placeholderTextColor={'gray'}
                    />
                    <TextInput
                        className=' bg-black/5 p-5 mb-4 rounded-2xl mx-10 w-full rounded-2xl '
                        value={password}
                        onChangeText={setPassword}

                        placeholder="New password" placeholderTextColor={'gray'}
                    />
                    <TouchableOpacity onPress={handleChangePassword} className='bg-accent  p-3 rounded-2xl mb-3'>
                        <Text className='text-xl font-bold text-base text-center '> Change Password</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.push("/login")} className='bg-accent  p-3 rounded-2xl mb-3'>
                        <Text className='text-xl font-bold text-base text-center '> Testing </Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}