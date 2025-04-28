import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import Title from '../../../components/titles';
import GoBackBtn from '../../../components/goBackButton';
import {MaterialCommunityIcons} from '@expo/vector-icons/';
import { ScrollView } from 'react-native-gesture-handler';


export default function FlashCardList() {
  return (
    <SafeAreaView>
        <View className="h-full bg-secondary2 ">
              <View className="mx-3">
                <GoBackBtn/>
              </View>
            <View className="mx-5 mt-5 ">
                <Text className="text-2xl font-bold">FLASHCARDS </Text>
            </View>
            <View className="mx-5 my-2 bg-base px-3 py-3 rounded-lg  ">
                <View className="mb-3"> 
                  <Text className="text-accent">
                  PHYSICS 102 (Waves and Sound)
                  </Text>
                </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} className="">
                    <View className="flex-row gap-3">

                  
                          <View className="flex-row items-center gap-2 border-[0.3px] w-40 justify-center rounded">
                          <MaterialCommunityIcons name="cards" size={40} color="#7d7c7c" />
                              <View className="gap-3">
                                    <Text>
                                      Waves 
                                    </Text>
                                    <Text>13 cards</Text>
                              </View>
                          
                          </View>
                          <View className="flex-row items-center gap-2 border-[0.3px] w-40 justify-center rounded">
                          <MaterialCommunityIcons name="cards" size={40} color="#7d7c7c" />
                              <View className="gap-3">
                                  <Text>
                                    Waves 
                                  </Text>
                                  <Text>13 cards</Text>
                              </View>
                          
                          </View>
                          <View className="flex-row items-center gap-2 border-[0.3px] w-40 justify-center rounded">
                          <MaterialCommunityIcons name="cards" size={40} color="#7d7c7c" />
                              <View className="gap-3">
                                  <Text>
                                    Waves 
                                  </Text>
                                  <Text>13 cards</Text>
                              </View>
                          
                          </View>
                  </View>
              </ScrollView>
            </View>
            <View className="mx-5 my-2 bg-base px-3 py-3 rounded-lg  ">
                <View className="mb-3"> 
                  <Text className="text-accent">
                 MATHEMATICS 102(MatriX )
                  </Text>
                </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} className="">
                    <View className="flex-row gap-3">

                  
                          <View className="flex-row items-center gap-2 border-[0.3px] w-40 justify-center rounded">
                          <MaterialCommunityIcons name="cards" size={40} color="#7d7c7c" />
                              <View className="gap-3">
                                    <Text>
                                      Waves 
                                    </Text>
                                    <Text>13 cards</Text>
                              </View>
                          
                          </View>
                          <View className="flex-row items-center gap-2 border-[0.3px] w-40 justify-center rounded">
                          <MaterialCommunityIcons name="cards" size={40} color="#7d7c7c" />
                              <View className="gap-3">
                                  <Text>
                                    Waves 
                                  </Text>
                                  <Text>13 cards</Text>
                              </View>
                          
                          </View>
                          <View className="flex-row items-center gap-2 border-[0.3px] w-40 justify-center rounded">
                          <MaterialCommunityIcons name="cards" size={40} color="#7d7c7c" />
                              <View className="gap-3">
                                  <Text>
                                    Waves 
                                  </Text>
                                  <Text>13 cards</Text>
                              </View>
                          
                          </View>
                  </View>
              </ScrollView>
            </View>
            <View className="mx-5 my-2 bg-base px-3 py-3 rounded-lg  ">
                <View className="mb-3"> 
                  <Text className="text-accent">
                 CHEMISTRY 102 (Organic CHEMISTRY)
                  </Text>
                </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} className="">
                    <View className="flex-row gap-3">

                  
                          <View className="flex-row items-center gap-2 border-[0.3px] w-40 justify-center rounded">
                          <MaterialCommunityIcons name="cards" size={40} color="#7d7c7c" />
                              <View className="gap-3">
                                    <Text>
                                      Waves 
                                    </Text>
                                    <Text>13 cards</Text>
                              </View>
                          
                          </View>
                          <View className="flex-row items-center gap-2 border-[0.3px] w-40 justify-center rounded">
                          <MaterialCommunityIcons name="cards" size={40} color="#7d7c7c" />
                              <View className="gap-3">
                                  <Text>
                                    Waves 
                                  </Text>
                                  <Text>13 cards</Text>
                              </View>
                          
                          </View>
                          <View className="flex-row items-center gap-2 border-[0.3px] w-40 justify-center rounded">
                          <MaterialCommunityIcons name="cards" size={40} color="#7d7c7c" />
                              <View className="gap-3">
                                  <Text>
                                    Waves 
                                  </Text>
                                  <Text>13 cards</Text>
                              </View>
                          
                          </View>
                  </View>
              </ScrollView>
            </View>
            <View className="mx-5 my-2 bg-base px-3 py-3 rounded-lg  ">
                <View className="mb-3"> 
                  <Text className="text-accent">
                  MECHATRONICS (Robotics)
                  </Text>
                </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} className="">
                    <View className="flex-row gap-3">

                  
                          <View className="flex-row items-center gap-2 border-[0.3px] w-40 justify-center rounded">
                          <MaterialCommunityIcons name="cards" size={40} color="#7d7c7c" />
                              <View className="gap-3">
                                    <Text>
                                      Waves 
                                    </Text>
                                    <Text>13 cards</Text>
                              </View>
                          
                          </View>
                          <View className="flex-row items-center gap-2 border-[0.3px] w-40 justify-center rounded">
                          <MaterialCommunityIcons name="cards" size={40} color="#7d7c7c" />
                              <View className="gap-3">
                                  <Text>
                                    Waves 
                                  </Text>
                                  <Text>13 cards</Text>
                              </View>
                          
                          </View>
                          <View className="flex-row items-center gap-2 border-[0.3px] w-40 justify-center rounded">
                          <MaterialCommunityIcons name="cards" size={40} color="#7d7c7c" />
                              <View className="gap-3">
                                  <Text>
                                    Waves 
                                  </Text>
                                  <Text>13 cards</Text>
                              </View>
                          
                          </View>
                  </View>
              </ScrollView>
            </View>
        </View>
    </SafeAreaView>
      
    );
  
}