import {View, Text, ScrollView, TouchableOpacity, SafeAreaView} from 'react-native'
import React, {useEffect, useState} from 'react'
import {Link, router} from 'expo-router';

import EvilIcons from '@expo/vector-icons/EvilIcons';
import tailwindConfig from "../../../tailwind.config";
import Animated from 'react-native-reanimated';
import {Feather, MaterialIcons, AntDesign} from '@expo/vector-icons/';
import GoBackBtn from '../../../components/goBackButton';
import {useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {useGetCourseQuery, useGetNoteQuery} from '../../../redox/slice/apiSlice';
import {useNavigation} from '@react-navigation/native';
import Session from '../../../components/sessionConfiguration';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';
import {useColorScheme} from 'react-native';
import Load from '../../../components/loader';



export default function CourseDetails() {
  const route = useRoute();
  const {courseId} = route.params;
  const [outline, setOutlineId] = useState("")
  const [courseID, setCourseid] = useState("")
  const [topic, setTopic] = useState("")
  const customColors = tailwindConfig.theme.extend.colors;
  const {data: courseData, isFetching: isCourseFetching, isSuccess: isCourseSuccess, error: courseError, isError: isCourseError, refetch} = useGetCourseQuery(courseId);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const navigation = useNavigation();
  const [isOpen, setIsOpen] = useState(false)
  const theme = useColorScheme();

  useFocusEffect(
    useCallback(() => {
      setExpandedIndex(null);
      return () => {
        setExpandedIndex(null);
      };
    }, [])
  );



  if (isCourseFetching) return <Load visible={isCourseFetching} data="loading courses..." />


  const handleNote = (outlineId) => {
    setOutlineId(outlineId.id)
    setTopic(outlineId.topic)
    setCourseid(courseId)

    setIsOpen(true)
  };


  const handleAssignment = () => {router.push('./assignmentDetails')};
  const handleMaterials = () => {router.push('./materialsDetails')};
  const handleFlashcard = () => {router.push('./flashCardDetails')};

  console.log(outline,courseID);
  




  return (
    <SafeAreaView
      style={theme === 'dark' ? {backgroundColor: "black"} : ""}
    >
      <View className=" h-full ">
        <Session isOpen={isOpen} setIsOpen={setIsOpen} outline={outline} courseId={courseID} topic={topic} />
        <View className=' flex-row items-center ml-10 h-10'>
          <TouchableOpacity onPress={() => router.push("./")}>
            <AntDesign name="left" size={24} color={theme === "dark" ? "white" : "dark"} />
          </TouchableOpacity>
          <View className=" ml-10  ">
            <Text className='text-2xl text-accent font-bold'
              style={theme === 'dark' ? {color: "#d4d4d4"} : ""}
            >Course Title : {courseId}</Text>
          </View>
        </View>
        <ScrollView>
          {courseData.map((course, id) => {
            const isExpanded = expandedIndex === course.orderID;
            return (

              <View key={id} className='mx-5 mt-2 bg-base rounded-lg '
                style={theme === 'dark' ? {backgroundColor: "#252231"} : ""}

              >
                <View className="bg-base h-[50px] rounded-lg flex-row  justify-between items-center px-5"
                  style={theme === 'dark' ? {backgroundColor: "#252231"} : ""}
                >
                  <Text key={id} className="text-xl text-accent font-bold"
                    style={theme === 'dark' ? {color: "#d4d4d4"} : ""}
                  > {course.topic} </Text>
                  <AntDesign onPress={() =>
                    setExpandedIndex(isExpanded ? null : course.orderID)
                  } name={isExpanded ? "arrowup" : "arrowdown"} size={30} color={theme === "dark" ? "white" : "dark"} />
                </View>
                <Animated.View className={`ml-[140] mr-2 mt-5 ${isExpanded ? "" : "hidden"}`}

                >
                  <TouchableOpacity
                    onPress={() => handleNote(course)}
                    className="bg-base h-10  border border-accent rounded-lg justify-left pl-10 w-50 items-center mb-3  flex-row"
                    style={theme === 'dark' ? {backgroundColor: "#252231", borderColor: "#d4d4d4"} : ""}
                  >
                    <Feather name="book" size={24}  color={ theme ==="dark"? "white":"dark"} />
                    <Text className="  text-black text-xl "

                      style={theme === 'dark' ? {color: "#d4d4d4"} : ""}

                    > Notes </Text>

                  </TouchableOpacity>





                </Animated.View>
              </View>

            )
          })}



        </ScrollView>
      </View>

    </SafeAreaView>
  )
}