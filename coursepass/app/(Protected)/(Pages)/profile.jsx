import {View, Text, Image, ScrollView, TouchableOpacity, Platform, SafeAreaView} from 'react-native';
import React, {useEffect} from 'react';
import GoBackBtn from '../../../components/goBackButton';
import {FontAwesome, AntDesign, MaterialIcons, FontAwesome5, FontAwesome6, Fontisto, EvilIcons} from '@expo/vector-icons';
import {useDispatch} from 'react-redux';
import {logout} from '../../../redox/actions/loginActionCreator';
import {useGetUserIdQuery} from '../../../redox/slice/apiSlice';
import {useSelector} from 'react-redux';

import * as SystemUI from 'expo-system-ui';
import {hideNavigationBar} from 'react-native-navigation-bar-color';
import {router} from 'expo-router';
import {useColorScheme} from 'react-native';



export default function Profile() {

  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.login);
  const {data, isFetching, isError} = useGetUserIdQuery(user.id);
  const theme = useColorScheme();






  const logOut = () => {
    dispatch(logout());
  };

  return (

      <SafeAreaView className="h-full bg-[#f5f3f2]"
style={ theme === 'dark' ? { backgroundColor: "black" } : "" }

      >
        <View className="px-5 pt-5">
          <View className="flex-row justify-between items-center mb-5">
            <TouchableOpacity onPress={() => router.push("./")}>
              <AntDesign name="left" size={24} color={ theme ==="dark"? "white":"dark"} />
            </TouchableOpacity>
            <Text className="text-2xl font-bold"
             style={ theme === 'dark' ? { color: "#d4d4d4" } : "" }
            >Profile</Text>
            <TouchableOpacity
              onPress={logOut}
              className="bg-accent px-4 py-1 rounded-xl"
              

            >
              <Text className="text-white font-medium"
               style={ theme === 'dark' ? { color: "#d4d4d4" } : "" }
              >Log out</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{height: Platform.OS == "android" ? "650" : "100%", backgroundColor:  theme==="dark"? "black":'#f5f3f2'}}
          >
            <ScrollView showsVerticalScrollIndicator={false}

            >
              <View className="bg-white rounded-2xl  p-5 items-center"
              style={ theme === 'dark' ? { backgroundColor: "#252231" } : "" }
              
              >

                <Image
                  className="w-36 h-36 rounded-full mb-3"

                  source={data && data.profile_image ? {uri: data.profile_image} : require('../../../assets/images/profile.png')}
                />


                <Text className="text-2xl font-bold mb-1"
                style={ theme === 'dark' ? { color: "#d4d4d4" } : "" }

                >@{data && data.username}</Text>
                <Text className="text-sm text-gray-600 mb-3"
                style={ theme === 'dark' ? { color: "#d4d4d4" } : "" }
                >{data && data.university ? data.university.department : "Null"} Student</Text>
              </View>

              <View className="flex-row justify-around mt-6">
                {[
                  {label: 'Leaderboard', value: '5th'},
                  {label: 'Courses', value: '5'},
                  {label: 'Level', value: data && data.university ? data.university.level : "Null"},
                ].map((item, index) => (
                  <View key={index} className="bg-[#E6F0FF] w-24 h-24 rounded-2xl items-center justify-center ">
                    <Text className="text-lg font-bold text-accent">{item.value}</Text>
                    <Text className="text-xs mt-1 text-gray-600">{item.label}</Text>
                  </View>
                ))}
              </View>

              <View className="mt-3 ">
                <Text className="text-lg font-bold mb-3"
                style={ theme === 'dark' ? { color: "#d4d4d4" } : "" }
                >Personal Information</Text>
                <View className="rounded-xl bg-white p-4"
                style={ theme === 'dark' ? { backgroundColor: "#252231" } : "" }
                >
                  {[
                    {icon: <FontAwesome6 name="user" size={20}  color={ theme ==="dark"? "white":"dark"} />, value: `${data?.Fname} ${data?.Lname}`},
                    {icon: <Fontisto name="email" size={20}  color={ theme ==="dark"? "white":"dark"} />, value: data?.email},
                    {icon: <EvilIcons name="sc-telegram" size={24}  color={ theme ==="dark"? "white":"dark"} />, value: data?.whatsap_num},
                  ].map((item, index) => (
                    <View key={index} 
                    className="bg-white  px-4 py-3 flex-row items-center gap-3 border-b border-gray-300 "
                    style={ theme === 'dark' ? { backgroundColor: "#252231" } : "" }
                    >
                      {item.icon}
                      <Text className="text-sm text-gray-700"
                       style={ theme === 'dark' ? { color: "#d4d4d4" } : "" }
                      >{item.value? item.value: "Null"}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <View className="mt-3">
                <Text className="text-lg font-bold mb-3"
                style={ theme === 'dark' ? { color: "#d4d4d4" } : "" }
                >School Information</Text>
                <View className="rounded-xl bg-white p-4"
                style={ theme === 'dark' ? { backgroundColor: "#252231" } : "" }
                >
                  {[
                    {icon: <FontAwesome name="university" size={20} color={ theme ==="dark"? "white":"dark"} />, value: data && data.university ? data.university.university : "Null"},
                    {icon: <MaterialIcons name="engineering" size={20} color={ theme ==="dark"? "white":"dark"}  />, value: data && data.university ? data.university.College : "Null"},
                    {icon: <FontAwesome5 name="robot" size={20} color={ theme ==="dark"? "white":"dark"} />, value: data && data.university ? data.university.department : "Null"},
                  ].map((item, index) => (
                    <View key={index}
                     className="bg-white rounded-xl px-4 py-3 flex-row items-center gap-3 border-b border-gray-300"
                     style={ theme === 'dark' ? { backgroundColor: "#252231" } : "" }
                     >
                      {item.icon}
                      <Text
                        // style={{fontSize: 14}} 
                        className=" test-sm text-gray-700 px-2"
                         style={ theme === 'dark' ? { color: "#d4d4d4" } : "" }
                        >{item.value ? item.value : "Null"}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>

  );
}
