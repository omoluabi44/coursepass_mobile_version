import {View, Text, SafeAreaView, TouchableOpacity, ScrollView, Modal, Pressable, TextInput, Keyboard, TouchableWithoutFeedback} from 'react-native'
import React, {useState, useEffect} from 'react'
import GoBackBtn from '../../../components/goBackButton';
import {useGetNoteSessionQuery, useCreateFlashCardMutation, usePointMutation} from '../../../redox/slice/apiSlice';
import {useRoute} from '@react-navigation/native';
import MarkdownMathView from 'react-native-markdown-math-view'
import {useNavigation} from '@react-navigation/native';
import {router} from 'expo-router';
import {AntDesign, MaterialCommunityIcons} from '@expo/vector-icons';
import {FloatingAction} from "react-native-floating-action";
import {useSelector} from 'react-redux';
import PopUp from '../../../components/toast';
import {useColorScheme} from 'react-native'
export default function CourseNote() {
  const navigation = useNavigation();
  const route = useRoute();
  const {outline, selectedValue, courseId, topic} = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState("")
  const {user} = useSelector((state) => state.login);
  const {data: note, isFetching: isFetchingNote, isSuccess: isSuccessNote, error: ErrorNote, isError: isErrorNote} = useGetNoteSessionQuery({outline, selectedValue});
  const [createFlashCard, {isLoading: isEnrolling, isSuccess: enrollSuccess, isError: enrollError, error: enrollErrorData, refetch }] = useCreateFlashCardMutation();
  const [streak, {isLoading: isStreaking, isSuccess: StreakSuccess, isError: streakError, error: streakErrorData}] = usePointMutation();
  const theme = useColorScheme();
  console.log(courseId);
  
  const actions = [
    {
      text: "Flashcard",
      icon: <MaterialCommunityIcons name="cards" size={26} color="white" />,
      name: "flashcard",
      position: 1
    }

  ];
  const handleStreak = async () => {

    try {
      await streak({userID: user.id, note_id: note.id}).unwrap();
      PopUp({type: "success", title: "Earn point", message: "point earn!"});

      console.log('point earn');

    } catch (err) {
     

    }

  }
  useEffect(() => {
    if (!note?.id) return;
    const timer = setTimeout(() => {
      handleStreak()



    }, 10000); // 60,000 ms = 1 minute

    return () => clearTimeout(timer); // cleanup on unmount
  }, [note]);
  useEffect(() => {

    if (enrollSuccess) {
      PopUp({type: "success", title: "Successful", message: "Flashcard creation was  successful!"});
        console.log(courseId);

    }
    if (enrollError) {
      ///extract the response header and message
      const html = enrollErrorData?.data;
      const match = html.match(/<h1>(.*?)<\/h1>\s*<p>(.*?)<\/p>/);

      if (match) {
        const heading = match[1];
        const message = match[2];
        PopUp({type: "error", title: "Creating Flashcard failed", message: `${heading} ${message}`});

      } else {
        PopUp({type: "error", title: "Creating Flashcard failed", message: 'Unknown error'});
      }





    }
  }, [enrollSuccess, enrollError, enrollErrorData]);

  if (isFetchingNote) return <Text>Loading...</Text>
  if (isErrorNote) return (


    <View className="h-full" style={theme === 'dark' ? {backgroundColor: "#252231"} : ""} >
      <TouchableOpacity className="absolute top mt-20  ml-2" onPress={() => router.push("./")}>
        <AntDesign name="left" size={24} color={theme === "dark" ? "white" : "dark"} />
      </TouchableOpacity>
      <View className="items-center justify-center mt-20">
        <Text
          style={theme === 'dark' ? {color: "#d4d4d4"} : ""}
        >Note not found: 404 error </Text>
      </View>


    </View>
  )




  const HandleFlashCard = async () => {

    try {
      await createFlashCard({outlineID: outline, courseID: courseId, question, answer, userID: user.id}).unwrap();
      setAnswer(null)
      setQuestion(null)
      refetch()

    } catch (err) {
      console.log(err);
      

    }


  }

  const handleNavigation = () => {
    // navigation.navigate("profile")
    router.push("/courseDetails")
  }

  return (
    <SafeAreaView
      style={theme === 'dark' ? {backgroundColor: "#555"} : ""}
    >
      <View className="h-full">
        <View className='flex-row  items-center h-10'>
          <View className="ml-5">
            <TouchableOpacity onPress={handleNavigation}>
              <AntDesign name="left" size={24} color={theme === "dark" ? "white" : "dark"} />
            </TouchableOpacity>
          </View>
          <View className=" items-center w-full">
            <Text
              style={theme === 'dark' ? {color: "#d4d4d4"} : ""}
            > {topic}  </Text>
          </View>


          <Modal
            visible={modalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setModalVisible(false)}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View className="flex-1 justify-center items-center  px-4">
                <View className="bg-white w-full max-w-md rounded-2xl p-6 shadow-lg"
                style={ theme === 'dark' ? { backgroundColor: "black" } : "" }
                >
                  <Text className="text-lg font-bold mb-4 text-center"
                   style={ theme === 'dark' ? { color: "#d4d4d4" } : "" }
                  >Create Flashcard</Text>

                  <View className="mb-4">
                    <Text className="text-gray-700 mb-1"
                     style={ theme === 'dark' ? { color: "#d4d4d4" } : "" }
                    >Question</Text>
                    <TextInput
                      multiline
                      onChangeText={setQuestion}
                      value={question}
                      numberOfLines={4}
                      className="border border-gray-300 rounded-lg p-3 text-base text-gray-800"
                      placeholder="Enter your question"
                    />
                  </View>

                  <View className="mb-6">
                    <Text className="text-gray-700 mb-1"
                     style={ theme === 'dark' ? { color: "#d4d4d4" } : "" }
                    >Answer</Text>
                    <TextInput
                      multiline
                      numberOfLines={4}
                      onChangeText={setAnswer}
                      value={answer}
                      className="border border-gray-300 rounded-lg p-3 text-base text-gray-800"
                      placeholder="Enter the answer"
                    />
                  </View>

                  <View className="flex-row justify-between">
                    <Pressable
                      className="bg-gray-300 px-4 py-2 rounded-lg"
                      style={ theme === 'dark' ? { backgroundColor: "#252231" } : "" }
                      onPress={() => setModalVisible(false)}
                    >
                      <Text className="text-gray-700 font-medium"
                       style={ theme === 'dark' ? { color: "#d4d4d4" } : "" }
                      >Cancel</Text>
                    </Pressable>

                    <Pressable
                      className="bg-accent px-4 py-2 rounded-lg"
                      onPress={() => {
                        HandleFlashCard()
                        setModalVisible(false)
                      }}
                    >
                      <Text className="text-white font-medium"
                       style={ theme === 'dark' ? { color: "#d4d4d4" } : "" }
                      >Save</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>


        </View>

        <ScrollView>
          <View className="mx-5">
            <MarkdownMathView
            //  style={ theme === 'dark' ? { color: "#d4d4d4" } : "" }
             markdown={`This is some colored math: $$\\textcolor{green}{E = mc^2}$$`}
              style={{ color: 'black', fontSize: 18 }}
            >
             
              {note.content}
    
            </MarkdownMathView>


          </View>
        </ScrollView>

        {/* <View className="absolute  bottom-0 flex-row justify-between w-full h-20 items-center ">
          <TouchableOpacity className="ml-5 bg-secondary border border-accent h-10 w-40 rounded-lg justify-center items-center">
            <Text className="text-accent">Next</Text>
          </TouchableOpacity>
          <TouchableOpacity className="mr-5 bg-secondary border border-accent h-10 w-40 rounded-lg justify-center items-center">
            <Text className="text-accent" >Prev</Text>
          </TouchableOpacity>
      </View>
      */}

      </View>
      <FloatingAction
        actions={actions}
        // onPressMain={}
        onPressItem={name => {

          if (name === "flashcard") {
            setModalVisible(true);
          }
        }}
      />
    </SafeAreaView>
  )
}