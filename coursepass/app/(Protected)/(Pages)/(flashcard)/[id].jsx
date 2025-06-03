import {View, Text, SafeAreaView, ScrollView, Dimensions, TouchableOpacity, Alert} from 'react-native';
import {useLocalSearchParams} from 'expo-router';
import React, {useState} from 'react';
import {EvilIcons, AntDesign} from '@expo/vector-icons/';
import GoBackBtn from '../../../../components/goBackButton';
import {useNavigation} from '@react-navigation/native';
import {useGetFlashcardOutlineQuery, useDelFlashcardMutation} from '../../../../redox/slice/apiSlice';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';
import {useColorScheme} from 'react-native';



const {width} = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;
const CARD_MARGIN = 10;

export default function FlashCardDetails() {
  const navigation = useNavigation()
  const {id, course, topic} = useLocalSearchParams();
  const {data, isFetching, isSuccess, error, isError, refetch} = useGetFlashcardOutlineQuery(id)
  const [deFlashcard, {isLoading: isFlashcard, isSuccess: deFlashcardSuccess, isError: flashcardError, error: flashcardErrorData}] = useDelFlashcardMutation();
  const [isFlipped, setIsFlipped] = useState(true);
  const [flippedIndex, setFlippedIndex] = useState(null);
  const theme = useColorScheme();
  useFocusEffect(
    useCallback(() => {
      setFlippedIndex(null); // Reset when screen gains focus

      return () => {
        setFlippedIndex(null); // Optional: also reset on screen blur
      };
    }, [])
  );

  if (isFetching) return (<Text>loading</Text>)
  if (isError) return (<Text>error</Text>)




  const handleFlip = (index) => {
    setFlippedIndex(prev => prev === index ? null : index);
  };

  const handleBackNav = () => {
    navigation.navigate("(flashcard)/flashCardList")

  }
  const handlDelete = (flashcardID) => {
    console.log("delete pressed");
    Alert.alert(
      "Delete Flashcard",
      "Are you sure you want to delete this flashcard?",

      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: async () => {

            try {
              await deFlashcard({flashcardID}).unwrap();
              console.log('De-enrollment successful', flashcardID);
              refetch()

            } catch (err) {

            }
          },
          style: "destructive"
        }
      ]
    );

  }

  return (
    <SafeAreaView className="flex-1 bg-white"
      style={theme === 'dark' ? {backgroundColor: "black"} : ""}

    >
      {/* <GoBackBtn/> */}
      <TouchableOpacity onPress={handleBackNav}>
        <AntDesign name="left" size={24} color={theme === "dark" ? "white" : "dark"}
        />
      </TouchableOpacity>

      <View className="h-10 justify-center items-center">

        <Text style={theme === 'dark' ? {color: "#d4d4d4"} : ""} > {course}: {topic} </Text>
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
              ...(theme === 'dark' ? {backgroundColor: "black"} : {})
            }}

          >

            {flippedIndex === index ?
              <View >

                <Text className="text-2xl" style={theme === 'dark' ? {color: "#d4d4d4"} : ""}  >ANSWER</Text>
              </View>
              :
              <View  >
                <TouchableOpacity className="absolute right-60" onPress={() => handlDelete(value.id)}
                >
                  <EvilIcons name="close" size={24} color={theme === "dark" ? "black" : "black"} />
                </TouchableOpacity>
                <Text className="text-2xl" style={theme === 'dark' ? {color: "#d4d4d4"} : ""}>QUESTION</Text>
              </View>
            }
            <View onTouchEnd={() => handleFlip(index)}
              className="h-[400px] w-full items-center mt-5  rounded-lg border border-accent overflow-hidden">
              <View className={`h-full w-full justify-center items-center ${flippedIndex === index ? theme === "dark" ? "bg-[gray]" : "" : "bg-accent"} `}>

                <Text className="text-lg font-semibold text-white">
                  {flippedIndex === index ?

                    <Text className="text-lg font-semibold text-accent"

                      style={theme === 'dark' ? {color: "#d4d4d4"} : ""}
                    >{value.answer}</Text>


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
