import React, {useState, useCallback} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, SafeAreaView, StatusBar} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {useNavigation} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';
import {useGetQuizeMetaDataQuery} from '../../../../redox/slice/apiSlice';
import {useEffect} from 'react';
import {useColorScheme} from 'react-native';


const DropdownComponent = () => {
  const navigation = useNavigation();
  const [course, setCourse] = useState(null);
  const [uni, setUni] = useState(null);
  const [year, setYear] = useState(null);
  const [disabled, setDisabled] = useState(false)
  const {data, isSuccess, isError, error} = useGetQuizeMetaDataQuery();
  const theme = useColorScheme();

  useEffect(() => {

    handleButtonVis()
  }, [course, uni, year]);

  useFocusEffect(
    useCallback(() => {
      setCourse(null);
      setUni(null);
      setYear(null);
      return () => {
        setCourse(null);
        setUni(null);
        setYear(null);
      };
    }, [])
  );
  if (data == []) {
    console.log(true);

  }
  if (isError) {
    console.log(error);

  }


  let courses = [], universities = [], years = [];
  if (isSuccess) {
    courses = data.courseID?.map(course => ({label: course, value: course})) || [];
    universities = data.university_code?.map(uni => ({label: uni, value: uni})) || [];
    years = data.year?.map(year => ({label: year, value: year})) || [];
  }

  const handleQuiz = () => {
    navigation.navigate("pastQyestionDetails", {course, uni, year});

  };
  const handleButtonVis = () => {
    if (course && uni && year) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }


  return (
    <SafeAreaView className="flex-1"
      style={theme === 'dark' ? styles.darkContainer : styles.container}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
      <View className="px-5" >

        <Text style={ theme === 'dark' ? styles.darkHeading :styles.heading}>Select Past Question Preferences</Text>
        <Text style={ theme === 'dark' ? styles.darkSubheading :styles.subheading}>Filter questions to start practice</Text>

        <View style={styles.dropdownContainer}>
          <Dropdown
            style={theme === 'dark' ? styles.darkDropdown : styles.dropdown}
            placeholderStyle={theme === 'dark' ? styles.darkPlaceholderStyle : styles.placeholderStyle}
            selectedTextStyle={theme === 'dark' ? styles.darkSelectedTextStyle : styles.selectedTextStyle}
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
            onChange={item => setCourse(item.value)}
          />
          <Dropdown
            style={theme === 'dark' ? styles.darkDropdown : styles.dropdown}
            placeholderStyle={theme === 'dark' ? styles.darkPlaceholderStyle : styles.placeholderStyle}
            selectedTextStyle={theme === 'dark' ? styles.darkSelectedTextStyle : styles.selectedTextStyle}
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
            onChange={item => setUni(item.value)}
          />
          <Dropdown
            style={theme === 'dark' ? styles.darkDropdown : styles.dropdown}
            placeholderStyle={theme === 'dark' ? styles.darkPlaceholderStyle : styles.placeholderStyle}
            selectedTextStyle={theme === 'dark' ? styles.darkSelectedTextStyle : styles.selectedTextStyle}
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
            onChange={item => setYear(item.value)}
          />
        </View>

        <TouchableOpacity
          // style={styles.button} 
          className={`bg-accent rounded-lg p-4 items-center shadow-md ${disabled ? "opacity-30" : ""}`}
          disabled={disabled}
          onPress={handleQuiz}>
          <Text style={styles.buttonText}>Start Quiz</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>

  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {

    paddingHorizontal: 20,
    justifyContent: 'center',
    backgroundColor: '#F9FAFB',
  },
  darkContainer: {

    paddingHorizontal: 20,
    justifyContent: 'center',
    backgroundColor: '#252231',
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    color: '#111827',
    marginBottom: 8,
  },
    darkHeading: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    color: '#d4d4d4',
    marginBottom: 8,
  },
  subheading: {
    fontSize: 16,
    textAlign: 'center',
    color: '#6B7280',
    marginBottom: 20,
  },
    darkSubheading: {
    fontSize: 16,
    textAlign: 'center',
    color: '#d4d4d4',
    marginBottom: 20,
  },
  dropdownContainer: {
    gap: 15,
    marginBottom: 30,
  },
  dropdown: {
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  darkDropdown: {
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#252231',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#9CA3AF',
  },
  darkPlaceholderStyle: {
    fontSize: 16,
    color: '#d4d4d4',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#111827',
  },
  darkSelectedTextStyle: {
    fontSize: 16,
    color: '#d4d4d4',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    borderColor: '#E5E7EB',
    borderBottomWidth: 1,
  },
  button: {
    backgroundColor: '#3B82F6',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {width: 0, height: 2},
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});
