import { View, Text, Image } from 'react-native'
import React from 'react'
import {DrawerToggleButton} from '@react-navigation/drawer';

export default function Header() {
  return (
    <View >
        <View>
            <View className='ml-3 mt-2'>
                <Text> hello Emmanuel 👋 </Text>
            </View>
        </View>
        
        <View className='flex-row justify-between   h-[70px] '>
            <View className='flex-row '> 
                
                <View className=''>
                <DrawerToggleButton/>
                </View>
            
                {/* <View className=' mt-5 h-20 w-40 bg-white'>
                    <Text>your recent course</Text>
                </View> */}
                
            </View  >
            <View className=' items-center mx-2'>
                <View className='pr-3 flex-row'>
                    <View>
                    <Image 
                    className="w-10 h-10 rounded-full "
                    source ={require('../../assets/images/profile.jpg')}/>
                    </View>
                
                

                </View>
                
            
            </View>
        </View>
   
    </View>
  )
}