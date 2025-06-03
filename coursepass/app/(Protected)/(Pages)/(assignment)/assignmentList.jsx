import {View, Text, SafeAreaView, ScrollView, Pressable, TouchableOpacity, StatusBar} from 'react-native'

import React, {useState} from 'react'
import GoBackBtn from '../../../../components/goBackButton';
import {useGetAssignmentAllocQuery} from '../../../../redox/slice/apiSlice';
import {useSelector} from 'react-redux';
import {MaterialCommunityIcons, AntDesign} from '@expo/vector-icons/';
import {useColorScheme} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Error from '../../../../components/error';
import LoadingComponent from '../../../../components/HomeComponents/loading';

export default function Assignments() {
  const {user} = useSelector((state) => state.login);
  const {data, isFetching, isSuccess, error, isError, refetch} = useGetAssignmentAllocQuery(user.id)
  const [open, setOpen] = useState(false)
  const [topic, setTopic] = useState("")
  const theme = useColorScheme();
  const navigation = useNavigation()

   if(isFetching){
     return(
     <LoadingComponent component="ASSIGNMENT"/>
     )
   }

  if (!isSuccess) return (
 
    <Error component="ASSIGNMENT"/>
  );
  if (isError) {
    if (error.status === 404)
      return (
        <SafeAreaView
          style={theme === 'dark' ? {backgroundColor: "#252231"} : ""}


        >
          <View className="h-full mt-10">


            <View className="absolute top-10">
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <AntDesign name="left" size={24} color={theme === "dark" ? "white" : "dark"} />
              </TouchableOpacity>
            </View>
            <View className="h-full justify-center items-center" >

              <Text className=" text-center mx-5"
                style={theme === 'dark' ? {color: "#d4d4d4"} : ""}
              >you have not been assigned any assignment check back later</Text>

            </View>
          </View>
        </SafeAreaView>
      )
    else {
      return (<Text>error</Text>)
    }
  }



  const handleAssignmentDetails = (title) => {
    console.log(title);
    setTopic(title)
    setOpen(true)
  }

  return (

    <SafeAreaView
      className="bg-base"
      style={theme === 'dark' ? {backgroundColor: "black"} : ""}
    >
      <StatusBar barStyle={theme === "dark" ? "light-content" : "dark-content"} />
      {open ?
        <View className="h-full items-center justify-center px-6">
          <Text className="text-xl font-semibold mb-8 text-center">{topic}</Text>
          <View className="flex-row w-full justify-around">
            <Pressable
              className="bg-accent rounded px-6 py-3"
              onPress={() => setOpen(false)}
            >
              <Text className="text-white font-semibold">Complete</Text>
            </Pressable>
            <Pressable
              className="bg-red rounded px-6 py-3"
              onPress={() => setOpen(false)}
            >
              <Text className="text-white font-semibold">Not Done</Text>
            </Pressable>
          </View>
        </View>
        :

        <View className="h-full bg-base"
          style={theme === 'dark' ? {backgroundColor: "black"} : ""}

        >
          <View className="absolute top-10">
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign name="left" size={24} color={theme === "dark" ? "white" : "dark"} />
            </TouchableOpacity>
          </View>
          <View className="items-center mt-10">
            <Text className="text-black font-bold text-3xl "
              style={theme === 'dark' ? {color: "#d4d4d4"} : ""}

            > Assignment</Text>
          </View>
          <ScrollView className="mt-4 px-2">
            {Object.entries(data).map(([courseID, assignments]) => (
              <View key={courseID} className="mb-4">
                <View className="bg-white mt-2 rounded-lg px-4 py-3 "
                  style={{
                    shadowColor: '#000',
                    shadowOpacity: 0.1,
                    shadowRadius: 10,
                    shadowOffset: {width: 0, height: 5},
                    elevation: 6,
                    backgroundColor: theme === "dark" ? "#252231" : ""
                  }}
                >
                  <View className="flex-row justify-between mb-3 items-center">
                    <Text className="text-sm text-blue-600 font-semibold">{courseID}</Text>
                    <View className="bg-gray-200 rounded-2xl px-3 py-1"
                      style={theme === 'dark' ? {backgroundColor: "black"} : ""}

                    >
                      <Text className="text-xs text-blue-600"
                        style={theme === 'dark' ? {color: "#d4d4d4"} : ""}

                      >{assignments.length} assignments</Text>
                    </View>
                  </View>

                  <ScrollView
                    horizontal={false}
                    showsHorizontalScrollIndicator={false}
                  >
                    {assignments.map((assignment, id) => (
                      <View
                        key={id}
                        className="flex-row gap-3 mb-3"
                      >
                        <View className="flex-1 border border-gray-300 rounded px-3 py-2">
                          <Pressable onPress={() => handleAssignmentDetails(assignment.title)}>
                            <View className="mb-4">
                              <Text className="text-base text-gray-800"
                                style={theme === 'dark' ? {color: "#d4d4d4"} : ""}
                              >{assignment.title}</Text>
                            </View>
                            <View className="flex-row justify-between">
                              <Text className="text-sm text-gray-600">Due: {assignment.due_date}</Text>
                            </View>
                          </Pressable>
                        </View>
                      </View>
                    ))}
                  </ScrollView>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      }




    </SafeAreaView>
  );

}