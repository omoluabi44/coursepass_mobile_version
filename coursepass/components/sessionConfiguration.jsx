import { View, Text, useWindowDimensions ,StyleSheet, ActivityIndicator, TouchableOpacity,Platform} from 'react-native'
import React, { useState,useEffect } from 'react'
import {FontAwesome} from '@expo/vector-icons/';
import { useGetNoteQuery, useGetNoteSessionQuery } from '../redox/slice/apiSlice';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';




export default function Session({isOpen, setIsOpen, outline, courseId, topic}) {
    const {height, width }= useWindowDimensions()
      const navigation = useNavigation();
    const [selectedValue, setSelectedValue] = useState();
    const {  data: noteData,  isFetching: isNoteFetching,isSuccess: isNoteSuccess,  error: noteError, isError: isNoteError,refetch: refetchNotes,} = useGetNoteQuery(outline);

    useEffect(() => {
        if (noteData && noteData.length > 0 && !selectedValue) {
            setSelectedValue(noteData[0].session);
             }
        }, [noteData]);

    console.log(outline);
    
    if(isNoteFetching) return <Text>loading </Text>
    if (isNoteError) return (null)
    
   const handleSelect =( )=>{
     navigation.navigate('note', {selectedValue: selectedValue, outline:outline, courseId:courseId, topic:topic});
}
    
    const handleClose = ()=>{
        setIsOpen(false)
    }


  return (
    isOpen &&  <View style={[style.container, {height, width }] }>              
                    <View style={[style.loader]}>
                        <TouchableOpacity className="absolute top-0 right-0 pr-2" onPress={handleClose}>
                            <FontAwesome name="close" size={24} color="red" />
                        </TouchableOpacity>
                        <View className="items-center mt-10">
                            <Text className="pl-2 text-2xl">Select session </Text>
                        </View>
                         <Picker
                                
                        selectedValue={selectedValue}
                        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                        >
                        {noteData.map((note,id)=>{
                            return(
                                
                            <Picker.Item key={id} label={note.session} value={note.session} 
                             color={Platform.select({
                                    ios: '#333',
                                    android: selectedValue === note.session ? '#FFA500' : '#444'
                                })}
                                style={{
                                    fontSize: Platform.OS === 'android' ? 14 : 16,
                                    fontFamily: 'Arial'
                                }}
                            />
                            
                     
                            )
                        })}
                          </Picker>
                          <View className="items-center">
                                <TouchableOpacity onPress={ handleSelect} className='bg-accent w-40  p-3 rounded mb-3 mt-3'   >
                                     <Text className='text-xl font-bold text-base text-center '>Open Note</Text>
                                </TouchableOpacity>
                            </View>
                       
                         
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
        height:400,
        backgroundColor:"white",
        marginHorizontal: 50,
        borderRadius: 5,
        // flexDirection:"row",
        // alignItems:"center",
        // // paddingHorizontal:20,
        //  justifyContent:"center"


    }
})