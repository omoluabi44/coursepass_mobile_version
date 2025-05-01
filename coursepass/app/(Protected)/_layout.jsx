import { Redirect, Stack } from "expo-router";
import { View, Text } from 'react-native'
import {selectisAuthenticated} from "../../redox/selector/loginSelector"
import {  useSelector } from 'react-redux';

import "../globals.css"



export default function ProtectedLayout() {
  const isAuthenticated = useSelector(selectisAuthenticated)

  
  if (!isAuthenticated){


    return <Redirect href="/login" />;
  
  }

  
  

  return (
   
    

 <Stack  screenOptions={{headerShown: false}}>
  <Stack.Screen name="(Pages)" options={{headerShown: false}}/>
 </Stack>
  
 
);
}
