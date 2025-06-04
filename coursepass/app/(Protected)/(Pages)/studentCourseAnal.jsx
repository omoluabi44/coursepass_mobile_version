import {View, Text, SafeAreaView, ImageBackground, Image, ScrollView, TouchableOpacity, StatusBar} from 'react-native'
import React, {useState} from 'react'
import * as Progress from 'react-native-progress';
import AntDesign from '@expo/vector-icons/AntDesign';
import {LineChart} from 'react-native-chart-kit';
import {Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import GoBackBtn from '../../../components/goBackButton';
import {useLocalSearchParams} from 'expo-router';
import {useSelector} from 'react-redux';
import {useGetCourseScoreAVGQuery} from '../../../redox/slice/apiSlice';
import {router} from 'expo-router';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';
import { useColorScheme } from 'react-native';



export default function StudentPerfomance() {
    const [progress, setProgress] = useState(0.2);
    const screenWidth = Dimensions.get('window').width;
    const navigation = useNavigation()
    const [courseId, setCourseId] = useState(0);
    const {user} = useSelector((state) => state.login);
    // const [attempts, setAttemt] = useState({})
    const {courseID} = useLocalSearchParams();
    const userID = user.id
      const theme = useColorScheme();
    const {data, error, isLoading, isError, isSuccess} = useGetCourseScoreAVGQuery({userID, courseID});
    //    useFocusEffect(
    //     useCallback(() => {
    //         setAttemt(data[courseID])
    //         return () => {
    //             //    setAttemt(data[courseID])
    //         };
    //     }, [data])
    // );
    if (isLoading) return (
        <Text> fetching</Text>
    )
    if (isError) return (
        <Text> error</Text>
    )
 
if (!data || !data[courseID]) {
  return <Text>No data available for this course</Text>;
}

const attempts = data[courseID]




    console.log(attempts);


    return (
        <SafeAreaView className="bg-base"
        style={ theme === 'dark' ? { backgroundColor: "black" } : "" }
        
        >
               <StatusBar barStyle={theme==="dark" ? "light-content":"dark-content"} />

            {/* <GoBackBtn route="studentPerfomance" /> */}
            <TouchableOpacity onPress={() => navigation.navigate("studentPerfomance")} >
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
                        Line chart
                    </Text>
                    <View className="flex-1 items-center justify-center">
                        <LineChart
                            data={{
                                labels: Object.keys(attempts),
                                datasets: [
                                    {
                                        data: Object.values(attempts).map(attempt => attempt.score) // [5, 0, 4]
                                    }
                                ]
                              
                            }}
                            width={screenWidth - 32}
                            height={220}
                            chartConfig={{
                                backgroundColor: "#007BFF",
                                backgroundGradientFrom: "#007BFF",
                                backgroundGradientTo: "#007BFF",
                                decimalPlaces: 0,
                                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            }}
                            style={{borderRadius: 16}}
                        />
                    </View>

                </View>
                <View>
                    <Text className="text-black text-center text-xl  font-bold mt-4 mx-5 "
                     style={ theme === 'dark' ? { color: "#d4d4d4" } : "" }
                    >
                        QUIZ ATTEMPTS AND SCORES
                    </Text>
                </View>
                <ScrollView className=" ">
                    {Object.keys(data).map((course) => {
                        const courseData = data[course];


                        return Object.entries(courseData).map(([key, value]) => {
                            
                            return (
                                <View key={key} className="flex-row items-center justify-between  py-2 mx-2 border border-black mt-5 rounded-lg bg-white"
                                style={ theme === 'dark' ? { backgroundColor: "#d4d4d4" } : "" }>


                                    <View className="flex-row gap-5 ml-2">
                                        <Text className="text-gray-500 font-semibold"> {value.date}</Text>
                                        <Text className="text-gray-500 ">score : {value.score}%</Text>
                                    </View>


                                </View>


                            )

                        })



                    })}

                </ScrollView>
            </View>





        </SafeAreaView>

    )
}