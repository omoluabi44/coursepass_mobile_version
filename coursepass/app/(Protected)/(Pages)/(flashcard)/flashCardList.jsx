import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import GoBackBtn from '../../../../components/goBackButton';
import {MaterialCommunityIcons} from '@expo/vector-icons/';
import { ScrollView } from 'react-native-gesture-handler';
import { useGetFlashcardQuery } from '../../../../redox/slice/apiSlice';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
// import GoBackBtn from '../../../../components/goBackButton';


export default function FlashCardList() {
  const navigation = useNavigation()
  const {user} = useSelector((state) => state.login);
  const {data, isFetching, isSuccess, error ,isError,refetch }  = useGetFlashcardQuery(user.id)
  if (isFetching)return(<Text>loading..</Text>)
  if (isError) return(<Text>error</Text>)

  

  const handleFlashcardId =(id, course, topic)=>{
    console.log(id,course,topic);
 
     router.push({
    pathname: `/${id}`,
    params: { course, topic }
  });
    // router.push({ pathname: '/flashCardDetails', query: { id: 'abc123' } });

    

  }
  return (
    <SafeAreaView>
     
        <View className="h-full bg-secondary2 ">
              <View className="mx-3">
                <GoBackBtn/>
              </View>
            <View className="mx-5 mt-5 ">
                <Text className="text-2xl font-bold">FLASHCARDS </Text>
            </View>
            {data.map((coursename,id)=>{return(
               <View key={id} className="mx-5 my-2 bg-base px-3 py-3 rounded-lg  ">
                <View  className="mb-3"> 
                  <Text className="text-accent">
                    {coursename.courseID}
                  </Text>
                </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} className="">
                {coursename.outlines.map((outline,id)=>{return(
                      <View  key={id} className="flex-row mx-1">
                        <TouchableOpacity onPress={()=>handleFlashcardId(outline.outlineID, coursename.courseID,outline.topic)}>
                          <View className="flex-row items-center gap-2 border-[0.3px] w-60 justify-center rounded">
                          <MaterialCommunityIcons name="cards" size={40} color="#7d7c7c" />
                              <View className="gap-3">
                                    <Text className="text-xs">
                                  {outline.topic}
                                    </Text>
                                    <Text>{outline.total_outline}</Text>
                              </View>
                          
                          </View>
                           </TouchableOpacity>
                        
                  </View>
                )})}
                  
              </ScrollView>
            </View>

            )})}
           
         
           
            
        </View>
    </SafeAreaView>
      
    );
  
}