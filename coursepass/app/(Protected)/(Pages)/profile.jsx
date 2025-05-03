import { View, Text,Image ,ScrollView, Touchable, TouchableOpacity, SafeAreaView} from 'react-native'
import React from 'react'
import GoBackBtn from '../../../components/goBackButton';
import Title from '../../../components/titles';
import {FontAwesome, AntDesign ,  MaterialIcons, FontAwesome5, FontAwesome6, Fontisto, EvilIcons  } from '@expo/vector-icons/';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redox/actions/loginActionCreator';
import { useGetUserIdQuery } from '../../../redox/slice/apiSlice';
import { useSelector } from 'react-redux';





export default function Profile() {
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.login);
  const {data, isFetching, isSuccess, error ,isError} = useGetUserIdQuery(user.id)

  

  if(isFetching) return <Text>Loading...</Text>


  const logOut = () => {
    dispatch(logout())



  }

  return (

      
   <SafeAreaView>

  
    <View className="h-full bg-[#f5f3f2] ">
      <View className="mt-5 mb-5 flex-row justify-around">
              <GoBackBtn/>
                <View className="items-center">
                    <Text className="text-lg">
                   Profile
                    </Text>
                </View>
                <TouchableOpacity
                onPress={logOut}
                 className="w-20 bg-accent justify-center items-center rounded-2xl h-[30px]">
                  <Text className="text-base">Log out</Text>
                </TouchableOpacity>
            </View>
      
  
   <ScrollView>
      <View className="mt-20 bg-base mx-5 rounded items-center ">
       <Image 
              className="w-40 h-40 rounded-full mt-5 "
              source ={require('../../../assets/images/profile.jpg')}
              
              />
              <View className="justify-center items-center gap-2 mt-3 mb-3">
              <Text className="text-2xl font-bold">@{data.username}</Text>
              <Text> {data.university.department} Student </Text>
              

              </View>
             
      </View>
      {/* Personal Infor */}
      <View className="mx-5 mt-5 flex-row gap-4 justify-center ">
        <View className="h-20 w-20 bg-base justify-center rounded">
          <View className="items-center gap-4">
            <Text className="text-accent text-lg">5th</Text>
            <Text className="text-xs">Leaderboard</Text>
          </View>
        </View>
        <View className="h-20 w-20 bg-base justify-center rounded">
          <View className="items-center gap-4">
            <Text className="text-accent text-lg">5 </Text>
            <Text className="text-xs">Courses</Text>
          </View>
        </View>  
        <View className="h-20 w-20 bg-base justify-center rounded">
          <View className="items-center gap-4">
            <Text className="text-accent text-lg">{data.university.level}</Text>
            <Text className="text-xs">Level</Text>
          </View>
        </View>
      </View>
      <View className="mx-5 mt-5 ">
        <Text className="font-bold">
         PERSONAL INFORMATION
        </Text>
        <View  className=" gap-3  mt-5">
          <View className="bg-base pl-5 pt-2 pb-2 mr-5 flex-row gap-3 items-center">
          <FontAwesome6 name="user" size={24} color="black" />
          <Text className="text-sm"> {data.Fname +" "+ data.Lname} </Text>
          </View>
          <View className=" bg-base pl-5 pt-2 pb-2 mr-5 flex-row gap-3 items-center">
          <Fontisto name="email" size={24} color="black" />
          <Text className="text-xs"> {data.email} </Text>
          </View>
          <View className=" bg-base pl-5 pt-2 pb-2 mr-5 flex-row gap-3 items-center">
          <EvilIcons name="sc-telegram" size={24} color="black" />
          <Text className="text-sm"> {data.whatsap_num} </Text>
          </View>
        
        </View>
      </View>
      <View className="mx-5 mt-5 ">
        <Text className="font-bold">
         SCHOOL INFORMATION
        </Text>
        <View  className=" gap-3  mt-5">
          <View className="bg-base pl-5 pt-2 pb-2 mr-5 flex-row gap-3 items-center">
          <FontAwesome name="university" size={24} color="black" />
          <Text className="text-xs"> {data.university.university} </Text>
          </View>
          <View className=" bg-base pl-5 pt-2 pb-2 mr-5 flex-row gap-3 items-center">
          <MaterialIcons name="engineering" size={24} color="black" />
          <Text className="text-xs">{data.university.College}</Text>
          </View>
          <View className=" bg-base pl-5 pt-2 pb-2 mr-5 flex-row gap-3 items-center">
          <FontAwesome5 name="robot" size={24} color="black" />
          <Text className="text-xs">{data.university.department}</Text>
          </View>
        
        </View>
      </View>
      
      </ScrollView>

    </View>
    </SafeAreaView>
   
  );
}