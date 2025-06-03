
import * as Progress from 'react-native-progress';
import {View, Text, RefreshControl, ScrollView, TouchableOpacity, ImageBackground} from 'react-native'
import React, {useCallback, useState} from 'react'
// import {View, Text, ScrollView, TouchableOpacity, ImageBackground} from 'react-native';
import {FontAwesome5, MaterialIcons, Evillcons} from '@expo/vector-icons';
import {ProgressBar} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {useGetPointQuery} from '../../redox/slice/apiSlice';
import { useColorScheme } from 'react-native';


const StreakCard = () => {

const theme = useColorScheme();
  const [loading, setLoading] = useState(true);
  const {user} = useSelector((state) => state.login);
  const userID = user.id
  const {data, isLoading, isError, isSuccess, refetch} = useGetPointQuery(userID)
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch()
      .finally(() => {
        setRefreshing(false);
      });
  }, []);
  // Declare variables with default values
  let milestones = [7, 30, 90, 365, 730];
  let currentStreak = 0;
  let nextMilestone = 0;
  let previousMilestone = 0;
  let progress = 0;
  let nextMilestoneLabel = '';

  if (isSuccess && data) {
    currentStreak = data.streak_day;
    nextMilestone = milestones.find(m => m > currentStreak) || milestones[milestones.length - 1];

    for (let i = milestones.length - 1; i >= 0; i--) {
      if (milestones[i] <= currentStreak) {
        previousMilestone = milestones[i];
        break;
      }
    }

    progress = (currentStreak - previousMilestone) / (nextMilestone - previousMilestone);

    nextMilestoneLabel = nextMilestone >= 365
      ? `${Math.floor(nextMilestone / 365)} Year${nextMilestone / 365 > 1 ? 's' : ''}`
      : `${nextMilestone} Day${nextMilestone > 1 ? 's' : ''}`;
  }










  // const timeline = data.timeline.map(({ date, status }) => {
  //   const d = new Date(date);
  //   const dayName = d.toLocaleDateString('en-US', { weekday: 'short' }); // Mon, Tue, etc.
  //   const dayCount = d.getDate(); // 1-31
  //   console.log(dayCount);

  //   // Map backend status to UI status classes
  //   let uiStatus = 'future';
  //   if (status === 'completed') uiStatus = 'past';
  //   else if (status === 'today') uiStatus = 'today';
  //   else if (status === 'missed') uiStatus = 'missed';

  //   return { day: dayName, count: dayCount, status: uiStatus };
  // });

  // Calculate progress bar percentage
  // Example: daily goal = 20 XP, earned = streakData.today_xp
  // const dailyGoal = 20;
  // const progress = Math.min(streakData.today_xp / dailyGoal, 1);

  return (
  



      <View className="bg-secondary justify-between rounded-2xl mx-2 mt-2"
        style={ theme === 'dark' ? { backgroundColor: "#252231" } : "" }
      
      >
          <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['#10B981']} // Android indicator color
          tintColor="#10B981"  // iOS indicator color
          scrollEnabled={false}
        />
      }
    >

        <View className="bg-accent  p-4 rounded-2xl w-full  ">
          {/* Header */}
          <View className="flex-row justify-between items-center mb-2">
            {data && data.streak_day ?
              <View className="flex-row items-center">
                <FontAwesome5 name="fire" size={28} color="#FF6D00" />
                <Text className="ml-2 text-xl font-bold text-white  "
                style={ theme === 'dark' ? { color: "black" } :"" }

                >{data.streak_day}</Text>
              </View> :
              <View className="flex-row items-center">
                <FontAwesome5 name="fire" size={28} color="#FF6D00" />
                <Text className="ml-2 text-xl font-bold text-base"
                style={ theme === 'dark' ? { color: "black" } :"" }
                >Null</Text>
              </View>
            }

            <TouchableOpacity className="bg-base px-3 py-1 rounded-xl"
        style={ theme === 'dark' ? { backgroundColor: "#252231" } : "" }

            >
              <Text className="text-accent dark:text-black text-sm font-semibold"
            style={ theme === 'dark' ? {color: "#d4d4d4",  backgroundColor: "#252231" } : "" }


              
              >Freeze</Text>
            </TouchableOpacity>
          </View>


          {data && data.milestone && (
            <View className="bg-white rounded-xl px-3 py-1 mb-3 flex-row items-center self-start">
              <MaterialIcons name="emoji-events" size={16} color="#F59E0B" />
              <Text className="ml-1 text-yellow-700 text-sm font-semibold">
                {data.milestone}
              </Text>
            </View>
          )}

          {isSuccess ?
            <View>
              <Text className="text-sm text-base font-semibold mb-1"
              style={ theme === 'dark' ? { color: "black" } :"" }
              >Next Goal: {nextMilestoneLabel}</Text>
              <ProgressBar
                progress={progress}
                color="#10B981"


                style={{height: 8, borderRadius: 10, backgroundColor: "white"}}
              />


            </View>
            : <View>
              <Text className="text-sm text-base font-semibold mb-1"
              style={ theme === 'dark' ? { color: "d4d4d4" } : "" }

              >Next Goal: Null</Text>
              <ProgressBar
                progress={0}
                color="#10B981"


                style={{height: 8, borderRadius: 10, backgroundColor: "white"}}
              />


            </View>
          }


        </View>
        <View className="mt-4 flex-row rounded-2xl bg-white shadow-md overflow-hidden"
        style={ theme === 'dark' ? { backgroundColor: "#252231" } : "" }

        >
          {/* Rank Section */}
          <View className="w-[50%] bg-accent flex-row px-4 py-3 rounded-2xl">
            {/* Left side: Rank Icon and Label */}
            <View className="flex-1 justify-center items-center border-r border-white pr-2"
            style={ theme === 'dark' ? { borderRightColor: "#252231" } : "" }

            >
              <Text className="text-white text-2xl font-medium"
              style={ theme === 'dark' ? { color: "black" } :"" }
              >Rank</Text>
             {data && data.point ? <Text className="text-white text-xl font-bold mt-1"
             style={ theme === 'dark' ? { color: "black" } :"" }
             
             >🏆{data.rank}</Text> :
                <Text className="text-white text-xl font-bold mt-1"
                style={ theme === 'dark' ? { color: "black" } :"" }
                >Null</Text>
              }
            </View>

            {/* Right side: Rank with # */}
            <View className="flex-1 justify-center items-center pl-2">
              <Text className="text-white text-2xl font-medium"
              style={ theme === 'dark' ? { color: "black" } :"" }
              
              >Points</Text>
              {data && data.point ? <Text className="text-white text-xl font-bold mt-1"
              style={ theme === 'dark' ? { color: "black" } :"" }
              >⭐️{data.point}</Text> :
                <Text className="text-white text-xl font-bold mt-1"
                style={ theme === 'dark' ? { color: "black" } :"" }
                >Null</Text>
              }

            </View>
          </View>


          {/* Recent Course Section */}
          <View className="w-[55%] px-3 py-3 justify-center">
            <TouchableOpacity className=" bg-accent/5 p-3"
            style={ theme === 'dark' ? { color: "black" } :"" }
            >
              <Text className="text-accent font-semibold text-sm mb-1">📘 PHY101</Text>
              <Text className="text-gray-800 text-sm" 
              style={ theme === 'dark' ? { color: "#d4d4d4" } : "" }

              >Physics I</Text>
              <Text className="text-gray-500 text-xs mt-1"
              style={ theme === 'dark' ? { color: "#d4d4d4" } : "" }

              >Last studied: 2 days ago</Text>
            </TouchableOpacity>
          </View>
        </View>
</ScrollView>
      </View>

      );
};

      export default StreakCard;


