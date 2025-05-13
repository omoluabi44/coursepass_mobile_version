import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import {Feather} from '@expo/vector-icons/';

export default function Input({
    label, 
    iconName, 
    error,
     password,   
     onFocus =()=>{}, 
     ...props
}) {
    const [isFocused, setIsFocused]=useState(false)
    const[hidepassword, setIsHidepassword]= useState(password)
   
    
  return (
   
    <View className="my-1.5">
      
         <View style={{ borderWidth: 1, borderColor: error? "red": isFocused? "blue":"white", }}  
         className=' flex-row justify-between  bg-black/5 pl-2 py-5 mb-1 rounded-2xl w-full rounded-2xl'>

        <TextInput 
                secureTextEntry={hidepassword}
                autoCorrect={false}
                onFocus={()=>onFocus(
                    setIsFocused(true)
                )}
                onBlur={()=> setIsFocused(false)}
                className='flex-1'
                placeholderTextColor={'gray'}
                {...props} 
                
        />
      
      {password && <View className="pr-2">
        <Feather name={hidepassword?"eye":"eye-off" } size={24} color="black" onPress={()=> setIsHidepassword(!hidepassword)} />
        </View>
       } 
        
       
        </View>
       
       
      
        {error && <Text className="text-red mb-4 "  >{error}</Text>}
       
    </View>
  ) 
}