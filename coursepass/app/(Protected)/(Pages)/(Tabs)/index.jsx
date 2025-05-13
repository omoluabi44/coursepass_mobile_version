import { View, Text, RefreshControl, ScrollView, } from 'react-native'
import React, {useCallback, useState}from 'react'
import Header from "../../../../components/HomeComponents/Header"
import Gamification from "../../../../components/HomeComponents/Gamification"
import CourseList from "../../../../components/HomeComponents/CourseList"
import { SafeAreaView } from 'react-native-safe-area-context'
import {DrawerToggleButton} from '@react-navigation/drawer';
import { useGetUserEnrollQuery } from '../../../../redox/slice/apiSlice';
import { useSelector } from 'react-redux';


export default function Home() {
  const {user} = useSelector((state) => state.login)

    
    const {refetch } = useGetUserEnrollQuery(user.id)
   const [refreshing, setRefreshing] = useState(false)
    
      const onRefresh = useCallback(()=>{
        setRefreshing(true);
     
        
        refetch()
        .finally(()=>{
          setRefreshing(false)
        })
      },[])
  
 
  return (
    <SafeAreaView className='bg-base' >
       <Header/>
      
          <View className=' h-full bg-base'>
           
            <Gamification/>
            <CourseList/>
          </View>
    
    </SafeAreaView>

  )
}