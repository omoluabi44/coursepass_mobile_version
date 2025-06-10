// // import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native'
// // import React from 'react'
// // import Title from '../../../components/titles';
// // import AntDesign from '@expo/vector-icons/AntDesign';
// // export default function Leaderboard() {
// //   return (
// //     <SafeAreaView className="bg-black">


// //       {/* <View className="h-full  ">
// //         <View className="absolute top">
// //            <TouchableOpacity onPress={() => router.push("./")}>
// //                     <AntDesign name="left" size={24} color="black" />
// //                   </TouchableOpacity>
// //         </View>
// //         <View className="items-center mt-10">
// //           <Text className="text-white font-bold text-3xl "> LEADERBOARD 🏆</Text>
// //         </View>
// //         <View>

// //         </View>

// //       </View> */}

// //     </SafeAreaView>
// //   );
// // }

// import { View, Text, FlatList, Image, SafeAreaView } from 'react-native';
// import React from 'react';
// import {StatusBar} from 'expo-status-bar';
// import {useSelector} from 'react-redux';
// import { useGetRankQuery } from '../../../redox/slice/apiSlice';

// const users = [
//   {
//     id: '1',
//     name: 'Kameron Porter',
//     progress: 100,
//     avatar: require('../../../assets/images/gami.webp'), // your avatar
//     isTop: true,
//   },
//   {
//     id: '2',
//     name: 'Michael Kopfler',
//     progress: 75,
//     avatar:require('../../../assets/images/gami.webp'),
//   },
//   {
//     id: '3',
//     name: 'Alice Koller',
//     progress: 73,
//     avatar: require('../../../assets/images/gami.webp'),
//   },
//   {
//     id: '4',
//     name: 'Peter Dinklage',
//     progress: 69,
//     avatar: require('../../../assets/images/gami.webp'),
//   },
//   // Add more users...
// ];

// export default function LeaderboardScreen() {
//   const {user} = useSelector((state) => state.login);
//   const userID = user.id
//   const {data, isSuccess} = useGetRankQuery(userID)
//   if (isSuccess){
//     console.log(data);

//   }


//    const topUser = data.find((u) => u.position === 1);
//   const otherUsers = data
//     .filter((u) => u.position !== 1)
//     .sort((a, b) => a.position - b.position);

//   return (
//     <SafeAreaView className="h-full bg-gray-200">
//       <StatusBar barStyle="light-content "/>


//     <View >
//       {/* Top User */}
//       <View style={{ alignItems: 'center', marginBottom: 20 }}>
//         <Image
//             source={data && data.profile_image ? {uri: item.profile_url} : require('../../../assets/images/profile.png')}
//           style={{
//             width: 100,
//             height: 100,
//             borderRadius: 50,
//             marginBottom: 10,
//           }}
//         />
//         <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>
//           🏆 {topUser?.username}
//         </Text>
//         <Text
//           style={{
//             backgroundColor: '#CFFFD2',
//             paddingHorizontal: 15,
//             paddingVertical: 5,
//             borderRadius: 20,
//             marginTop: 6,
//             fontSize: 14,
//           }}
//         >
//           {topUser.username}% completed
//         </Text>
//       </View>

//       {/* Other Users */}
//       <FlatList
//         data={otherUsers}
//         keyExtractor={(item) => `${item.position}`}
//         renderItem={({ item, index }) => (
//           <View
//             style={{
//               backgroundColor: index === 0 ? '#F4F2FF' : '#1A1A1A',
//               padding: 15,
//               marginHorizontal: 20,
//               marginVertical: 6,
//               borderRadius: 15,
//               flexDirection: 'row',
//               alignItems: 'center',
//             }}
//           >
//             <Image

//               source={data && data.profile_image ? {uri: item.profile_url} : require('../../../assets/images/profile.png')}
//               style={{ width: 40, height: 40, borderRadius: 20, marginRight: 15 }}
//             />
//             <View style={{ flex: 1 }}>
//               <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
//                 {item.username}
//               </Text>
//               <Text style={{ color: '#aaa', fontSize: 12 }}>
//                 {item.point}% completed
//               </Text>
//             </View>
//             <View
//               style={{
//                 backgroundColor: '#fff',
//                 paddingHorizontal: 10,
//                 paddingVertical: 4,
//                 borderRadius: 20,
//               }}
//             >
//               <Text style={{ fontWeight: 'bold' }}>{index + 2}</Text>
//             </View>
//           </View>
//         )}
//       />
//     </View>
//         </SafeAreaView>
//   );
// }

import {View, Text, FlatList, Image, SafeAreaView, TouchableOpacity} from 'react-native';
import React from 'react';
import {StatusBar} from 'expo-status-bar';
import {useSelector} from 'react-redux';
import {useGetRankQuery} from '../../../redox/slice/apiSlice';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';
import Error from '../../../components/error';
import LoadingComponent from '../../../components/HomeComponents/loading';

export default function LeaderboardScreen() {
  const {user} = useSelector((state) => state.login);
  const userID = user.id;
  const {data = [], isSuccess, isFetching} = useGetRankQuery(userID);
  if(isFetching){
     return(
     <LoadingComponent component="LEADERBOARD"/>
     )
   }
  if (!isSuccess ) return (
    <Error component="LEADERBOARD"/>
  ); 

  const topUser = data.find((u) => u.position === 1);
  const otherUsers = data
    .filter((u) => u.position !== 1)
    .sort((a, b) => a.position - b.position);

  return (
    <SafeAreaView className="h-full bg-black mt-10">

      <StatusBar barStyle="light-content" />
      <View className="absolute top-10">
        <TouchableOpacity onPress={() => router.push("./")}>
          <AntDesign name="left" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View className="items-center mt-10">
         <Text className="text-white font-bold text-3xl "> LEADERBOARD 🏆</Text>
       </View>

      <View style={{alignItems: 'center', marginVertical: 30}}>
        <Image
          source={
            topUser?.profile_url
              ? {uri: topUser.profile_url}
              : require('../../../assets/images/profile.png')
          }
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            marginBottom: 10,
          }}
        />
        <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}}>
          🏆 {topUser?.username}
        </Text>
        <Text
          style={{
            backgroundColor: '#CFFFD2',
            paddingHorizontal: 15,
            paddingVertical: 5,
            borderRadius: 20,
            marginTop: 6,
            fontSize: 14,
          }}
        >
         ⭐️ {topUser?.point} points
        </Text>
      </View>

      <FlatList
        data={otherUsers}
        keyExtractor={(item) => `${item.position}`}
        renderItem={({item, index}) => (
          <View
            style={{
              backgroundColor: index === 0 ? '#F4F2FF' : '#1A1A1A',
              padding: 15,
              marginHorizontal: 20,
              marginVertical: 6,
              borderRadius: 15,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Image
              source={
                item.profile_url
                  ? {uri: item.profile_url}
                  : require('../../../assets/images/profile.png')
              }
              style={{width: 40, height: 40, borderRadius: 20, marginRight: 15}}
            />
            <View style={{flex: 1}}>
              <Text style={{color: 'blue', fontWeight: 'bold', fontSize: 16}}>
                {item.username}
              </Text>
              <Text style={{color: '#aaa', fontSize: 12}}>
               ⭐️ {item.point} points
              </Text>
            </View>
            <View
              style={{
                backgroundColor: '#fff',
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderRadius: 20,
              }}
            >
              <Text style={{fontWeight: 'bold'}}>{item.position}</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

