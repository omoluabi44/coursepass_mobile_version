import {View, Text, ScrollView, TouchableOpacity, SafeAreaView} from 'react-native'
import React, {useEffect, useState} from 'react'
import {router} from 'expo-router';
import {useScoreMutation} from '../redox/slice/apiSlice';
import * as Progress from 'react-native-progress';
import {useColorScheme} from 'react-native';
export default function ResultPage({questions, userID, courseID}) {

  const [scores, {isSuccess: scoreSuccess, isError: scoreError, error: scoreErrorData}] = useScoreMutation()
  const [Score, setScore] = useState(0)
  const [progress, setProgress] = React.useState(0);
  const theme = useColorScheme();


  let score = 0
  useEffect(() => {
    if (questions.length > 0) {

      score = questions.filter((q) => q.userAnswer === q.correct_answer).length * 1
      setProgress(score / questions.length)
      setScore(score)
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

    <View className="h-full items-center  justify-center">
      <Text className="text-center text-4xl "
        style={theme === 'dark' ? {color: "#d4d4d4"} : "white"}
      >Mark sheet : {courseID}</Text>
      <View className="w-full">
        <View
          style={{height: 200, ...(theme === "dark" ? {backgroundColor: "#252231", borderColor: "#d4d4d4"} : {})}}
          className="bg-base mx-5 mt-2 rounded-lg   border-accent border   p-4"


        >

          <Text className="text-lg text-accent text-center"
            style={theme === 'dark' ? {color: "#d4d4d4"} : ""}

          > SCORE {Score}/ {questions.length}</Text>


          <View className="flex-1 items-center justify-center">
            <Progress.Circle
              progress={progress}
              size={100}
              thickness={5}
              showsText={true}
              color={theme === "dark" ? "#d4d4d4" : "#007BFF"}
              textStyle={{
                fontSize: 30,
                fontWeight: 'bold',
              }}
              formatText={() => `${Math.round(progress * 100)}%`}
            />
          </View>


        </View>
      </View>



      <View className="w-20 mt-5 items-center ">
        <TouchableOpacity onPress={() => {router.push("/PastQuestion")}} className='bg-accent  p-3 rounded-2xl mb-3' >
          <Text className="text-base" style={theme === 'dark' ? {color: "#d4d4d4"} : ""}>Reset</Text>
        </TouchableOpacity>
      </View>



      <ScrollView >
        <View className="gap-5">


          {questions.map((item, i) => {
            return (



              <View key={i} className="bg-white rounded-xl p-4 mx-4 mb-6"
                style={theme === 'dark' ? {backgroundColor: "#252231"} : ""}
              >

                <View className="mb-4">
                  <Text className="text-lg font-semibold text-gray-800 text-center"

                    style={theme === 'dark' ? {color: "#d4d4d4"} : ""}

                  >
                    Q{i + 1}: {item.questionText}
                  </Text>
                </View>

                <View className="bg-green-100 px-3 py-2 rounded-lg mb-2">
                  <Text className="text-green-800 font-medium">
                    ✅ Correct Answer: <Text className="font-semibold">{item.correct_answer}</Text>
                  </Text>
                </View>

                <View
                  className={`px-3 py-2 rounded-lg mb-2 ${item.correct_answer === item.userAnswer ? 'bg-green-50' : 'bg-red-100'
                    }`}
                >
                  <Text className={`font-medium ${item.correct_answer === item.userAnswer ? 'text-green-700' : 'text-red'}`}>
                    📝 Your Answer: <Text className="font-semibold">{item.userAnswer || 'Not Answered'}</Text>
                  </Text>
                </View>


                <View className="bg-blue-50 px-3 py-2 rounded-lg">
                  <Text className="text-blue-700 font-medium">
                    ❌ Incorrect Options: <Text className="font-semibold">{item.incorrect_answers.join(', ')}</Text>
                  </Text>
                </View>
              </View>


            )

          })}
        </View>

      </ScrollView>

    </View>

    //  <SafeAreaView className="bg-white">
    //   <View className="h-full">
    //     <View
    //       style={{height: 300}}
    //       className="bg-accent mx-2 mt-2 rounded-lg shadow-md p-4"
    //     >

    //       <Text className="text-white font-bold text-2xl mb-4 text-center">
    //         YOUR OVERALL SCORE
    //       </Text>


    //       <View className="flex-1 items-center justify-center">
    //         <Progress.Circle
    //           progress={progress}
    //           size={150}
    //           thickness={10}
    //           showsText={true}
    //           color="white"
    //           textStyle={{
    //             fontSize: 30,
    //             fontWeight: 'bold',
    //           }}
    //           formatText={() => `${Math.round(progress * 100)}%`}
    //         />
    //       </View>

    //     </View>
    //     <View>
    //       <Text className="text-black text-center text-xl  font-bold mt-4 mx-5 ">
    //         COURSES AND AVARAGE SCORES
    //       </Text>
    //     </View>
    //     <ScrollView className=" ">
    //        <View className="flex-row items-center justify-between px-4 py-2 mx-2 border border-black mt-5 rounded-lg bg-white">
    //     <View className="w-20 h-20">
    //       {/* <Image
    //         // source={require('../../../assets/images/gami.webp')}
    //         className="w-full h-full rounded-lg"
    //         resizeMode="cover"
    //       /> */}
    //     </View>

    //     <View className="flex-1 ml-4">
    //       <Text className="text-2xl font-semibold">PHY101</Text>
    //       <Text className="text-gray-500 text-lg">Score: 89%</Text>
    //     </View>

    //     <View className="pl-2 ">
    //       <TouchableOpacity>
    //         {/* <AntDesign name="caretright" size={30} color="blue" /> */}
    //       </TouchableOpacity>

    //     </View>
    //   </View>

    //     </ScrollView>
    //   </View>


    // </SafeAreaView>

  )
}