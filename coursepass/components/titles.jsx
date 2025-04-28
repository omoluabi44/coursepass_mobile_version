import { View, Text } from 'react-native'
import React from 'react'
// import GoBackBtn from '../../components/goBackButton';
import GoBackBtn from './goBackButton';

export default function Title({title}) {
  return (

      <View className="   mt-20 ">
        <GoBackBtn/>
          <View className="items-center">
              <Text className="text-lg">
               {title}
              </Text>
          </View>
      </View>


  );
}