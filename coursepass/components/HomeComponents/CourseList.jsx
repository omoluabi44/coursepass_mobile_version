import { View, Text, ImageBackground, TouchableOpacity, ScrollView ,RefreshControl} from 'react-native';
import { useDeEnrollUserMutation  } from '../../redox/slice/apiSlice';
import React, { useEffect}from 'react'
import { useGetUserEnrollQuery } from '../../redox/slice/apiSlice';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {FontAwesome} from '@expo/vector-icons/';
import PopUp from "../toast"
import { router } from 'expo-router';


export default function CourseList() {
  const {user} = useSelector((state) => state.login);
  const {data, isFetching, isSuccess, error ,isError,refetch } = useGetUserEnrollQuery(user.id)
   const [deEnrollUser, { isLoading: isDeEnrolling, isSuccess: deEnrollSuccess, isError: enrollError, error: enrollErrorData }] = useDeEnrollUserMutation();
  const navigation = useNavigation();


      

  useEffect(() => {
    if (deEnrollSuccess) {
      PopUp({ type: "success", title: "Successful", message: "De-enrollment successful!" });
      
    }
   
  }, [deEnrollSuccess]);
    if(isFetching)return (<Text>loading</Text>)
    if(isError)return (<Text>error</Text>)

 const handleNav = () => {
 navigation.navigate('addNewCourse');

};

  if(data.length === 0){
    return(
      <View className="flex-1  ">
        <View className="mt-10 items-center" >
          <Text>
            Your dashboard is empty, add new course!!!
          </Text>
        </View >
         <View className=" flex-1 justify-center items-center"  style={{marginBottom: 250}}>
          <TouchableOpacity onPress={handleNav}>
          <FontAwesome name="plus" size={40} color="blue" />
          </TouchableOpacity>
       
      <Text > Add new course</Text>
     </View>
        
      </View>
     
    )
 
   
  }
  
  
  
  const handleOpenCourse = (courseID) => {
    navigation.navigate('courseDetails',{ courseId: courseID });
  };

  const handleDel = async (enrollID) => { 
    
    
    try {
      await deEnrollUser({enrollID}).unwrap();
      refetch()
      console.log('De-enrollment successful');
    } catch (err) {
     
    } 
  };
  return (
    <View
    style={{height:400}}
    >

   
    <ScrollView className="px-4 mt-5 " 
    
     > 

      <View className="flex flex-wrap flex-row justify-between "
      
      >
        
    
        {data.map((course) => (
          <TouchableOpacity key={course.id} onPress={()=>handleOpenCourse(course.courseID)} className="w-[48%] h-[150px] mb-4">
            <ImageBackground
              source={require('../../assets/images/gami.webp')}
              className="w-full h-full rounded-lg overflow-hidden"
              resizeMode="cover"
            >
              <View className="flex-1 p-2 bg-accent/10 rounded-lg shadow-md ">
              <TouchableOpacity  onPress={()=>handleDel(course.id)}
              >
              <FontAwesome name="close" size={24} color="red" />
              </TouchableOpacity>
              
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
    </View>
  );
}
