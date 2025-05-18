import { View, Text, SafeAreaView, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import GoBackBtn from '../../../../components/goBackButton';
import { useNavigation } from '@react-navigation/native';
import { useGetFlashcardOutlineQuery } from '../../../../redox/slice/apiSlice';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9; 
const CARD_MARGIN = 10;

export default function FlashCardDetails() {
  const navigation = useNavigation()
  const { id,course,topic } = useLocalSearchParams();
  const {data, isFetching, isSuccess, error ,isError,refetch }  = useGetFlashcardOutlineQuery(id)
  const [isFlipped, setIsFlipped] = useState(true);
  const [flippedIndex, setFlippedIndex] = useState(null);
useFocusEffect(
  useCallback(() => {
    setFlippedIndex(null); // Reset when screen gains focus

    return () => {
      setFlippedIndex(null); // Optional: also reset on screen blur
    };
  }, [])
);

  if(isFetching)return(<Text>loading</Text>)
  if(isError)return(<Text>error</Text>)

  console.log(data[0].answer);
  

 const handleFlip = (index) => {
  setFlippedIndex(prev => prev === index ? null : index);
};

const  handleBackNav =()=>{
  navigation.navigate("(flashcard)/flashCardList")

}


  return (
    <SafeAreaView className="flex-1 bg-white">
     {/* <GoBackBtn/> */}
       <TouchableOpacity onPress={handleBackNav}>
        <AntDesign name="left" size={24} color="black" />
       </TouchableOpacity>

        <View className="h-10 justify-center items-center">
         
            <Text> {course}: {topic} </Text>
        </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + CARD_MARGIN * 2}
        decelerationRate="fast"
        contentContainerStyle={{
          paddingHorizontal: CARD_MARGIN,
          alignItems: 'center',
        }}
      >
        {data.map((value, index) => (
          <View
            key={index}
            className="bg-base justify-center items-center"
            style={{
              width: CARD_WIDTH,
              marginHorizontal: CARD_MARGIN,
            }}
          >
           {flippedIndex === index ? 
           <View>
              <Text className="text-2xl" >ANSWER</Text>
            </View>
           :
            <View>
              <Text className="text-2xl">QUESTION</Text>
            </View>
            }
            <View  onTouchEnd={() => handleFlip(index)}
             className="h-[400px] w-full items-center mt-5  rounded-lg border border-accent overflow-hidden">
              <View className={`h-full w-full justify-center items-center ${flippedIndex === index ? "  bg-base":"bg-accent"} `}>
         
                <Text className="text-lg font-semibold text-white">
                  {flippedIndex === index ?
                 
                      <Text className="text-lg font-semibold text-accent">{value.answer}</Text>
        
                   
                    : 
                 
                      
                    <Text className="text-lg font-semibold text-white">{value.question}</Text>
                    
                    }
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
