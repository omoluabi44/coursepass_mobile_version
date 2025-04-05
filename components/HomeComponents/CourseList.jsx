import { View, Text, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { router } from 'expo-router';

export default function CourseList() {
  const handleOpenCourse = () => {
    router.push('./courseDetails');
  };

  const courseDetails = [
    { id: 1, courseId: 'PHY101', level: "100lv" },
    { id: 2, courseId: 'PHY102', level: "200lv" },
    { id: 3, courseId: 'PHY103', level: "100lv" },
    { id: 4, courseId: 'PHY104', level: "100lv" },
    { id: 5, courseId: 'PHY105', level: "100lv" },
    { id: 6, courseId: 'PHY106', level: "100lv" },
    { id: 7, courseId: 'PHY107', level: "100lv" },
    { id: 8, courseId: 'PHY108', level: "100lv" },
    { id: 9, courseId: 'PHY109', level: "100lv" },
    { id: 10, courseId: 'PHY110', level: "100lv" },
    { id: 11, courseId: 'PHY111', level: "200lv" }
  ];

  return (
    <ScrollView className="px-4 mt-5">
      <View className="flex flex-wrap flex-row justify-between">
        {courseDetails.map((course) => (
          <TouchableOpacity key={course.id} onPress={handleOpenCourse} className="w-[48%] h-[150px] mb-4">
            <ImageBackground
              source={require('../../assets/images/gami.webp')}
              className="w-full h-full rounded-lg overflow-hidden"
              resizeMode="cover"
            >
              <View className="flex-1 p-2 bg-accent/10 rounded-lg">
      
                <View className="absolute bottom-2 left-2 right-2 bg-secondary h-8 mt-5 rounded-lg border-accent border-[1px]">
                  <View className="flex-row justify-around items-center h-full">
                    <Text className="text-accent font-bold">{course.level}</Text>
                    <Text className="text-accent font-bold">{course.courseId}</Text>
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
