import { View, Text,ScrollView, TouchableOpacity } from 'react-native'
import React ,{useState} from 'react'
import { Link, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import tailwindConfig from "../../tailwind.config";
import Animated from 'react-native-reanimated';
import {Feather, MaterialIcons } from '@expo/vector-icons/';
import { useFonts } from "../../hooks/useFonts"


export default function CourseDetails() {
  // const fontsLoaded = useFonts()
  const [expandedIndex, setExpandedIndex] = useState(null);


  const customColors = tailwindConfig.theme.extend.colors;
  const handleNote = () => {router.push('./note')};
  const handleAssignment = () => {router.push('./assignmentDetails')};
  const handleMaterials = () => {router.push('./materialsDetails')};
  const handleFlashcard = () => {router.push('./flashCardDetails')};
 
  // const handlesShowDetails = () => {
  //   setShowDetails(!showDetails);
  // }
  const courseOutline =[
  {week: 1, title: "intro  to physcs"},
  {week: 2, title: "heat transfer"},
  {week: 3, title: "temperature "},
  {week: 4, title: "thermodynamics"},
  {week: 5, title: "fluid mechanics"},
  {week: 6, title: "waves"},
  {week: 7, title: "light"},
  {week: 8, title: "electricity"},
  {week: 9, title: "magnetism"},
  {week: 10, title: "modern physics"},
  {week: 11, title: "quantum mechanics"},
  {week: 12, title: "nuclear physics"},
  {week: 13, title: "relativity"},
  {week: 14, title: "astrophysics"},

   ]

  
  return (
    <SafeAreaView >

    
    <View className=" h-full ">
     

     
      <View className='justify-center items-center h-10'>
      <Text className='text-2xl text-accent font-bold' >Course Title : PHY101</Text>
      </View>
      <ScrollView>
        {courseOutline.map((course) => {
          const isExpanded = expandedIndex === course.week;
          return (

           <View key={course.week} className='mx-5 mt-2 bg-base rounded-lg '> 
           <View className="bg-base h-[50px] rounded-lg flex-row  justify-between items-center px-5">
             <Text className="text-xl text-accent font-bold"> {course.title} </Text>
             <EvilIcons  onPress={() =>
                      setExpandedIndex(isExpanded ? null : course.week)
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