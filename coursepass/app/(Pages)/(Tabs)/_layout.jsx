import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'

import TabBar from "../../../components/TabBar"
import {DrawerToggleButton} from '@react-navigation/drawer';
import {MaterialIcons,AntDesign} from '@expo/vector-icons/MaterialIcons';




export default function _layout() {
  return (
    <Tabs screenOptions={{headerLeft: () => <DrawerToggleButton/>}}
    tabBar={props=> <TabBar {...props}/>}
    >
        <Tabs.Screen
            name="index"
            
            options={{
                 title: 'Home',
                 headerShown: false,
                 
                 
                 }}
        />
         <Tabs.Screen
            name="chatAi"
            options={{
                 title: 'AI',
                 headerShown: false
                 }}
        />
         <Tabs.Screen
            name="news"
            options={{
                 title: 'News',
                 headerShown: false
                 }}
        />
          <Tabs.Screen
            name="PastQuestion"
            options={{
                 title: 'Quiz',
                 headerShown: false
                 }}
        />
           <Tabs.Screen
            name="profile"
            options={{
                 title: 'Profile',
                 headerShown: false
                 }}
        />
    </Tabs>
  )
}