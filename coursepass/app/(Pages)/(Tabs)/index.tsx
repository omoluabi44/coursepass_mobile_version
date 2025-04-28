import { View, Text } from 'react-native'
import React from 'react'
import Header from "../../../components/HomeComponents/Header"
import Gamification from "../../../components/HomeComponents/Gamification"
import CourseList from "../../../components/HomeComponents/CourseList"
import { SafeAreaView } from 'react-native-safe-area-context'
import {DrawerToggleButton} from '@react-navigation/drawer';


export default function Home() {
  return (
    <SafeAreaView className='bg-base' >


    <View className=' h-full bg-base'>
     <Header/>
     <Gamification/>
     <CourseList/>
  <View>

  </View>
    </View>
    </SafeAreaView>

  )
}