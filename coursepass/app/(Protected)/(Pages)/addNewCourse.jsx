import {View, Text, SafeAreaView, TextInput, ActivityIndicator, FlatList, TouchableOpacity, StatusBar} from 'react-native'
import React, {useEffect, useRef, useState} from 'react'
import Title from '../../../components/titles';
import axios from 'axios';
import Load from '../../../components/loader';
import {useGetAllCourseQuery, useEnrollUserMutation, useGetUserEnrollQuery} from '../../../redox/slice/apiSlice';
import {useSelector} from 'react-redux';
import filter from "lodash.filter";
import PopUp from "../../../components/toast"
import GoBackBtn from '../../../components/goBackButton';
import {useNavigation} from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import {router} from 'expo-router';
import {useColorScheme} from 'react-native';







export default function Search() {
  const {user} = useSelector((state) => state.login);
  const {data, isFetching, isSuccess, isError, error} = useGetAllCourseQuery()
  const {refetch} = useGetUserEnrollQuery(user.id)
  const [enrollUser, {isLoading: isEnrolling, isSuccess: enrollSuccess, isError: enrollError, error: enrollErrorData}] = useEnrollUserMutation();
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [FilterData, setFilterData] = useState([])
  const [fulldata, setFullData] = useState([])
  const [id, setId] = useState("")
  const userID = user.id
  const navigation = useNavigation()
  const theme = useColorScheme();


  useEffect(() => {
    if (isSuccess && data) {
      setFullData(data)
      setFilterData(data)
    }
  }, [isSuccess, data])

  useEffect(() => {
    if (enrollSuccess) {
      PopUp({type: "success", title: "Successful", message: "Enrollment successful!"});

    }
    if (enrollError) {
      ///extract the response header and message
      const html = enrollErrorData?.data;
      const match = html.match(/<h1>(.*?)<\/h1>\s*<p>(.*?)<\/p>/);

      if (match) {
        const heading = match[1];
        const message = match[2];
        PopUp({type: "error", title: "Enrollment failed", message: `${heading} ${message}`});

      } else {
        PopUp({type: "error", title: "Enrollment failed", message: 'Unknown error'});
      }





    }
  }, [enrollSuccess, enrollError, enrollErrorData]);


  // if (isFetching) return <Load visible={isFetching} data="loading courses..." />
  if (isError) {
    console.log(error);
    return (


      <View className="h-full" style={theme === 'dark' ? {backgroundColor: "#252231"} : ""} >
        <TouchableOpacity className="absolute top mt-20  ml-2" onPress={() => router.push("./")}>
          <AntDesign name="left" size={24} color={theme === "dark" ? "white" : "dark"} />
        </TouchableOpacity>
        <View className="items-center justify-center mt-20">
          <Text
            style={theme === 'dark' ? {color: "#d4d4d4"} : ""}
          >Please check your network</Text>
        </View>


      </View>
    )

  }

  const handleSearch = (query) => {
    setSearchQuery(query)
    const formattedQuery = query.toLowerCase()
    if (!query) {
      setFilterData(fulldata);
      return
    }
    const filteredData = filter(fulldata, (item) => {
      return contains(item, formattedQuery);
    })
    setFilterData(filteredData)

  }
  const contains = ({courseID, courseName}, query) => {
    return (
      (courseID && courseID.toLowerCase().includes(query)) ||
      (courseName && courseName.toLowerCase().includes(query))
    )
  }

  const handleId = async (courseID) => {
    console.log(loading);
    try {
      await enrollUser({userID, courseID}).unwrap();

      refetch()
      console.log('Enrollment successful');
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log("executed");
      console.log(loading);


    }
  };




  return (

    <SafeAreaView className="flex-1  "
      style={theme === 'dark' ? {backgroundColor: "black"} : ""}
    >
      <View className="flex-row mt-5 ">
        <View className="mt-2">
          <TouchableOpacity onPress={() => router.push("./")}>
            <AntDesign name="left" size={24} color={theme === "dark" ? "white" : "dark"} />
          </TouchableOpacity>
        </View>

        <TextInput
          className="mx-5 h-10 rounded-2xl pl-5 mb-5 w-80 bg-white text-black"

          style={theme === 'dark' ? {backgroundColor: "black"} : ""}

          // style={{borderColor: "grey", borderWidth: 1}}
          placeholder="Search course"
          placeholderTextColor="#888"
          clearButtonMode="always"
          autoCapitalize="none"
          autoCorrect={false}
          value={searchQuery}
          onChangeText={(query) => handleSearch(query)}
        />

      </View>

      <FlatList
        data={FilterData}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <View className="mb-3 bg-white rounded w-100 mx-2 p-3 flex-row justify-between "
            style={theme === 'dark' ? {backgroundColor: "#252231"} : ""}
          >
            <View>
              <Text style={theme === 'dark' ? {color: "#d4d4d4"} : ""} >{item.courseID}</Text>
              <Text className="lowercase text-[grey]"
                style={theme === 'dark' ? {color: "#d4d4d4"} : ""}
              >{item.courseName}</Text>
            </View>
            <View>
              <TouchableOpacity onPress={() => {handleId(item.courseID), setLoading(true)}}>

         

                <AntDesign name="plus" size={30} style={theme === 'dark' ? {color: "#d4d4d4"} : ""}
                />
              </TouchableOpacity>

            </View>
          </View>

        )}

      />


    </SafeAreaView>
  );
}
