import {View, Text, TouchableOpacity} from 'react-native'
import React from 'react'
import * as Progress from 'react-native-progress';
import {router} from 'expo-router';
import tailwindConfig from "../../tailwind.config";






/**
 * Gamification Component
 *
 * This component displays gamification elements for a user, including:
 * - A daily streak progress bar with a label for the current week.
 * - A placeholder for the most recent course.
 * - A leaderboard showing the top users with their scores.
 *
 * @component
 * @returns {JSX.Element} The rendered Gamification component.
 *
 * @example
 * // Usage
 * import Gamification from './Gamification';
 * 
 * function App() {
 *   return <Gamification />;
 * }
 */
export default function Gamification() {
  const customColors = tailwindConfig.theme.extend.colors;
  const handleSearchCourse = () => {router.push('./addNewCourse')};
  const handleLeaderboard = () => {router.push('./leaderBoard')};
  const leaderboardData = [
    {name: 'Alice', score: 120},
    {name: 'Bob', score: 100},
    {name: 'Charlie', score: 80},
    {name: 'Bob', score: 70},
    {name: 'Charlie', score: 60},
    {name: 'Bob', score: 50},

  ]

  return (
    <View className=""
    
    
    >
      <View className=" flex-row justify-between bg-secondary rounded-xl p-4 mx-2  shadow-lg">
        {/* Section for daily streak and recent course */}
        <View>
          <View className=' bg-base p-2 rounded-lg shadow '>
            <Text className='text-[16px] font-bold text-accent'>🔥 Daily Streak</Text>
            <View className="flex-row items-center mt-2">
              <Progress.Bar
                progress={0.5}
                width={150}
                height={12}
                color={customColors.accent}
                borderRadius={8}
                unfilledColor={customColors.base}
              />
              <Text className="pl-2 text-accent font-medium" > week 1</Text>
            </View>
          </View>
          <View className="mt-4 p-2 bg-accent rounded-lg shadow-md ">
            <Text className='text-lg font-bold text-base'>📖 Recent Course</Text>
            <View className='mt-2 bg-base p-3 rounded-md shadow-md'>
              <Text> No recent courses.</Text>

            </View>
          </View>
          <View
            style={{
              width: 120,
              borderWidth: 1,
              marginTop: 12,
              marginLeft: 2,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
              borderColor: "#007BFF",
              height: 25,

            }}
          >
            <TouchableOpacity
              onPress={handleSearchCourse}
              
            >
             <Text className="text-accent text-center font-semibold" > ➕ Add course</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Section for leaderboard */}

        <View className="items-center">
          <View>
            <Text className="font-bold text-accent">🏆 Leaderboard</Text>
          </View>
          <View>

            {leaderboardData.map((user, index) => (
              <View key={index} className="flex-row justify-between p-1  border-b border-gray-300 ">
                <Text >{index + 1}. {user.name}</Text>
                <Text>{user.score} pts</Text>

              </View>

            ))}
            {/* <Text className='ml-[5]  text-accent border-[1px] rounded h-7 flex justify-center items-center' onPress={handleLeaderboard}>show all </Text> */}
             <TouchableOpacity
            onPress={handleLeaderboard}
            className="mt-4 border border-accent rounded-md h-9 w-[90] flex justify-center items-center"
          >
            <Text className="text-accent">show all</Text>
          </TouchableOpacity>

          </View>

        </View>
      </View>

    </View>
  )
}