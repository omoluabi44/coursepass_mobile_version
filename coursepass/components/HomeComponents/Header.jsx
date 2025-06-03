import { View, Text, Image, Pressable, SafeAreaView } from 'react-native';
import React from 'react';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useGetUserIdQuery } from '../../redox/slice/apiSlice';
import { useColorScheme } from 'react-native';

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};

export default function Header() {
  const { user } = useSelector((state) => state.login);
  const { data, isSuccess } = useGetUserIdQuery(user.id);
  const navigation = useNavigation();
  const theme = useColorScheme();
  const isDark = theme === 'dark';

  return (
    <SafeAreaView 
    className="bg-base"
    style={{ backgroundColor: isDark ? '#252231' : "" }}>
      <View className="flex-row items-center justify-between px-4 py-3" style={{ backgroundColor: isDark ? '#252231' : '' }}>
        
        {/* Left: Drawer Toggle */}
        <DrawerToggleButton tintColor={isDark ? 'white' : 'black'} />

        {/* Center: Greeting and Logo */}
        <View className="flex-1 flex-row items-center ml-4">
          <Image
            source={require('../../assets/images/logo1.png')}
            className="rounded-full mr-2"
            style={{ width: 30, height: 30 }}
          />
          <Text style={{ color: isDark ? 'white' : 'black', fontSize: 12 }}>
            {getGreeting()}, {user?.Fname || 'User'} 👋
          </Text>
        </View>

        {/* Right: Profile */}
        <Pressable onPress={() => navigation.navigate('profile')}>
          <Image
            source={
              isSuccess && data?.profile_image
                ? { uri: data.profile_image }
                : require('../../assets/images/profile.png')
            }
            style={{ width: 40, height: 40, borderRadius: 20 }}
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
