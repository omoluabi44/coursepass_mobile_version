// import { Stack } from "expo-router";
// import { View, Text } from 'react-native'

// import "./globals.css"

// export default function RootLayout() {
//   return (
   
    
// <Stack  screenOptions={{headerShown: false}}>
//   <Stack.Screen name="(Protected)" options={{headerShown: false}}/>
//  </Stack>
  
 
// );
//}
import { Redirect, Stack } from "expo-router";
import { View, ActivityIndicator  } from 'react-native'
import { Provider, useSelector, useDispatch } from 'react-redux';
import { store } from "../redox/store";
import {selectisAuthenticated} from "../redox/selector/loginSelector"
import {initializeAuth} from "../redox/actions/loginActionCreator"
import { useEffect, useState } from "react";
import { ToastProvider } from 'react-native-toast-notifications'
import Toast from 'react-native-toast-message';



const RootLayoutNav = () => {
  const dispatch = useDispatch();
  const [IsInitializing, setIsInitializing]= useState(true);
  
  useEffect(() => {
    dispatch(initializeAuth())
    .then(() => setIsInitializing(false))
    .catch((error) => {
      console.error('initializeAuth failed:', error);
      setIsInitializing(false);
    });
  
  
  } ,[dispatch])


  if (IsInitializing){
    return(
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large"/>
      </View>
    )
  }
  // if (!isAuthenticated){
  //   // console.log("not authenticated");
  //   return <Redirect href="/login" />;
    
    

  // }
  return (
   
    

    <Stack   screenOptions={{headerShown: false}}>
     <Stack.Screen name="(Protected)" options={{headerShown: false}}/>
    </Stack>
     
    
   );

}


export default function RootLayout() {
  return(
    <Provider store={store}>
     
      <RootLayoutNav/>
      <Toast/>

    
  </Provider>

  )



  
}
