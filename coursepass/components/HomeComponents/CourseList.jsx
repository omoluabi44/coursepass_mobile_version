import { View, Text, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { useGetUserEnrollQuery } from '../../redox/slice/apiSlice';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

export default function CourseList() {
  const {user} = useSelector((state) => state.login);
  const {data, isFetching, isSuccess, error ,isError} = useGetUserEnrollQuery(user.id)
  const navigation = useNavigation();

  if(isFetching) return <Text>Loading...</Text>

  
  
  const handleOpenCourse = (courseID) => {
    navigation.navigate('courseDetails',{ courseId: courseID });
  };


  return (
    <ScrollView className="px-4 mt-5">
      <View className="flex flex-wrap flex-row justify-between">
        {data.map((course) => (
          <TouchableOpacity key={course.id} onPress={()=>handleOpenCourse(course.courseID)} className="w-[48%] h-[150px] mb-4">
            <ImageBackground
              source={require('../../assets/images/gami.webp')}
              className="w-full h-full rounded-lg overflow-hidden"
              resizeMode="cover"
            >
              <View className="flex-1 p-2 bg-accent/10 rounded-lg">
      
                <View className="absolute bottom-2 left-2 right-2 bg-secondary h-8 mt-5 rounded-lg border-accent border-[1px]">
                  <View className="flex-row justify-around items-center h-full">
                
                    <Text className="text-accent font-bold">{course.courseID}</Text>
                  </View>
                </View>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
