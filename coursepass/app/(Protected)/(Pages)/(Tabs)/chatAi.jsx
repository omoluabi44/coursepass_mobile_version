import { View, Text } from 'react-native'
import React from 'react'
import { useGetUserIdQuery } from '../../../../redox/slice/apiSlice';
import { useSelector } from 'react-redux';



export default function ChatAi() {
  const {user} = useSelector((state) => state.login);
const {data, isFetching, isSuccess, error ,isError} = useGetUserIdQuery(user.id)
  console.log(data); 
  

  if(isFetching) return <Text>Loading...</Text>
if (isError){
  if (error.status === 401) {
    
  }
}
  

  
  
 
          // <View className="flex-1 justify-center items-center">
          //   <Text> error {error} </Text>
          //   </View>
 
  return (
    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", height: "100%" }}>
     {/* {data.map((item,id ) =>{
      return(
        <Text key={id}> {item}</Text>
      )
     })} */}
    
    </View>
  );
}
