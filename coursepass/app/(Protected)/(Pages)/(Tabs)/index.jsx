import {View, Text, RefreshControl, ScrollView, SafeAreaView} from 'react-native'
import React, {useCallback, useState} from 'react'
import Header from "../../../../components/HomeComponents/Header"
import Gamification from "../../../../components/HomeComponents/Gamification"
import CourseList from "../../../../components/HomeComponents/CourseList"
import {DrawerToggleButton} from '@react-navigation/drawer';
import {useGetUserEnrollQuery, useGetPointQuery} from '../../../../redox/slice/apiSlice';
import {useSelector} from 'react-redux';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import UniversityReg from '../../../universityReg';
import StudentPerfomance from '../studentPerfomance'
import CourseAnalysis from '../studentCourseAnal'
import LeaderboardScreen from '../leaderBoard'
import {useColorScheme} from 'react-native';






export default function Home() {
  const {user} = useSelector((state) => state.login);
  const {data, isLoading, isError, isSuccess, refetch: refetchPoint} = useGetPointQuery(user.id)
  const theme = useColorScheme();

  const {refetch: refetchcourse} = useGetUserEnrollQuery(user.id)
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetchPoint()
    refetchcourse()
      .finally(() => {
        setRefreshing(false)
      })
  }, [])


  return (
    <SafeAreaView className=" h-full"
      style={theme === 'dark' ? {backgroundColor: "#252231"} : ""}
    >

      <Header />
      {/* <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={['#10B981']} // Android indicator color
                tintColor="#10B981"  // iOS indicator color
                scrollEnabled={false}
              />
            }
      > */}

        <View className=' h-full  '
          style={theme === 'dark' ? {backgroundColor: "#252231"} : ""}
        >

          <Gamification />
          <CourseList />
        </View>
        {/* <LeaderboardScreen/> */}
      {/* </ScrollView> */}


    </SafeAreaView>

  )
}