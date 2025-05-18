import {View, Text, SafeAreaView, TouchableOpacity, ScrollView, Modal, Pressable, TextInput, Keyboard, TouchableWithoutFeedback} from 'react-native'
import React, {useState,useEffect} from 'react'
import GoBackBtn from '../../../components/goBackButton';
import {useGetNoteSessionQuery, useCreateFlashCardMutation} from '../../../redox/slice/apiSlice';
import {useRoute} from '@react-navigation/native';
import MarkdownMathView from 'react-native-markdown-math-view'
import {useNavigation} from '@react-navigation/native';
import {router} from 'expo-router';
import {AntDesign, MaterialCommunityIcons} from '@expo/vector-icons';
import {FloatingAction} from "react-native-floating-action";
import { useSelector } from 'react-redux';
import PopUp from '../../../components/toast';
export default function CourseNote() {
  const navigation = useNavigation();
  const route = useRoute();
  const {outline, selectedValue, courseId, topic} = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [answer, setAnswer] = useState("");
  const [question, setQuestion]= useState("")
  const {user} = useSelector((state) => state.login);
  const {data: note, isFetching: isFetchingNote, isSuccess: isSuccessNote, error: ErrorNote, isError: isErrorNote} = useGetNoteSessionQuery({outline, selectedValue});
  const [createFlashCard, { isLoading: isEnrolling, isSuccess: enrollSuccess, isError: enrollError, error: enrollErrorData }] = useCreateFlashCardMutation();

  const actions = [
    {
      text: "Flashcard",
      icon: <MaterialCommunityIcons name="cards" size={26} color="white" />,
      name: "flashcard",
      position: 1
    }

  ];
 useEffect(() => {
    if (enrollSuccess) {
      PopUp({ type: "success", title: "Successful", message: "Flashcard creation was  successful!" });
      
    }
    if (enrollError) {
      ///extract the response header and message
      const html = enrollErrorData?.data;
      const match = html.match(/<h1>(.*?)<\/h1>\s*<p>(.*?)<\/p>/);
      
      if (match) {
        const heading = match[1]; 
        const message = match[2]; 
        PopUp({ type: "error", title: "Creating Flashcard failed", message: `${heading} ${message}` });
       
      } else {
        PopUp({ type: "error", title: "Creating Flashcard failed", message:'Unknown error' });
      }
 
      
      
      
            
    }
  }, [enrollSuccess, enrollError, enrollErrorData]);
  
  if (isFetchingNote) return <Text>Loading...</Text>
  if (isErrorNote) return <Text>error </Text>
  
const HandleFlashCard = async ()=>{

   try {
      await createFlashCard({ outlineID:outline, courseID:courseId, question, answer, userID:user.id }).unwrap();
      setAnswer(null)
      setQuestion(null)
      console.log('Enrollment successful');
       
    } catch (err) {
     
    } 

  
}

  const handleNavigation = () => {
    // navigation.navigate("profile")
    router.push("/courseDetails")
  }

  return (
    <SafeAreaView>
      <View className="h-full">
        <View className='flex-row  items-center h-10'>
            <View  className="ml-5">
              <TouchableOpacity onPress={handleNavigation}>
                <AntDesign name="left" size={24} color="black" />
              </TouchableOpacity>
            </View>
          <View className=" items-center w-full">
            <Text > {topic}  </Text>
          </View>

         
          <Modal
            visible={modalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setModalVisible(false)}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="flex-1 justify-center items-center  px-4">
              <View className="bg-white w-full max-w-md rounded-2xl p-6 shadow-lg">
                <Text className="text-lg font-bold mb-4 text-center">Create Flashcard</Text>

                <View className="mb-4">
                  <Text className="text-gray-700 mb-1">Question</Text>
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
                  <Text className="text-gray-700 mb-1">Answer</Text>
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
                    onPress={() => setModalVisible(false)}
                  >
                    <Text className="text-gray-700 font-medium">Cancel</Text>
                  </Pressable>

                  <Pressable
                    className="bg-accent px-4 py-2 rounded-lg"
                    onPress={() => {
                      HandleFlashCard()
                      setModalVisible(false)
                    }}
                  >
                    <Text className="text-white font-medium">Save</Text>
                  </Pressable>
                </View>
              </View>
            </View>
            </TouchableWithoutFeedback>
          </Modal>


        </View>

        <ScrollView>
          <View className="mx-5">
            <MarkdownMathView>
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