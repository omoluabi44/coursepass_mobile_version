import { 
  View, Text, SafeAreaView, StyleSheet, ScrollView, TextInput, 
  TouchableWithoutFeedback, Keyboard, Pressable, TouchableOpacity
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { 
  useGetUserIdQuery, useCreateAssignmentMutation, useGetUserEnrollQuery,
  useAllocateMutation, useLazyGetAssignmentQuery 
} from '../../../../redox/slice/apiSlice'
import GoBackBtn from '../../../../components/goBackButton'
import { Dropdown } from 'react-native-element-dropdown'
import PopUp from '../../../../components/toast'
import {useNavigation} from '@react-navigation/native';
import {MaterialCommunityIcons, AntDesign} from '@expo/vector-icons/';
import { useColorScheme } from 'react-native';

export default function AssignmentDetails() {
  const { user } = useSelector((state) => state.login)
  const { data, isFetching, error } = useGetUserIdQuery(user.id)
  const [getAssignment, { data: assignmentData, isSuccess: getSuccess }] = useLazyGetAssignmentQuery()
  const { data: courseData } = useGetUserEnrollQuery(user.id)
  const [createAssignment, { isSuccess: enrollSuccess, isError: enrollError, error: enrollErrorData }] = useCreateAssignmentMutation()
  const [allocate, { isSuccess: allocateSuccess, isError: allocateError, error: allocateErrorData }] = useAllocateMutation()
 const navigation = useNavigation()
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [value, setValue] = useState(null)
  const [courseID, setCourseID] = useState(null)
  const theme = useColorScheme();

  useEffect(() => {
    if (enrollSuccess) {
      PopUp({ type: 'success', title: 'Success', message: 'Assignment created successfully!' })
    }
    if (allocateSuccess) {
      PopUp({ type: 'success', title: 'Success', message: 'Assignment assigned successfully!' })
    }
    if (enrollError) {
      handleError(enrollErrorData, 'Creating Assignment failed')
    }
    if (allocateError) {
      handleError(allocateErrorData, 'Assigning failed')
    }
  }, [enrollSuccess, enrollError, enrollErrorData, allocateSuccess, allocateErrorData, allocateError])

  if (isFetching) return <Text style={styles.loading}>Loading...</Text>
  if (error) return <Text style={styles.error}>Something went wrong.</Text>

  const handleError = (errorData, title = 'Operation failed') => {
    const html = errorData?.data
    if (typeof html === 'string') {
      const match = html.match(/<h1>(.*?)<\/h1>\s*<p>(.*?)<\/p>/)
      if (match) {
        const heading = match[1]
        const message = match[2]
        PopUp({ type: 'error', title, message: `${heading} ${message}` })
      } else {
        PopUp({ type: 'error', title, message: 'Unknown error' })
      }
    } else {
      PopUp({ type: 'error', title, message: 'No error details provided' })
    }
  }

  const data3 = courseData?.map(course => ({
    label: course.courseID,
    value: course.courseID,
  })) || []

  const handleCreateAssignment = async () => {
    try {
      await createAssignment({ courseID: value, title, due_date: dueDate, detail: details }).unwrap()
      setTitle('')
      setDetails('')
      setDueDate('')
      setValue(null)
    } catch (err) {
      // error handled by useEffect
    }
  }

  const handleGetAssignment = async (courseID) => {
    try {
      await getAssignment(courseID)
    } catch (error) {
      // error handling
    }
  }

  const handleAssign = async (id) => {
    try {
      await allocate({ userID: user.id, courseID, assignmentID: id }).unwrap()
  
    } catch (err) {
      // error handling
    }
  }

  return (
    <SafeAreaView style={theme ==="dark" ? styles.darkSafeArea : styles.safeArea}>
      <View style={styles.container}>
        {/* <GoBackBtn /> */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="left" size={24}  color={ theme ==="dark"? "white":"dark"} />
                  </TouchableOpacity>
        {data?.role === 'HOC' ? (
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
              <Text style={styles.heading}>Create Assignment</Text>
              <View style={styles.card}>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={data3}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="Select course"
                  searchPlaceholder="Search..."
                  value={value}
                  onChange={item => setValue(item.value)}
                />
                <Text style={styles.label}>Title</Text>
                <TextInput
                  multiline
                  style={styles.input}
                  onChangeText={setTitle}
                  value={title}
                  placeholder="Briefly describe the assignment"
                  placeholderTextColor="#666"
                />
                <Text style={styles.label}>Details</Text>
                <TextInput
                  multiline
                  style={[styles.input, { height: 100 }]}
                  onChangeText={setDetails}
                  value={details}
                  placeholder="Enter the assignment details"
                  placeholderTextColor="#666"
                />
                <Text style={styles.label}>Due Date (YYYY-MM-DD)</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={setDueDate}
                  value={dueDate}
                  placeholder="e.g. 2025-06-30"
                  placeholderTextColor="#666"
                />
                <Pressable style={styles.button} onPress={handleCreateAssignment} android_ripple={{ color: '#fff' }}>
                  <Text style={styles.buttonText}>Create Assignment</Text>
                </Pressable>
              </View>

              <Text style={[styles.heading, { marginTop: 5 }]}>Assign Assignment</Text>
              <View style={styles.card}>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={data3}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="Select course"
                  searchPlaceholder="Search..."
                  value={courseID}
                  onChange={item => {
                    setCourseID(item.value)
                    handleGetAssignment(item.value)
                  }}
                />

                {getSuccess && assignmentData && (
                  <View style={{ marginTop: 15 }}>
                    {assignmentData.map((assignment, id) => (
                      <View key={id} style={styles.assignmentRow}>
                        <Text style={styles.assignmentTitle}>{assignment.title}</Text>
                        <Pressable
                          style={styles.assignButton}
                          onPress={() => handleAssign(assignment.id)}
                          android_ripple={{ color: '#eee' }}
                        >
                          <Text style={styles.assignButtonText}>Assign</Text>
                        </Pressable>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
        ) : (
          // <View style={styles.centered}>
          
          //   <Text style={styles.error}>You cannot upload since you are not a Class rep.</Text>
          // </View>
           <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
              <Text style={styles.heading}>Create Assignment</Text>
              <View style={styles.card}>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={data3}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="Select course"
                  searchPlaceholder="Search..."
                  value={value}
                  onChange={item => setValue(item.value)}
                />
                <Text style={styles.label}>Title</Text>
                <TextInput
                  multiline
                  style={styles.input}
                  onChangeText={setTitle}
                  value={title}
                  placeholder="Briefly describe the assignment"
                  placeholderTextColor="#666"
                />
                <Text style={styles.label}>Details</Text>
                <TextInput
                  multiline
                  style={[styles.input, { height: 100 }]}
                  onChangeText={setDetails}
                  value={details}
                  placeholder="Enter the assignment details"
                  placeholderTextColor="#666"
                />
                <Text style={styles.label}>Due Date (YYYY-MM-DD)</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={setDueDate}
                  value={dueDate}
                  placeholder="e.g. 2025-06-30"
                  placeholderTextColor="#666"
                />
                <Pressable style={styles.button} onPress={handleCreateAssignment} android_ripple={{ color: '#fff' }}>
                  <Text style={styles.buttonText}>Create Assignment</Text>
                </Pressable>
              </View>

              <Text style={[styles.heading, { marginTop: 5 }]}>Assign Assignment</Text>
              <View style={styles.card}>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={data3}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="Select course"
                  searchPlaceholder="Search..."
                  value={courseID}
                  onChange={item => {
                    setCourseID(item.value)
                    handleGetAssignment(item.value)
                  }}
                />

                {getSuccess && assignmentData && (
                  <View style={{ marginTop: 15 }}>
                    {assignmentData.map((assignment, id) => (
                      <View key={id} style={styles.assignmentRow}>
                        <Text style={styles.assignmentTitle}>{assignment.title}</Text>
                        <Pressable
                          style={styles.assignButton}
                          onPress={() => handleAssign(assignment.id)}
                          android_ripple={{ color: '#eee' }}
                        >
                          <Text style={styles.assignButtonText}>Assign</Text>
                        </Pressable>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
   darkSafeArea: {
    flex: 1,
    backgroundColor: '#252231',
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#222',
    textAlign: 'center',
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 6,
    marginBottom: 20,
  },
  dropdown: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fafafa',
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#888',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#333',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  label: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
  },
  input: {
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fff',
    textAlignVertical: 'top',
  },
  button: {
    marginTop: 25,
    backgroundColor: '#4a90e2',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#4a90e2',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  assignmentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  assignmentTitle: {
    fontSize: 16,
    color: '#222',
    flex: 1,
  },
  assignButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#4a90e2',
    borderRadius: 8,
  },
  assignButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  loading: {
    marginTop: 50,
    textAlign: 'center',
    fontSize: 18,
    color: '#888',
  },
  error: {
    marginTop: 50,
    textAlign: 'center',
    fontSize: 18,
    color: '#cc0000',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
})
