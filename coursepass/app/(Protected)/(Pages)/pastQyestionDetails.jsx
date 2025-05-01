import { View, Text, TouchableOpacity, TextInput, Button, SafeAreaView } from 'react-native'
import React,{useEffect, useState} from 'react'
import ResultPage from '../../../components/resultPage';
import { useLocalSearchParams } from 'expo-router';







export default function Quiz() {
  const {courseID, difficulty, totalQuestions} =useLocalSearchParams()

  const questionBanks = [
    { categories: "personal_data", difficulty: "medium", type: "multiples", correct_answer: "Emmanuel", question: "What is your first name", incorrect_answers: ["Bolu", "Segun", "Olaina"] },
    { categories: "entertainment", difficulty: "simple", type: "multiples", correct_answer: "Wizkid", question: "Who was the first Nigerian artist to win a Grammy", incorrect_answers: ["Burna Boy", "Davido", "Olamide"] },
    { categories: "geography", difficulty: "easy", type: "multiples", correct_answer: "Africa", question: "Which continent is Nigeria located in", incorrect_answers: ["Asia", "Europe", "South America"] },
    { categories: "sports", difficulty: "medium", type: "multiples", correct_answer: "Usain Bolt", question: "Who holds the world record for the 100-meter dash", incorrect_answers: ["Tyson Gay", "Yohan Blake", "Justin Gatlin"] },
    { categories: "history", difficulty: "hard", type: "multiples", correct_answer: "Nelson Mandela", question: "Who was the first black president of South Africa", incorrect_answers: ["Desmond Tutu", "Jacob Zuma", "Thabo Mbeki"] },
    { categories: "science", difficulty: "simple", type: "multiples", correct_answer: "Oxygen", question: "What gas do humans primarily breathe", incorrect_answers: ["Nitrogen", "Carbon Dioxide", "Helium"] },
    { categories: "technology", difficulty: "medium", type: "multiples", correct_answer: "Python", question: "Which programming language was created by Guido van Rossum", incorrect_answers: ["Java", "C++", "Ruby"] },
    { categories: "literature", difficulty: "easy", type: "multiples", correct_answer: "William Shakespeare", question: "Who wrote 'Romeo and Juliet'", incorrect_answers: ["Charles Dickens", "Jane Austen", "Mark Twain"] },
    { categories: "food", difficulty: "simple", type: "multiples", correct_answer: "Sushi", question: "Which dish is traditionally made with raw fish and rice", incorrect_answers: ["Pizza", "Tacos", "Burger"] },
    { categories: "music", difficulty: "medium", type: "multiples", correct_answer: "Beyoncé", question: "Which artist released the album 'Lemonade' in 2016", incorrect_answers: ["Rihanna", "Adele", "Taylor Swift"] },
  ];
  const [selected, setSelected] = useState('');
  const [questions, setQuestions] = useState([]);
  const [questionId, setQuestionId] = useState(0);
  const [allAnswers, setAllAnswers] = useState([]);
  const [result, setResult]= useState(false)
  const [isLength, setIsLength] = useState(false)
  // const [score, setScore]= useState(0)

  const handleQuestionBank = ()=>{
    setQuestions(questionBanks)
    setAllAnswers([...questionBanks[0].incorrect_answers, questionBanks[0].correct_answer].sort(()=>Math.random() -1))
  }
  const handleNextQuestion = () => {
    if (questionId < questions.length - 1) {
      const nextId = questionId + 1;
      setQuestionId(nextId);
      setAllAnswers(
        [...questions[nextId].incorrect_answers, questions[nextId].correct_answer].sort(() => Math.random() - 0.5)
      );

      // setSelected(''); // Reset selected answer for the new question
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
  const handleSelected = (item)=>{
    questions[questionId].userAnswer = item
    setSelected(item)
  
   
    
   
  }
  const handleSubmit =()=>{
    setResult(true)
  }
  useEffect (()=>{
    handleQuestionBank();

  }, [])



 
  
  return (

    <SafeAreaView className="bg-base">
 
 {result ? (
  <View>
    <ResultPage questions={questions}/>
  </View>
):(
  
  <View className="flex-column justify-center gap-20 items-center h-full bg-base">
    <View>
    <Text> course : {courseID} Difficulty: {difficulty}, Total question:{ totalQuestions}</Text>
    </View>
    <View className=" bg-secondary h-[500] mx-5 rounded-lg  ">

  <View className="items-center mx-10 mt-5 mb-20">
  <Text className="text-xl">{questions[questionId]?.question}</Text>

  </View>
   
    <View className="flex-row flex-wrap  gap-10 px-5 w-full">

   
    {allAnswers.map((item, i)=>{
      return(
        <View key={i} >
          <TouchableOpacity onPress={()=> handleSelected(item)} >
            <View className={`h-10 bg-base items-center justify-center w-40 rounded " ${selected === item ? "border-2 border-accent bg-base": ""}`}>
            <Text   className={selected === item ? "text-accent ": ""}>{item}</Text>

            </View>
        

          </TouchableOpacity>

          

        </View>
      )
    })}
</View>
<View className="absolute bottom-10 flex-row justify-around  w-full h-10 items-center">

  <TouchableOpacity onPress={handlePrevQuestion}  disabled={questionId === 0} className={`" h-full justify-center rounded-lg w-20 items-center  " ${questionId === 0?  "bg-btn":"text-base border border-accent"}`} >
     <Text className={` ${questionId === 0 ? "text-base":"text-accent"}`}> previus </Text>
  </TouchableOpacity>
  <TouchableOpacity  onPress={handleNextQuestion} disabled={questionId === questions.length - 1} className={`" h-full justify-center rounded-lg w-20 items-center  " ${questionId === questions.length - 1 ? "bg-btn":"text-base border border-accent"}`}>
     <Text className={` ${questionId === questions.length - 1 ? "text-base":"text-accent"}`}> Next  </Text>
  </TouchableOpacity>
  <TouchableOpacity  className=" h-full justify-center rounded-lg w-20 items-center border border-accent bg-accent" onPress={handleSubmit}>
     <Text className="text-base"> submit </Text>
  </TouchableOpacity>

</View>
  
  </View>
  </View>
)}
    
         
    </SafeAreaView>
  );
}