import { ScrollView, Dimensions, View, Text,  } from 'react-native'
import React from 'react'

const {width} = Dimensions.get('window');

const Onboarding = () => {
  return (
    <ScrollView
    horizontal
    pagingEnabled
    showsHorizontalScrollIndicator={false}
  >
      <View className='flex justify-center items-center'style={{ width }}
>
      <Text >nboarding screen 1 </Text>
    </View>
    <View  className='flex justify-center items-center' style={{ width }}>
      <Text> Onboarding screen 2 </Text>
    </View>
    <View  className='flex justify-center items-center' style={{ width }}>
      <Text> Onboarding screen 3 </Text>
    </View>
    <View  className='flex justify-center items-center' style={{ width }}>
      <Text> Onboarding screen 4 </Text>
    </View>
    </ScrollView>
   
    
  )
}

export default Onboarding