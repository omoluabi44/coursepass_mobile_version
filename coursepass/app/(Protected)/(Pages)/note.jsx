import { View, Text, SafeAreaView, TouchableOpacity,ScrollView } from 'react-native'
import React from 'react'
import GoBackBtn from '../../../components/goBackButton';


export default function CourseNote () {
  return (
    <SafeAreaView>

   
    <View className="h-full">
    <View className='flex-row  items-center h-10'>
      <View className="ml-5">
      <GoBackBtn/>
      </View>
           
           <View style={{ marginLeft: 100 }}>
           <Text> INTRO TO PHYSICS  </Text>
           </View>
     
      </View>
      <ScrollView>
      <View className="mx-5">
        <Text> Physics is the fundamental science that      seeks to understand the universe and everything in it. It explores the basic laws governing matter, energy, space, and time, and how they interact. From the smallest subatomic particles to the largest galaxies, physics provides the framework for explaining natural phenomena. This lesson will introduce you to the core concepts of physics, focusing on its role in describing motion and energy, which are the foundations for much of what we'll explore in this course</Text>
      </View>
      </ScrollView>
      
      <View className="absolute  bottom-0 flex-row justify-between w-full h-20 items-center ">
          <TouchableOpacity className="ml-5 bg-secondary border border-accent h-10 w-40 rounded-lg justify-center items-center">
            <Text className="text-accent">Next</Text>
          </TouchableOpacity>
          <TouchableOpacity className="mr-5 bg-secondary border border-accent h-10 w-40 rounded-lg justify-center items-center">
            <Text className="text-accent" >Prev</Text>
          </TouchableOpacity>
      </View>
     
    
    </View>
    </SafeAreaView>
  )
}