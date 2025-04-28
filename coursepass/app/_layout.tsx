import { Stack } from "expo-router";
import { View, Text } from 'react-native'

import './globals.css';

export default function RootLayout() {
  return (
   
    

 <Stack  screenOptions={{headerShown: false}}>
  <Stack.Screen name="(pages)" options={{headerShown: false}}/>
 </Stack>
  
 
);
}
