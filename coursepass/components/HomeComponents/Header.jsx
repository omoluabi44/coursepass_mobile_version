import { View, Text, Image, StatusBar, SafeAreaView } from 'react-native';
import React from 'react';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { useSelector } from 'react-redux';

export default function Header() {
  const { user } = useSelector((state) => state.login);

  return (
    <SafeAreaView className="bg-white">
      <View className="bg-base">
        <View>
          <View className="ml-3 mt-2">
            <Text>hello {user.Fname}👋</Text>
          </View>
        </View>
    
        <View className="flex-row justify-between h-[70px]">
          <View className="flex-row">
            <View>
              <DrawerToggleButton />
            </View>
          </View>
          <View className="items-center mx-2">
            <View className="pr-3 flex-row">
              <View>
                <Image
                  className="w-10 h-10 rounded-full"
                  source={require('../../assets/images/profile.jpg')}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}