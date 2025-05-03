import { View, Text,ScrollView, TouchableOpacity } from 'react-native'
import React ,{useState} from 'react'
import { Link, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import tailwindConfig from "../../../tailwind.config";
import Animated from 'react-native-reanimated';
import {Feather, MaterialIcons } from '@expo/vector-icons/';
import GoBackBtn from '../../../components/goBackButton';
import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useGetCourseQuery } from '../../../redox/slice/apiSlice';
import { useNavigation } from '@react-navigation/native';


export default function CourseDetails() {
  const route = useRoute();  
  const { courseId } = route.params; 
  const {data, isFetching, isSuccess, error ,isError} = useGetCourseQuery(courseId)
  const [expandedIndex, setExpandedIndex] = useState(null);
  const navigation = useNavigation();

  if(isFetching) return <Text>Loading...</Text>

  console.log(data);
  




  const customColors = tailwindConfig.theme.extend.colors;
  
  const handleNote = (outlineID) => {
    // router.push('./note')
  navigation.navigate('note', { outlineId: outlineID });


  
  };
  const handleAssignment = () => {router.push('./assignmentDetails')};
  const handleMaterials = () => {router.push('./materialsDetails')};
  const handleFlashcard = () => {router.push('./flashCardDetails')};
 


  
  return (
    <SafeAreaView >

    
    <View className=" h-full ">
     

     
      <View className=' flex-row items-center ml-10 h-10'>
        <GoBackBtn/>
        <View className=" ml-10  ">
        <Text className='text-2xl text-accent font-bold' >Course Title : {courseId}</Text>
        </View>
          
      </View>
      <ScrollView>
        {data.map((course) => {
          const isExpanded = expandedIndex === course.orderID;
          return (

           <View key={course.week} className='mx-5 mt-2 bg-base rounded-lg '> 
           <View className="bg-base h-[50px] rounded-lg flex-row  justify-between items-center px-5">
             <Text key={course.id} className="text-xl text-accent font-bold"> {course.topic} </Text>
             <EvilIcons  onPress={() =>
                      setExpandedIndex(isExpanded ? null : course.orderID)
                    } name={isExpanded ? "arrow-up":"arrow-down"} size={30} color={customColors.accent} />
           </View>
           <Animated.View className={`ml-[140] mr-2 mt-5 ${isExpanded ? "":"hidden"}`}>
                 <TouchableOpacity
                  onPress={handleNote}
                  className="bg-secondary h-10  border border-accent rounded-lg justify-left pl-10 w-50 items-center mb-3  flex-row">
                           <Feather  name="book" size={24} color={customColors.accent} />
                           <Text className="  text-accent text-xl "> Notes </Text>
                          
                 </TouchableOpacity>
 
                 <TouchableOpacity 
                  onPress={handleAssignment}
                 className="bg-secondary h-10 border border-accent  rounded-lg justify-left pl-10 w-50 items-center mb-3  flex-row">
                  <MaterialIcons name="assignment" size={24} color={customColors.accent}/>
                            <Text className="text-accent text-xl "> <Link href="/assignmentDetails" > Assignment</Link> </Text>
                 </TouchableOpacity>
 
                 <TouchableOpacity
                  onPress={handleMaterials}
                 className="bg-secondary h-10 border border-accent  rounded-lg justify-left pl-10 w-50 items-center mb-3 flex-row">
                              <MaterialIcons name="my-library-books" size={24} color={customColors.accent} />
                             <Text className="text-accent text-xl "> <Link href="/materialsDetails"> Materials</Link> </Text>
                 </TouchableOpacity>
 
                 <TouchableOpacity 
                  onPress={handleFlashcard}
                 className="bg-secondary h-10 border border-accent  rounded-lg justify-left pl-10 w-50 items-center mb-3 flex-row">
                  <Feather name="layers" size={24} color={customColors.accent} />
                             <Text className="text-accent text-xl "> <Link href="/flashCardDetails"> Flashcard</Link> </Text>
                 </TouchableOpacity>
         
           </Animated.View>
         </View>

)})}
       
        
      
     </ScrollView>
    </View>
   
    </SafeAreaView>
  )
}