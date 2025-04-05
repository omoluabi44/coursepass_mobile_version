import { Stack } from "expo-router";
import { View, Text } from 'react-native'

import './globals.css';

export default function RootLayout() {
  return (
    <View className="bg-black"
    style={{ flex: 1, backgroundColor: "black" }}
    >
 <Stack screenOptions={{headerShown: false}} />
    </View>
 
);
}
