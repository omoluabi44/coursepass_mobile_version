import {View, Text, SafeAreaView, ScrollView, Pressable} from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons/';
import React, {useState} from 'react'
import GoBackBtn from '../../../../components/goBackButton';
import {useGetAssignmentAllocQuery} from '../../../../redox/slice/apiSlice';
import {useSelector} from 'react-redux';

export default function Assignments() {
  const {user} = useSelector((state) => state.login);
  const {data, isFetching, isSuccess, error, isError, refetch} = useGetAssignmentAllocQuery(user.id)
  const [open, setOpen] = useState(true)
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

  const handleAssignmentDetials = (title) => {
    console.log(title);
    setTopic(title)
    setOpen(true)
  }

  return (

    <SafeAreaView >
      {open ?
        <View className="h-full items-center justify-center ">
          <Text>
            {topic}
          </Text>
          <View className="flex-row  w-full justify-around">
            <Pressable className="" onPress={() => setOpen(false)}>
              <Text>complete</Text>
            </Pressable>
            <Pressable className="" onPress={() => setOpen(false)}>
              <Text>Not done</Text>
            </Pressable>
          </View>

        </View>
        :
        <View className="h-full bg-secondary2 ">
          <View className="mx-3">
            <GoBackBtn />
          </View>
          <View className="mx-5 mt-5">
            <Text className="text-2xl font-bold"> ASSIGNMENTS </Text>
          </View>
          <ScrollView>


            {Object.entries(data).map(([courseID, assignments]) => (
              <View >
                <View className="mx-5 my-2 bg-base px-3 py-3 rounded-lg  ">
                  <View className="mb-3 flex-row justify-between">
                    <Text className="text-accent text-[12px]">
                      {courseID}
                    </Text>
                    <View className="bg-bgr h-[20] justify-center rounded-2xl px-2" >
                      <Text className="text-xs text-accent"> {assignments.length} assignments </Text>
                    </View>

                  </View>

                  <ScrollView vertical showsHorizontalScrollIndicator={false} className="">
                    {assignments.map((assignment, id) => (
                      <View className="flex-row gap-3 my-2">


                        <View className=" h-full  border-[0.3px] w-full px-2 py-2 rounded">
                          <Pressable onPress={() => handleAssignmentDetials(assignment.title)}>
                            <View className=" mb-5">
                              <View>
                                <Text>
                                  {assignment.title}

                                </Text>
                              </View>

                            </View>
                            <View className=" flex-row  justify-between ">
                              <Text>{assignment.due_date}</Text>
                              {/* <View className="bg-[#fcecc5] h-[20]  rounded-2xl px-2 ">
                        <Text className="text-[#ffbc1f]">Pending</Text>
                      </View> */}


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