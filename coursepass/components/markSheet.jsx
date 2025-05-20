import {View, Text, ScrollView, TouchableOpacity} from 'react-native'
import React, {useEffect, useState} from 'react'
import {router} from 'expo-router';
import {useScoreMutation} from '../redox/slice/apiSlice';
export default function ResultPage({questions, userID, courseID}) {

  const [scores, {isSuccess: scoreSuccess, isError: scoreError, error: scoreErrorData}] = useScoreMutation()


  let score = 0
  useEffect(() => {
    if (questions.length > 0) {

      score = questions.filter((q) => q.userAnswer === q.correct_answer).length * 1
      handleScore()
      console.log(score);
      
    }

  }, [])



  const handleScore = async () => {
    try {
      scores({userID, courseID, score})
    } catch (error) {
      console.log(error);

    }
  }


  return (
    <View className="h-full justify-center items-center bg-base">
      <View className="h-10 justify-center ">
        <Text className="text-lg text-accent"> SCORE {score}/ {questions.length}</Text>
      </View>
      <View>
        <TouchableOpacity onPress={() => {router.push("/PastQuestion")}}>
          <Text>Reset</Text>

        </TouchableOpacity>
      </View>


      <ScrollView >
        <View className="gap-5">


          {questions.map((item, i) => {
            return (



              <View key={i} className=" gap-2">
                <View className="items-center mt-5 mb-5   h-[50] justify-center items-center ">
                  <Text className="text-[20px]"> {item.question}</Text>
                </View>


                <View className="h-10 bg-btnCorrect justify-center items-center w-100 rounded mx-5">
                  <Text className="text-base"> Correct answer: {item.correct_answer}</Text>
                </View>
                <View className={item.correct_answer === item.userAnswer ? "bg-btnCorrect" : "bg-btnInCorrect"}
                  style={{height: 40, width: 350, marginHorizontal: 19, justifyContent: "center", alignItems: "center", borderRadius: 5}}
                >
                  <Text className="text-base">Your response {item.userAnswer}</Text>
                </View>
                <View className="bg-btn h-10  justify-center items-center w-100 rounded mx-5">
                  <Text>incorrect options: {"" + item.incorrect_answers + ""}</Text>
                </View>

              </View>

            )

          })}
        </View>

      </ScrollView>

    </View>

  )
}