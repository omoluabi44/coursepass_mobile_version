import {View, Text, SafeAreaView, ImageBackground, Image, ScrollView, TouchableOpacity} from 'react-native'
import React from 'react'
import * as Progress from 'react-native-progress';
import AntDesign from '@expo/vector-icons/AntDesign';

import {useNavigation} from '@react-navigation/native';
import {router} from 'expo-router';
import GoBackBtn from '../../../components/goBackButton';
import {useGetScoreAVGQuery} from '../../../redox/slice/apiSlice';
import {useSelector} from 'react-redux';
import {useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';
import { useColorScheme } from 'react-native';
import Error from '../../../components/error';
import LoadingComponent from '../../../components/HomeComponents/loading';




export default function StudentPerfomance() {
  const [progress, setProgress] = React.useState(0.3166);
  const {user} = useSelector((state) => state.login);

  const [avg, setAvg] = React.useState(0);
  const userID = user.id
  const {data, error, isLoading, isError, isSuccess, refetch} = useGetScoreAVGQuery(userID,{ refetchOnMountOrArgChange: true,});
  console.log(userID);
  const navigation = useNavigation()
   const theme = useColorScheme();

 
if(isLoading){
  return(
  <LoadingComponent component="RESULT ANALYSIS"/>
  )
}
  if (!isSuccess) return (

    <Error component="RESULT ANALYSIS"/>
  );

 

  if (  data.length === 0) {

    
  return (
  <>
      <SafeAreaView className="bg-base"
            style={ theme === 'dark' ? { backgroundColor: "#252231" } : "" }
            >
             <View className="absolute top-10">
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                      <AntDesign name="left" size={24} color={theme === "dark" ? "white" : "dark"} />
                    </TouchableOpacity>
                  </View>
                  <View className="items-center mt-10">
                    <Text className="text-black font-bold text-3xl "
                      style={theme === 'dark' ? {color: "#d4d4d4"} : ""}
        
                    > RESULT ANALYSIS</Text>
                  </View>
            <View className="h-full justify-center items-center">
              <Text className="font-bold text-3xl text-black"
               style={ theme === 'dark' ? { color: "#d4d4d4" } : "" }
              >No score found </Text>
              <Text 
               style={ theme === 'dark' ? { color: "#d4d4d4" } :  { color: "gray" } }
              >you havent taken any quiz</Text>
            </View>
            </SafeAreaView>
          
  </>
 
)
}
  const avg_score = data[data.length - 1]["avg_score"]





  const handleNav = (courseID) => {
    navigation.navigate('studentCourseAnal',{courseID})
  }
  return (
    <SafeAreaView className="bg-gray-200"
    style={ theme === 'dark' ? { backgroundColor: "black" } : "" }

    >
      <TouchableOpacity onPress={() => router.push("./")} >
        <Text>
          <AntDesign name="left" size={24} color={ theme ==="dark"? "white":"black"} />
        </Text>
      </TouchableOpacity>
      <View className="h-full">
        <View
          style={{height: 300}}
          className="bg-accent mx-2 mt-2 rounded-lg shadow-md p-4"
        >

          <Text className="text-white font-bold text-2xl mb-4 text-center"
           style={ theme === 'dark' ? { color: "#d4d4d4" } : "" }
          >
            YOUR OVERALL SCORE
          </Text>


          <View className="flex-1 items-center justify-center">
            <Progress.Circle
              progress={avg_score/ 10}
              size={150}
              thickness={10}
              showsText={true}
               color={ theme ==="dark"? "#d4d4d4":"white"}
              textStyle={{
                fontSize: 30,
                fontWeight: 'bold',
              }}
              formatText={() => avg_score.toFixed(1)}
            />
          </View>

        </View>
        <View>
          <Text className="text-black text-center text-xl  font-bold mt-4 mx-5 "
           style={ theme === 'dark' ? { color: "#d4d4d4" } : "" }>
            COURSES AND AVARAGE SCORES
          </Text>
        </View>
        <ScrollView className=" ">
          {data?.slice(0, -1).map((item, id) => {
            return (
              <View key={id} className="flex-row items-center justify-between px-4 py-2 mx-2   mt-2 rounded-lg bg-white"
              style={ theme === 'dark' ? { backgroundColor: "#1f2937" } : { backgroundColor: "white" }}
              >
                <View className="w-20 h-20">
                  <Image
                    source={require('../../../assets/images/gami.webp')}
                    className="w-full h-full rounded-lg"
                    resizeMode="cover"
                  />
                </View>

                <View className="flex-1 ml-4">
                  <Text className="text-2xl font-semibold"
                   style={ theme === 'dark' ? { color: "#d4d4d4" } : "" }

                  >{item[0]}</Text>
                  <Text className="text-gray-500 text-lg">{item[1][0]}%</Text>
                </View>

                <View className="pl-2 ">
                  <TouchableOpacity onPress={()=>handleNav(item[0])}>
                    <AntDesign name="caretright" size={30} color={ theme ==="dark"? "#d4d4d4":"#007BFF"} />
                  </TouchableOpacity>

                </View>
              </View>

            )
          })}

        </ScrollView>
      </View>


    </SafeAreaView>

  )
}