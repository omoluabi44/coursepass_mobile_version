import {View, Text, TouchableOpacity, TextInput, Button, SafeAreaView, StatusBar, Pressable} from 'react-native'
import React, {useEffect, useState} from 'react'
import ResultPage from '../../../components/markSheet.jsx';
import {useLocalSearchParams} from 'expo-router';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';
import {useGetQuizeFilterQuery} from '../../../redox/slice/apiSlice';
import {useSelector} from 'react-redux';
import PopUp from '../../../components/toast.jsx';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';
import { useColorScheme } from 'react-native';







export default function Quiz() {
  const {course, uni, year} = useLocalSearchParams()
  const [selected, setSelected] = useState('');
  const [questions, setQuestions] = useState([]);
  const [questionId, setQuestionId] = useState(0);
  const [allAnswers, setAllAnswers] = useState([]);
  const [result, setResult] = useState(false)
  const [isLength, setIsLength] = useState(false)
  const [showError, setShowError] = useState(false)
  const {user} = useSelector((state) => state.login);
  const {data, isFetching, isSuccess, error, isError, refetch} = useGetQuizeFilterQuery({course, uni, year})
  const navigation = useNavigation()
  const theme = useColorScheme();

  useFocusEffect(
    useCallback(() => {
      setResult(false);
      setSelected('');
      setQuestionId(0);
      setQuestions([]);
      refetch()
      if (data) {
        const cloned = data.map((q) => ({...q}));
        setQuestions(cloned);
        setAllAnswers(
          [...cloned[0].incorrect_answers, cloned[0].correct_answer].sort(() => Math.random() - 0.5)
        );
        setSelected(cloned[0].userAnswer || '');
      }

      return () => {
        setResult(false);
        setSelected('');
        setQuestionId(0);
        setQuestions([]);
      };
    }, [data])
  );




  // if (isFetching) return <Text>loading</Text>
  // if (isError) return <Text>error</Text>


  // {isSuccess &&
  //    console.log(data)


  // }
  useEffect(() => {
    if (isSuccess && data) {
      handleQuestionBank();
    }
     if (isError) {
      console.log(error);
      
    Toast.show({
               type: "error",
               text1: "Not Found",
               text2: `${error.data}`,
             })
    setShowError(true);
   router.push("/PastQuestion")
   
 
    
  }

    


  }, [isSuccess, data, isError, error]);



  // const [score, setScore]= useState(0)

  const handleQuestionBank = () => {
    const cloned = data.map((q) => ({...q}));
    setQuestions(cloned);
    setAllAnswers([...data[0].incorrect_answers, data[0].correct_answer].sort(() => Math.random() - 1))
  }





  const handleNextQuestion = () => {
    if (questionId < questions.length - 1) {
      const nextId = questionId + 1;
      setQuestionId(nextId);
      setAllAnswers(
        [...questions[nextId].incorrect_answers, questions[nextId].correct_answer].sort(() => Math.random() - 0.5)
      );

      // setSelected(''); // Reset selected answer for the new question
      setSelected(questions[nextId].userAnswer || '');
    }
  };
  const handlePrevQuestion = () => {
    if (questionId > 0) {
      const prevId = questionId - 1;
      setQuestionId(prevId);
      setAllAnswers(
        [...questions[prevId].incorrect_answers, questions[prevId].correct_answer].sort(() => Math.random() - 0.5)
      );

      // setSelected(''); // Reset selected answer for the new question

    }

  };
  const handleSelected = (item) => {
    questions[questionId].userAnswer = item
    setSelected(item)




  }
  const handleSubmit = () => {


    setResult(true, course,)
  }






  return (

    <SafeAreaView className="bg-base"
    style={ theme === 'dark' ? { backgroundColor: "black" } : "" }
    >
 
      <StatusBar barStyle={theme==="dark" ? "light-content":"dark-content"} />
      {result ? (
        <View>
          <ResultPage questions={questions} userID={user.id} courseID={course} />
        </View>
      ) : (

        <View className="flex-column justify-center gap-20 items-center h-full bg-base"
        style={ theme === 'dark' ? { backgroundColor: "black" } : "" }
        >
          <View>
          
          </View>
          <View className=" bg-secondary h-[500] mx-5 rounded-lg  "
          style={ theme === 'dark' ? { backgroundColor: "#252231" } : "" }
          >

            <View className="items-center mx-10 mt-5 mb-20">
              <Text className="text-xl"
              style={ theme === 'dark' ? { color: "#d4d4d4" } : "" }

              >{questions[questionId]?.questionText}</Text>

            </View>

            <View className="flex-row flex-wrap  gap-10 px-5 w-full">


              {allAnswers.map((item, i) => {
                return (
                  <View key={i} >
                    <Pressable onPress={() => handleSelected(item)} >
                      <View className={`h-10 bg-base items-center justify-center w-40 rounded " ${selected === item ? "border-2 border-accent bg-base" : ""}`}
                       style={ theme === 'dark' ? { backgroundColor: "#d4d4d4" } : "" } 
                      >
                        <Text className={selected === item ? "text-accent " : ""}>{item}</Text>

                      </View>


                    </Pressable>



                  </View>
                )
              })}
            </View>
            <View className="absolute bottom-10 flex-row justify-around  w-full h-10 items-center">

              <TouchableOpacity onPress={handlePrevQuestion} disabled={questionId === 0} className={`" h-full justify-center rounded-lg w-20 items-center  " ${questionId === 0 ? "bg-btn" : "text-base border border-accent"}`} >
                <Text className={` ${questionId === 0 ? "text-base" : "text-accent"}`}> previus </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleNextQuestion} disabled={questionId === questions.length - 1} className={`" h-full justify-center rounded-lg w-20 items-center  " ${questionId === questions.length - 1 ? "bg-btn" : "text-base border border-accent"}`}>
                <Text className={` ${questionId === questions.length - 1 ? "text-base" : "text-accent"}`}> Next  </Text>
              </TouchableOpacity>
              <TouchableOpacity className=" h-full justify-center rounded-lg w-20 items-center border border-accent bg-accent" onPress={handleSubmit}>
                <Text className="text-base"> submit </Text>
              </TouchableOpacity>

            </View>

          </View>
        </View>
      )}


    </SafeAreaView>
  );
}