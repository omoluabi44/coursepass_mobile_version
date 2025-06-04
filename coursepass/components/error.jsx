import { View, Text , TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'
import {MaterialCommunityIcons, AntDesign} from '@expo/vector-icons/';
import {useColorScheme} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function Error ({component}) {
      const theme = useColorScheme();
      const navigation = useNavigation()
  return (
     <SafeAreaView className="bg-base"
        style={ theme === 'dark' ? { backgroundColor: "#252231" } : "" }
        >
         <View className="absolute top-10">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <AntDesign name="left" size={24} color={theme === "dark" ? "white" : "dark"} />
                </TouchableOpacity>
              </View>
              <View className="items-center mt-10">
                <Text className="text-black font-bold text-3xl "
                  style={theme === 'dark' ? {color: "#d4d4d4"} : ""}
    
                > {component}</Text>
              </View>
        <View className="h-full justify-center items-center">
          <Text className="font-bold text-3xl text-black"
           style={ theme === 'dark' ? { color: "#d4d4d4" } : "" }
          >Networt error </Text>
          <Text className="text-center"
           style={ theme === 'dark' ? { color: "#d4d4d4" } :  { color: "gray" } }
          >its not your fault</Text>
        </View>
        </SafeAreaView>
  )
}