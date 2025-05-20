
import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import {router} from 'expo-router';
import {useNavigation} from '@react-navigation/native';
import {useGetQuizeMetaDataQuery, useGetFlashcardQuery} from '../../../../redox/slice/apiSlice';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';




const DropdownComponent = () => {
   useFocusEffect(
    useCallback(() => {
      setUni(null);
      setYear(null)
      setCourse(null)

      return () => {
        setUni(null);
        setYear(null)
        setCourse(null)
      };
    }, [])
  )
  const navigation = useNavigation()
  const [course, setCourse] = useState(null);
  const [uni, setUni] = useState(null);
  const [year, setYear] = useState(null);
  const {data, isFetching, isSuccess, error, isError, refetch} = useGetQuizeMetaDataQuery()
 

  let courses = []
  let universities = []
  let years = []
  if (isSuccess) {
    courses = data.courseID?.map(course => ({
      label: course,
      value: course
    }))

    universities = data.university_code?.map(uni => ({
      label: uni,
      value: uni
    }))
    years = data.year?.map(year => ({
      label: year,
      value: year
    }))

      || []
  }

  const handleQuiz = () => {
    navigation.navigate("pastQyestionDetails", {course, uni, year})
  }
  // console.log(course, uni, year);
  return (

    <View className="flex-1  justify-center items-center">
      <Text>Filter questions to start practice</Text>
      <View className="flex-row  mt-10 flex-wrap">



        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={courses}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Select course"
          searchPlaceholder="Search..."
          value={course}
          onChange={item => {
            setCourse(item.value);
          }}

        />
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={universities}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Select university"
          searchPlaceholder="Search..."
          value={uni}
          onChange={item => {
            setUni(item.value);
          }}
        />
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={years}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Select year"
          searchPlaceholder="Search..."
          value={year}
          onChange={item => {
            setYear(item.value);
          }}
        />
        <TouchableOpacity
          onPress={handleQuiz}
        >
          <Text>start</Text>
        </TouchableOpacity>
      </View>
    </View>

  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    marginBottom: 10,
    marginLeft: 10,
    height: 50,
    borderBottomColor: 'gray',
    borderWidth: 0.5,
    width: 180
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});