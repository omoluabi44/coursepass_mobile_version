import { View, Text, SafeAreaView,TextInput, ActivityIndicator, FlatList, TouchableOpacity, StatusBar } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Title from '../../../components/titles';
import axios from 'axios';
import Load from '../../../components/loader';
import { useGetAllCourseQuery, useEnrollUserMutation ,useGetUserEnrollQuery} from '../../../redox/slice/apiSlice';
import { useSelector } from 'react-redux';
import filter from "lodash.filter";
import PopUp from "../../../components/toast"
import GoBackBtn from '../../../components/goBackButton';





export default function Search() {
  const {user} = useSelector((state) => state.login);
  const {data, isFetching, isSuccess, isError, error} = useGetAllCourseQuery()
  const {refetch } = useGetUserEnrollQuery(user.id)
  const [enrollUser, { isLoading: isEnrolling, isSuccess: enrollSuccess, isError: enrollError, error: enrollErrorData }] = useEnrollUserMutation();
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [FilterData, setFilterData] = useState([])
  const [fulldata, setFullData] = useState([])
  const [id, setId] = useState("")
  const userID = user.id
  
  useEffect(()=>{
    if (isSuccess && data){
      setFullData(data)
      setFilterData(data)
    }
  }, [isSuccess, data])

  useEffect(() => {
    if (enrollSuccess) {
      PopUp({ type: "success", title: "Successful", message: "Enrollment successful!" });
      
    }
    if (enrollError) {
      ///extract the response header and message
      const html = enrollErrorData?.data;
      const match = html.match(/<h1>(.*?)<\/h1>\s*<p>(.*?)<\/p>/);
      
      if (match) {
        const heading = match[1]; 
        const message = match[2]; 
        PopUp({ type: "error", title: "Enrollment failed", message: `${heading} ${message}` });
       
      } else {
        PopUp({ type: "error", title: "Enrollment failed", message:'Unknown error' });
      }
 
      
      
      
            
    }
  }, [enrollSuccess, enrollError, enrollErrorData]);


  if(isFetching) return <Load visible={isFetching} data="loading courses..."/>
  if(isError) return <Text>Please check  your network</Text>

  const handleSearch =(query)=>{
    setSearchQuery(query)
    const formattedQuery = query.toLowerCase()
    if(!query){
      setFilterData(fulldata);
      return
    }
    const filteredData = filter(fulldata, (item)=>{
      return contains(item,formattedQuery);
    })
    setFilterData(filteredData)

  }
  const contains = ({courseID, courseName},query) =>{
    return(
      (courseID && courseID.toLowerCase().includes(query)) ||
      (courseName && courseName.toLowerCase().includes(query))
    )
  }

  const handleId = async (courseID) => { 
    try {
      await enrollUser({ userID, courseID }).unwrap();
      refetch()
      console.log('Enrollment successful');
    } catch (err) {
     
    } 
  };

  
  

  return (
    
    <SafeAreaView className="flex-1 mt-20 ">
      <View className="flex-row ">
        <View className="mt-2">
          <GoBackBtn />
        </View>
        
        <TextInput 
          className="mx-5 h-10 rounded-2xl pl-5 mb-5 w-80 bg-white text-black"
          style={{ borderColor: "grey", borderWidth: 1 }}
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
      keyExtractor={(item)=> item.id}
      renderItem={({item}) =>(
        <View className="mb-3 bg-white rounded w-100 mx-2 p-3 flex-row justify-between ">
          <View>
            <Text>{item.courseID}</Text>
            <Text className="lowercase text-[grey]">{item.courseName}</Text>
         </View>
         <View>
          <TouchableOpacity onPress={()=>handleId(item.courseID)}>
          <Text className=' ' >  ➕ </Text>
          </TouchableOpacity>
          
         </View>
        </View>

  )}

      />

     
    </SafeAreaView>
  );
}