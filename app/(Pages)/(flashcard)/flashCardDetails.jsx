import { View, Text, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import React, { useState } from 'react';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9; // 80% of screen width
const CARD_MARGIN = 10;

export default function FlashCardDetails() {
  const [isFlipped, setIsFlipped] = useState(true);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
        <View className="h-10 justify-center items-center">
            <Text> physics 101- intro to physics </Text>
        </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + CARD_MARGIN * 2}
        decelerationRate="fast"
        contentContainerStyle={{
          paddingHorizontal: CARD_MARGIN,
          alignItems: 'center',
        }}
      >
        {[1, 2].map((_, index) => (
          <View
            key={index}
            className="bg-base justify-center items-center"
            style={{
              width: CARD_WIDTH,
              marginHorizontal: CARD_MARGIN,
            }}
          >
            <View className="h-[400px] w-full items-center bg-accent rounded-lg border border-accent overflow-hidden">
              <View
                onTouchEnd={handleFlip}
                className="h-full w-full justify-center items-center"
              >
                <Text className="text-lg font-semibold text-white">
                  {isFlipped ? 'Question' : 'Answer'}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
