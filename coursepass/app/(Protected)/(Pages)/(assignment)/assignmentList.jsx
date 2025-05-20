import {View, Text, SafeAreaView, ScrollView, Pressable} from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons/';
import React, {useState} from 'react'
import GoBackBtn from '../../../../components/goBackButton';
import {useGetAssignmentAllocQuery} from '../../../../redox/slice/apiSlice';
import {useSelector} from 'react-redux';

export default function Assignments() {
  const {user} = useSelector((state) => state.login);
  const {data, isFetching, isSuccess, error, isError, refetch} = useGetAssignmentAllocQuery(user.id)
  const [open, setOpen] = useState(false)
  const [topic, setTopic] = useState("")
  if (isFetching) return (<Text>loading</Text>)
  if (isError) {
    if (error.status === 404)
      return (
        <View className="mt-10">

          <GoBackBtn />
          <View className="h-full justify-center items-center" >

            <Text className="">you have not been assigned any assignment</Text>
            <Text>check back later</Text>
          </View>
        </View>
      )
    else {
      return (<Text>error</Text>)
    }
  }

  console.log(data);

  const handleAssignmentDetails = (title) => {
    console.log(title);
    setTopic(title)
    setOpen(true)
  }

  return (

    <SafeAreaView >
      {open ?
        <View className="h-full items-center justify-center px-6">
          <Text className="text-xl font-semibold mb-8 text-center">{topic}</Text>
          <View className="flex-row w-full justify-around">
            <Pressable
              className="bg-accent rounded px-6 py-3"
              onPress={() => setOpen(false)}
            >
              <Text className="text-white font-semibold">Complete</Text>
            </Pressable>
            <Pressable
              className="bg-red rounded px-6 py-3"
              onPress={() => setOpen(false)}
            >
              <Text className="text-white font-semibold">Not Done</Text>
            </Pressable>
          </View>
        </View>
        :
        // <View className="h-full bg-secondary2 ">
        //   <View className="mx-3">
        //     <GoBackBtn />
        //   </View>
        //   <View className="mx-5 mt-5">
        //     <Text className="text-2xl font-bold"> ASSIGNMENTS </Text>
        //   </View>
        //   <ScrollView>


        //     {Object.entries(data).map(([courseID, assignments] ) => (
        //       <View key={courseID} >
        //         <View className="mx-5 my-2 bg-base px-3 py-3 rounded-lg  ">
        //           <View className="mb-3 flex-row justify-between">
        //             <Text className="text-accent text-[12px]">
        //               {courseID}
        //             </Text>
        //             <View className="bg-bgr h-[20] justify-center rounded-2xl px-2" >
        //               <Text className="text-xs text-accent"> {assignments.length} assignments </Text>
        //             </View>

        //           </View>

        //           <ScrollView vertical showsHorizontalScrollIndicator={false} className="">
        //             {assignments.map((assignment, id) => (
        //               <View key={id}className="flex-row gap-3 my-2">


        //                 <View className=" h-full  border-[0.3px] w-full px-2 py-2 rounded">
        //                   <Pressable onPress={() => handleAssignmentDetials(assignment.title)}>
        //                     <View className=" mb-5">
        //                       <View>
        //                         <Text>
        //                           {assignment.title}

        //                         </Text>
        //                       </View>

        //                     </View>
        //                     <View className=" flex-row  justify-between ">
        //                       <Text>{assignment.due_date}</Text>
        //                       {/* <View className="bg-[#fcecc5] h-[20]  rounded-2xl px-2 ">
        //                 <Text className="text-[#ffbc1f]">Pending</Text>
        //               </View> */}


        //                     </View>
        //                   </Pressable>
        //                 </View>



        //               </View>

        //             ))}

        //           </ScrollView>
        //         </View>



        //       </View>
        //     ))}
        //   </ScrollView>




        // </View>

        <View className="h-full bg-gray-50">
          <View className="mx-3 mt-4">
            <GoBackBtn />
          </View>
          <View className="mx-5 mt-5">
            <Text className="text-2xl font-bold text-gray-900">ASSIGNMENTS</Text>
          </View>
          <ScrollView className="mt-4 px-2">
            {Object.entries(data).map(([courseID, assignments]) => (
              <View key={courseID} className="mb-4">
                <View className="bg-white mt-2 rounded-lg px-4 py-3 "
                  style={{
                    shadowColor: '#000',
                    shadowOpacity: 0.1,
                    shadowRadius: 10,
                    shadowOffset: {width: 0, height: 5},
                    elevation: 6,
                  }}
                >
                  <View className="flex-row justify-between mb-3 items-center">
                    <Text className="text-sm text-blue-600 font-semibold">{courseID}</Text>
                    <View className="bg-gray-200 rounded-2xl px-3 py-1">
                      <Text className="text-xs text-blue-600">{assignments.length} assignments</Text>
                    </View>
                  </View>

                  <ScrollView
                    horizontal={false}
                    showsHorizontalScrollIndicator={false}
                  >
                    {assignments.map((assignment, id) => (
                      <View
                        key={id}
                        className="flex-row gap-3 mb-3"
                      >
                        <View className="flex-1 border border-gray-300 rounded px-3 py-2">
                          <Pressable onPress={() => handleAssignmentDetails(assignment.title)}>
                            <View className="mb-4">
                              <Text className="text-base text-gray-800">{assignment.title}</Text>
                            </View>
                            <View className="flex-row justify-between">
                              <Text className="text-sm text-gray-600">Due: {assignment.due_date}</Text>
                            </View>
                          </Pressable>
                        </View>
                      </View>
                    ))}
                  </ScrollView>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      }




    </SafeAreaView>
  );

}