import { Dimensions, View, Text, Image, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import React, { useState, useRef } from 'react';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

const OnboardingData = [
  {
    title: "Unlock Your Academic Success",
    description: "Dive into a rich repository of course notes",
    image: require('../../assets/images/learning.webp'),
  },
  {
    title: "Learn from the Past",
    description: "Gain access to real past exam questions and test",
    image: require('../../assets/images/quize.webp'),
  },
  {
    title: "Learn Smarter with AI",
    description: "Get personalized study assistance with AI-powered learning.",
    image: require('../../assets/images/quize.webp'),
  },
  {
    title: "Your Learning, Your Rewards!",
    description: "Engage with course materials, complete challenges.",
    image: require('../../assets/images/gami.webp')
  }
];

const Slide = ({item}) => {
  return (
    <View className='items-center' style={{width}}>
      <Image
        style={{height:'75%', width: width, resizeMode: 'contain'}}
        source={item.image}
      />
      <Text className='text-secondary text-lg font-bold mt-4'>
        {item.title}
      </Text>
      <Text className='text-center text-gray-600 px-8 mt-2' style={{maxWidth:'80%', fontSize:15}}>
        {item.description}
      </Text>
    </View>
  );
};

const Onboarding = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const flatListRef = useRef(null);

  const handleScroll = (event) => {
    const page = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentPage(page);
  };

  const goToNextPage = () => {
    if (currentPage < OnboardingData.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentPage + 1,
        animated: true
      });
    }
  };

  const skipToEnd = () => {
    flatListRef.current?.scrollToIndex({
      index: OnboardingData.length - 1,
      animated: true
    });
  };

  const handleGetStarted = () => {
    // Handle navigation to main app
    router.push('/SignUp')
    console.log("Get Started pressed");
  };

  const renderButtons = () => {
    const isLastPage = currentPage === OnboardingData.length - 1;
    
    return (
      <View className="flex-row justify-between px-6">
        {/* Skip Button - Only shown when NOT on last page */}
        {!isLastPage && (
          <TouchableOpacity
            onPress={skipToEnd}
            className="py-3 px-6 border border-base rounded-full"
          >
            <Text className="text-base font-semibold">Skip</Text>
          </TouchableOpacity>
        )}

        {/* Spacer - Only shown when NOT on last page */}
        {!isLastPage && <View className="flex-1" />}

        {/* Next/Get Started Button */}
        <TouchableOpacity
          onPress={isLastPage ? handleGetStarted : goToNextPage}
          className={`py-3 px-8 rounded-full ${
            isLastPage ? "bg-secondary flex-1" : "bg-base"
          }`}
        >
          <Text className="text-accent font-semibold text-center">
            {isLastPage ? "Get Started" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-accent">
      <FlatList
        ref={flatListRef}
        pagingEnabled
        data={OnboardingData}
        contentContainerStyle={{height: height * 0.75}}
        showsHorizontalScrollIndicator={false}
        horizontal
        onMomentumScrollEnd={handleScroll}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item}) => <Slide item={item} />}
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index
        })}
      />

      {/* Pagination Indicators */}
      <View className="flex-row justify-center mb-6">
        {OnboardingData.map((_, index) => (
          <View
            key={index}
            className={`w-2.5 h-2.5 rounded-full mx-1 ${
              currentPage === index ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          />
        ))}
      </View>

      {/* Buttons Container */}
      <View className="mb-8">
        {renderButtons()}
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;