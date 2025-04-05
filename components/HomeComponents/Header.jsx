import { View, Text, Image } from 'react-native'
import React from 'react'

export default function Header() {
  return (
    <View className='flex-row justify-between p-5 h-[70px]  '>
        <View > 
            <View>
                <Text>LASUSTECH</Text>
            </View>
            <View>
                <Text>good mornig emmanuel </Text>
            </View>
            {/* <View className=' mt-5 h-20 w-40 bg-white'>
                <Text>your recent course</Text>
            </View> */}
            
        </View  >
        <View>
            <View className='pr-3'>
                <View>
                <Image 
                className="w-10 h-10 rounded-full "
                source ={require('../../assets/images/profile.jpg')}/>
                </View>
               
              

            </View>
         
        </View>
   
    </View>
  )
}