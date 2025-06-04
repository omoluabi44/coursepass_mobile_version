import { View, Text, useWindowDimensions ,StyleSheet, ActivityIndicator} from 'react-native'
import React from 'react'


export default function Load({visible= true, data}) {
    const {height, width }= useWindowDimensions()
  return (
    visible &&  <View
                style={[style.container, {height, width }] }
                >
                    <View style={[style.loader]}>
                       <ActivityIndicator size="large" color="blue"/>
                        <Text className="pl-2">{data}</Text>
                    </View>
        
         </View>
  )
}

const style = StyleSheet.create({
    container:{
        position:"absolute",
        zIndex:10,
        backgroundColor:'rgba(0,0,0,0.5)',
        justifyContent:'center'
    },
    loader:{
        height:70,
        backgroundColor:"white",
        marginHorizontal: 50,
        borderRadius: 5,
        flexDirection:"row",
        alignItems:"center",
        paddingHorizontal:20,
         justifyContent:"center"


    }
})