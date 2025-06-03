import {View, Text, SafeAreaView, TouchableOpacity, StatusBar, RefreshControl} from 'react-native'
import React,{useCallback, useState} from 'react'
import GoBackBtn from '../../../../components/goBackButton';
import {MaterialCommunityIcons, AntDesign} from '@expo/vector-icons/';
import {ScrollView} from 'react-native-gesture-handler';
import {useGetFlashcardQuery} from '../../../../redox/slice/apiSlice';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {useColorScheme} from 'react-native';
import {router} from 'expo-router';
import Error from '../../../../components/error';
import LoadingComponent from '../../../../components/HomeComponents/loading';



export default function FlashCardList() {
  const navigation = useNavigation()
  const {user} = useSelector((state) => state.login);
  const {data, isFetching, isSuccess, error, isError, refetch} = useGetFlashcardQuery(user.id)
  const theme = useColorScheme();
    const [refreshing, setRefreshing] = useState(false)
      const onRefresh = useCallback(() => {
        setRefreshing(true);
        refetch()
          .finally(() => {
            setRefreshing(false);
          });
      }, []);


  if (isFetching) {
    return (
      <LoadingComponent component="FLASHCARD" />
    )
  }
  if (!isSuccess) return (

    <Error component="FLASHCARD" />
  );


  if (Array.isArray(data) && data.length === 0) {
    return (
      <SafeAreaView className="h-full"
        style={theme === 'dark' ? {backgroundColor: "#252231"} : ""}
      >
        <View className="absolute top-10">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="left" size={24} color={theme === "dark" ? "white" : "dark"} />
          </TouchableOpacity>
        </View>
        <View className="items-center mt-10">
          <Text className="text-black font-bold text-3xl "
            style={theme === 'dark' ? {color: "#d4d4d4"} : ""}
          > FLASHCARD </Text>
        </View>
        <View className="h-full justify-center items-center mx-10">
          <Text className="text-center "
            style={theme === 'dark' ? {color: "#d4d4d4"} : ""}

          > your flash card is empty, create flashcard in  the note screen </Text>

        </View>

      </SafeAreaView>
    )

  }

  const handleFlashcardId = (id, course, topic) => {
    console.log(id, course, topic);

    router.push({
      pathname: `/${id}`,
      params: {course, topic}
    });
    // router.push({ pathname: '/flashCardDetails', query: { id: 'abc123' } });



  }
  return (
    <SafeAreaView className="h-full"
      // style={ theme === 'dark' ? { backgroundColor: "#252231" } : "" }
      style={theme === 'dark' ? {backgroundColor: "black"} : ""}


    >
      <StatusBar barStyle={theme === "dark" ? "light-content" : "dark-content"} />

      <View className="h-full bg-secondary2 "
        style={theme === 'dark' ? {backgroundColor: "black"} : ""}
      >
        <View className="absolute top-10">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="left" size={24} color={theme === "dark" ? "white" : "dark"} />
          </TouchableOpacity>
        </View>
        <View className="items-center mt-10">
          <Text className="text-black font-bold text-3xl "
            style={theme === 'dark' ? {color: "#d4d4d4"} : ""}
          > FLASHCARDS</Text>
        </View>
        <ScrollView
           refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={['#007BFF']} 
                  tintColor="#007BFF" 
                  scrollEnabled={false}
                />
              }
        >
          {data?.map((coursename, id) => {
            return (
              <View key={id} className="mx-5 my-2 bg-base px-3 py-3 rounded-lg  "
                style={theme === 'dark' ? {backgroundColor: "#252231"} : ""}
              >
                <View className="mb-3">
                  <Text className="text-accent">
                    {coursename.courseID}
                  </Text>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="">
                  {coursename.outlines.map((outline, id) => {
                    return (
                      <View key={id} className="flex-row mx-1">
                        <TouchableOpacity onPress={() => handleFlashcardId(outline.outlineID, coursename.courseID, outline.topic)}>
                          <View className="flex-row items-center gap-2 bg-secondary p-2 w-60 justify-center rounded"
                            style={theme === 'dark' ? {backgroundColor: "#1f1f1f", borderColor: "#444"} : ""}>
                            <MaterialCommunityIcons name="cards" size={40} color={theme === "dark" ? "white" : "dark"} />
                            <View className="gap-3">
                              <Text className="text-xs"
                                style={theme === 'dark' ? {color: "#d4d4d4"} : ""}
                              >
                                {outline.topic}
                              </Text>
                              <Text style={theme === 'dark' ? {color: "#d4d4d4"} : ""} >{outline.total_outline}</Text>
                            </View>

                          </View>
                        </TouchableOpacity>

                      </View>
                    )
                  })}

                </ScrollView>
              </View>

            )
          })}
        </ScrollView>



      </View>
    </SafeAreaView>

  );

}