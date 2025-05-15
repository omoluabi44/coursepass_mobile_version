import { View, Text, SafeAreaView, TouchableOpacity,ScrollView } from 'react-native'
import React from 'react'
import GoBackBtn from '../../../components/goBackButton';
import { useGetNoteSessionQuery } from '../../../redox/slice/apiSlice';
import { useRoute } from '@react-navigation/native';
import MarkdownMathView from 'react-native-markdown-math-view'
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';


export default function CourseNote () {
  const navigation = useNavigation();
  const route = useRoute();  
  const { outline, selectedValue } = route.params; 
  const {  data: note,  isFetching: isFetchingNote,isSuccess: isSuccessNote,  error: ErrorNote, isError: isErrorNote } = useGetNoteSessionQuery({outline, selectedValue});
    

       
  
  if(isFetchingNote) return <Text>Loading...</Text>
  if(isErrorNote) return <Text>error </Text>

  const handleNavigation = ()=>{
    // navigation.navigate("profile")
    router.push("/courseDetails")
  }
  return (
    <SafeAreaView>

   
    <View className="h-full">
    <View className='flex-row  items-center h-10'>
      <View className="ml-5">
      {/* <GoBackBtn/> */}
      <View>
        <TouchableOpacity onPress={handleNavigation}>
          <Text> go back</Text>
        </TouchableOpacity>
      </View>
      </View>
           
           <View style={{ marginLeft: 100 }}>
           <Text> INTRO TO PHYSICS  </Text>
           </View>
     
      </View>
      <ScrollView>
      <View className="mx-5">
        <MarkdownMathView>
        {note.content}
        </MarkdownMathView>

      </View>
      </ScrollView>
      
      {/* <View className="absolute  bottom-0 flex-row justify-between w-full h-20 items-center ">
          <TouchableOpacity className="ml-5 bg-secondary border border-accent h-10 w-40 rounded-lg justify-center items-center">
            <Text className="text-accent">Next</Text>
          </TouchableOpacity>
          <TouchableOpacity className="mr-5 bg-secondary border border-accent h-10 w-40 rounded-lg justify-center items-center">
            <Text className="text-accent" >Prev</Text>
          </TouchableOpacity>
      </View>
      */}
    
    </View>
    </SafeAreaView>
  )
}