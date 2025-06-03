import {Redirect, Stack} from "expo-router";
import {View, Text} from 'react-native'
import {selectisAuthenticated} from "../../redox/selector/loginSelector"
import {useSelector} from 'react-redux';
import AsyncStorage from "@react-native-async-storage/async-storage";

import {useState, useEffect} from "react";
import "../globals.css"




export default function ProtectedLayout() {
  const isAuthenticated = useSelector(selectisAuthenticated)
  const [firstLaunched, setFirstLaunched] = useState(null)

  useEffect(() => {
    const checkFirstLaunch = async () => {
      const appData = await AsyncStorage.getItem("firstLaunched");

      if (appData === null) {
        setFirstLaunched(true);
        await AsyncStorage.setItem("firstLaunched", "false");
      } else {
        setFirstLaunched(false);
      }
    };

    checkFirstLaunch();
  }, []);


  if (!isAuthenticated) {

    if (firstLaunched == null) {
      return <Redirect href="/Onboarding" />
    }
    else {
      return <Redirect href="/login" />

    }

  }




  return (



    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="(Pages)" options={{headerShown: false}} />
    </Stack>


  );
}
