import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons/';
import React from 'react'
import GoBackBtn from '../../../../components/goBackButton';

export default function Assignments() {
  return (

      <SafeAreaView >
        <View className="h-full bg-secondary2 ">
          <View className="mx-3">
            <GoBackBtn/>
          </View>
          <View className="mx-5 mt-5">
            <Text className="text-2xl font-bold"> ASSIGNMENTS </Text>
          </View>
          <ScrollView>
          <View className="mx-5 my-2 bg-base px-3 py-3 rounded-lg  ">
                <View className="mb-3 flex-row justify-between"> 
                  <Text className="text-accent text-[12px]">
                  PHYSICS 102 (Waves and Sound)
                  </Text>
                  <View className="bg-bgr h-[20] justify-center rounded-2xl" >
                  <Text className="text-xs text-accent"> 2 assignments </Text>
                  </View>
                 
                </View>
              <ScrollView vertical showsHorizontalScrollIndicator={false} className="">
                    <View className="flex-row gap-3 my-2">

                  
                          <View className=" h-full  border-[0.3px] w-full px-2 py-2 rounded">
                          
                              <View className=" mb-5">
                                <ScrollView>
                                <Text>
                                      what is wave, give two example of waves 
                                     
                                    </Text>
                                </ScrollView>
                                    
                                </View>
                              <View className=" flex-row  justify-between ">
                              <Text>Due: April 20, 2025</Text>
                              <View className="bg-[#fcecc5] h-[20]  rounded-2xl px-2 ">
                              <Text className="text-[#ffbc1f]">Pending</Text>

                              </View>
                               
                               
                              </View>
                          
                          </View>
                          
                          
                          
                  </View>
          
                    <View className="flex-row gap-3 my-2">
                          <View className=" h-full  border-[0.3px] w-full px-2 py-2 rounded">
                          
                              <View className=" mb-5">
                                <ScrollView>
                                <Text>
                                      what is wave, give two example of waves 
                                     
                                    </Text>
                                </ScrollView>
                                    
                                </View>
                              <View className=" flex-row  justify-between ">
                              <Text>Due: April 20, 2025</Text>
                              <View className="bg-BgRed h-[20]  rounded-2xl px-2 ">
                              <Text className="text-red">expired</Text>

                              </View>
                              </View>
                          
                          </View>        
                  </View>
                  <View className="flex-row gap-3 my-2">
                          <View className=" h-full  border-[0.3px] w-full px-2 py-2 rounded">
                          
                              <View className=" mb-5">
                                <ScrollView>
                                <Text>
                                      what is wave, give two example of waves 
                                     
                                    </Text>
                                </ScrollView>
                                    
                                </View>
                              <View className=" flex-row  justify-between ">
                              <Text>Due: April 20, 2025</Text>
                              <View className="bg-BgGreen h-[20]  rounded-2xl px-2 ">
                              <Text className="text-green">submitted</Text>

                              </View>
                              </View>
                          
                          </View>        
                  </View>
              </ScrollView>
              
          </View>
          <View className="mx-5 my-2 bg-base px-3 py-3 rounded-lg  ">
                <View className="mb-3 flex-row justify-between"> 
                  <Text className="text-accent text-[12px]">
                  PHYSICS 102 (Waves and Sound)
                  </Text>
                  <View className="bg-bgr h-[20] justify-center rounded-2xl" >
                  <Text className="text-xs text-accent"> 2 assignments </Text>
                  </View>
                 
                </View>
              <ScrollView vertical showsHorizontalScrollIndicator={false} className="">
                    <View className="flex-row gap-3 my-2">

                  
                          <View className=" h-full  border-[0.3px] w-full px-2 py-2 rounded">
                          
                              <View className=" mb-5">
                                <ScrollView>
                                <Text>
                                      what is wave, give two example of waves 
                                     
                                    </Text>
                                </ScrollView>
                                    
                                </View>
                              <View className=" flex-row  justify-between ">
                              <Text>Due: April 20, 2025</Text>
                              <View className="bg-[#fcecc5] h-[20]  rounded-2xl px-2 ">
                              <Text className="text-[#ffbc1f]">Pending</Text>

                              </View>
                               
                               
                              </View>
                          
                          </View>
                          
                          
                          
                  </View>
          
                    <View className="flex-row gap-3 my-2">
                          <View className=" h-full  border-[0.3px] w-full px-2 py-2 rounded">
                          
                              <View className=" mb-5">
                                <ScrollView>
                                <Text>
                                      what is wave, give two example of waves 
                                     
                                    </Text>
                                </ScrollView>
                                    
                                </View>
                              <View className=" flex-row  justify-between ">
                              <Text>Due: April 20, 2025</Text>
                              <View className="bg-BgRed h-[20]  rounded-2xl px-2 ">
                              <Text className="text-red">expired</Text>

                              </View>
                              </View>
                   
                          </View>        
                  </View>
                  <View className="flex-row gap-3 my-2">
                          <View className=" h-full  border-[0.3px] w-full px-2 py-2 rounded">
                          
                              <View className=" mb-5">
                                <ScrollView>
                                <Text>
                                      what is wave, give two example of waves 
                                     
                                    </Text>
                                </ScrollView>
                                    
                                </View>
                              <View className=" flex-row  justify-between ">
                              <Text>Due: April 20, 2025</Text>
                              <View className="bg-BgGreen h-[20]  rounded-2xl px-2 ">
                              <Text className="text-green">submitted</Text>

                              </View>
                              </View>
                          
                          </View>        
                  </View>
              </ScrollView>
              
          </View>
          </ScrollView>
         
           

        </View>
        
     
  
      </SafeAreaView>
    );
  
}