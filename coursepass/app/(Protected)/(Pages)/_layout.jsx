import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { MaterialIcons, AntDesign,MaterialCommunityIcons  } from '@expo/vector-icons';
import { usePathname } from 'expo-router';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useEffect } from 'react';
import { useGetUserIdQuery } from '../../../redox/slice/apiSlice';
import tailwindConfig from '../../../tailwind.config';
import { View, Text,Image } from 'react-native'
import { useSelector } from 'react-redux';
import { logout } from '../../../redox/actions/loginActionCreator';
import { useDispatch } from 'react-redux';




const CustomDrawer = (props)=>{
  const dispatch = useDispatch()
  const customColors = tailwindConfig.theme.extend.colors;
  const pathName = usePathname()
  const {user} = useSelector((state) => state.login);
  const {data, isFetching, isSuccess, error, isError} = useGetUserIdQuery(user.id)
  if (isFetching)return(
    <Text> fetching</Text>
  )
  if (isError)return(
    <Text> error</Text>
  )


  
console.log(data.role);

    
  
 

  return(
    <DrawerContentScrollView  {...props}>
      <View className=" bg-secondary rounded items-center mb-3">
       <View className="mb-5 mt-5">

      
        <Image 
        className="w-40 h-40 rounded-full mb-3 "
        source ={require('../../../assets/images/profile.jpg')}/>
        <Text>{user.Fname +" "+ user.Lname}  </Text>
        </View>
       
    
       
      </View>
        <DrawerItem 
            style={{borderRadius:10, backgroundColor:pathName=="/profile"? customColors.accent:customColors.base}} 
            labelStyle={{marginLeft: -5, color:pathName=="/profile"? customColors.base:"#000", }}
            icon={()=>(<AntDesign name="user" size={26} color={pathName =="/profile"? "#fff":"#000"} />)} 
            label="profile"  onPress={() => props.navigation.navigate('profile')}
         />
        <DrawerItem 
          style={{borderRadius:10, backgroundColor: pathName=="/flashCardList"? customColors.accent:customColors.base}}
          labelStyle={{marginLeft: -5, color:pathName=="/flashCardList"? customColors.base:"#000"}} 
          icon={()=>(<MaterialCommunityIcons name="cards" size={26} color={pathName =="/flashCardList"? "#fff":"#000"} />)}
          label="Flashcards" onPress={() => props.navigation.navigate('(flashcard)/flashCardList')}
        />
        <DrawerItem 
                style={{ borderRadius:10, backgroundColor: pathName=="/assignmentList"? customColors.accent:customColors.base}} 
                labelStyle={{marginLeft: -5, color:pathName=="/assignmentList"? customColors.base:"#000"}}  
                icon={()=>(<MaterialIcons name="assignment" size={26} color={pathName =="/assignmentList"? "#fff":"#000"} />)} 
                label="Assignments"  onPress={() => props.navigation.navigate('(assignment)/assignmentList')}
          />
        <DrawerItem  
            style={{borderRadius:10, backgroundColor: pathName=="/leaderBoard"? customColors.accent:customColors.base}} 
            labelStyle={{marginLeft: -5, color:pathName=="/leaderBoard"? customColors.base:"#000"}} 
            icon={()=>(<MaterialIcons name="leaderboard" size={26} color={pathName =="/leaderBoard"? "#fff":"#000"} />)}
            label="Leaderboard"  onPress={() => props.navigation.navigate('leaderBoard')}
         />
        <DrawerItem  
            style={{ borderRadius:10, backgroundColor: pathName=="/addNewCourse"? customColors.accent:customColors.base}}
            labelStyle={{marginLeft: -5, color:pathName=="/addNewCourse"? customColors.base:"#000"}} 
            icon={()=>(<AntDesign name="plus" size={26} color={pathName =="/addNewCourse"? "#fff":"#000"} />)}
            label="Add new course"  onPress={() => props.navigation.navigate('addNewCourse')}
        />
        <DrawerItem
            style={{borderRadius:10, backgroundColor: pathName=="/materialsList"? customColors.accent:customColors.base}} 
            labelStyle={{marginLeft: -5, color:pathName=="/materialsList"? customColors.base:"#000"}} 
            icon={()=>(<MaterialIcons name="insert-drive-file" size={26} color={pathName =="/materialsList"? "#fff":"#000"} />)} 
            label="Materials"  onPress={() => props.navigation.navigate('(materials)/materialsList')}
        />
{ data.role === "HOC" ?
 <DrawerItem
            style={{borderRadius:10, backgroundColor: pathName=="/materialsList"? customColors.accent:customColors.base}} 
            labelStyle={{marginLeft: -5, color:pathName=="/materialsList"? customColors.base:"#000"}} 
            icon={()=>(<MaterialIcons name="insert-drive-file" size={26} color={pathName =="/materialsList"? "#fff":"#000"} />)} 
            label="Upload assignment"  onPress={() => props.navigation.navigate('(assignment)/addAssignment')}
        />

:null}
        
    </DrawerContentScrollView>

  )

}
export default function Layout() {
  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer drawerContent={(props) => <CustomDrawer {...props}/>} screenOptions={{headerShown: false}}/>
    </GestureHandlerRootView>
  );
}
