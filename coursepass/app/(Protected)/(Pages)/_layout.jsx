import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Drawer} from 'expo-router/drawer';
import {MaterialIcons, AntDesign, MaterialCommunityIcons, Entypo} from '@expo/vector-icons';
import {usePathname} from 'expo-router';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {useEffect} from 'react';
import {useGetUserIdQuery} from '../../../redox/slice/apiSlice';
import tailwindConfig from '../../../tailwind.config';
import {View, Text, Image} from 'react-native'
import {useSelector} from 'react-redux';
import {logout} from '../../../redox/actions/loginActionCreator';
import {useDispatch} from 'react-redux';
import { useColorScheme } from 'react-native';



const CustomDrawer = (props) => {
  const theme = useColorScheme();
  const dispatch = useDispatch()
  const customColors = tailwindConfig.theme.extend.colors;
  const pathName = usePathname()
  const {user} = useSelector((state) => state.login);
  const {data, isFetching, isSuccess, error, isError} = useGetUserIdQuery(user.id)
  // if (isFetching) return (
  //   <View className="flex-1 bg-black items-center justify-center">
  //       <Text> refreshing </Text>
  //   </View>
  // )
  // if (isError) return (
  //   <View className="flex-1 bg-black items-center justify-center">
  //       <Text className="text-white"> error</Text>
  //   </View>
    
  // )
  return (
  <View className="h-full"
  style={ theme === 'dark' ? { backgroundColor: "#252231" } : "" }

  >
    <DrawerContentScrollView  {...props}>
      <View className=" bg-secondary rounded items-center mb-3">
        <View className="mb-5 mt-5">


          <Image
            className="w-40 h-40 rounded-full mb-3 "
            source={data?.profile_image ? {uri: data.profile_image} : require('../../../assets/images/profile.png')} />
          <Text>{user.Fname + " " + user.Lname}  </Text>
        </View>



      </View>
      <DrawerItem
        style={{borderRadius: 10, backgroundColor: pathName == "/profile" ? customColors.accent :theme==="dark"? "#252231": customColors.base}}
        labelStyle={{marginLeft: -5, color: pathName == "/profile" ? customColors.base : theme==="dark"? "#d4d4d4": "#000", }}
        icon={() => (<AntDesign name="user" size={26} color={pathName == "/profile" ? "#fff" : theme==="dark"? "#d4d4d4": "#000"} />)}
        label="profile" onPress={() => props.navigation.navigate('profile')}
      />
      <DrawerItem
        style={{borderRadius: 10, backgroundColor: pathName == "/flashCardList" ? customColors.accent : theme==="dark"? "#252231": customColors.base}}
        labelStyle={{marginLeft: -5, color: pathName == "/flashCardList" ? customColors.base : theme==="dark"? "#d4d4d4": "#000"}}
        icon={() => (<MaterialCommunityIcons name="cards" size={26} color={pathName == "/flashCardList" ? "#fff" :  theme==="dark"? "#d4d4d4": "#000"} />)}
        label="Flashcards" onPress={() => props.navigation.navigate('(flashcard)/flashCardList')}
      />
      <DrawerItem
        style={{borderRadius: 10, backgroundColor: pathName == "/assignmentList" ? customColors.accent : theme==="dark"? "#252231":customColors.base}}
        labelStyle={{marginLeft: -5, color: pathName == "/assignmentList" ? customColors.base : theme==="dark"? "#d4d4d4": "#000"}}
        icon={() => (<MaterialIcons name="assignment" size={26} color={pathName == "/assignmentList" ? "#fff" :  theme==="dark"? "#d4d4d4": "#000"} />)}
        label="Assignments" onPress={() => props.navigation.navigate('(assignment)/assignmentList')}
      />
      <DrawerItem
        style={{borderRadius: 10, backgroundColor: pathName == "/leaderBoard" ? customColors.accent :theme==="dark"? "#252231": customColors.base}}
        labelStyle={{marginLeft: -5, color: pathName == "/leaderBoard" ? customColors.base : theme==="dark"? "#d4d4d4":  "#000"}}
        icon={() => (<MaterialIcons name="leaderboard" size={26} color={pathName == "/leaderBoard" ? "#fff" :  theme==="dark"? "#d4d4d4": "#000"} />)}
        label="Leaderboard" onPress={() => props.navigation.navigate('leaderBoard')}
      />
      <DrawerItem
        style={{borderRadius: 10, backgroundColor: pathName == "/addNewCourse" ? customColors.accent : theme==="dark"? "#252231": customColors.base}}
        labelStyle={{marginLeft: -5, color: pathName == "/addNewCourse" ? customColors.base : theme==="dark"? "#d4d4d4": "#000"}}
        icon={() => (<AntDesign name="plus" size={26} color={pathName == "/addNewCourse" ? "#fff" :  theme==="dark"? "#d4d4d4": "#000"} />)}
        label="Add new course" onPress={() => props.navigation.navigate('addNewCourse')}
      />
      {/* <DrawerItem
        style={{borderRadius: 10, backgroundColor: pathName == "/materialsList" ? customColors.accent : theme==="dark"? "#252231": customColors.base}}
        labelStyle={{marginLeft: -5, color: pathName == "/materialsList" ? customColors.base : theme==="dark"? "#d4d4d4": "#000"}}
        icon={() => (<MaterialIcons name="insert-drive-file" size={26} color={pathName == "/materialsList" ? "#fff" :  theme==="dark"? "#d4d4d4": "#000"} />)}
        label="Materials" onPress={() => props.navigation.navigate('(materials)/materialsList')}
      /> */}
      {data?.role === "HOC" ?
        <DrawerItem
          style={{borderRadius: 10, backgroundColor: pathName == "/materialsList" ? customColors.accent : theme==="dark"? "#252231": customColors.base}}
          labelStyle={{marginLeft: -5, color: pathName == "/materialsList" ? customColors.base :  theme==="dark"? "#d4d4d4": "#000"}}
          icon={() => (<MaterialIcons name="insert-drive-file" size={26} color={pathName == "/materialsList" ? "#fff" :  theme==="dark"? "#d4d4d4": "#000"} />)}
          label="Upload assignment" onPress={() => props.navigation.navigate('(assignment)/addAssignment')}
        />

        : 
        ""
        }
      <DrawerItem
        style={{borderRadius: 10, backgroundColor: pathName == "/materialsList" ? customColors.accent : theme==="dark"? "#252231": customColors.base}}
        labelStyle={{marginLeft: -5, color: pathName == "/materialsList" ? customColors.base : theme==="dark"? "#d4d4d4":  "#000"}}
        icon={() => (<Entypo name="line-graph" size={26} color={pathName == "/materialsList" ? "#fff" :  theme==="dark"? "#d4d4d4": "#000"} />)}
        label="Performance" onPress={() => props.navigation.navigate('studentPerfomance')}
      />
    </DrawerContentScrollView>
</View>
  )

}
export default function Layout() {

  return (
    
    <GestureHandlerRootView style={{flex: 1}}>
      <Drawer drawerContent={(props) => <CustomDrawer {...props} />} screenOptions={{headerShown: false}} />
    </GestureHandlerRootView>
  );
}
