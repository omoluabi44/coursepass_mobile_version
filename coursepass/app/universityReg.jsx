import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';
import { useRoute, useTheme } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import PopUp from '../components/toast';
import {StatusBar} from 'expo-status-bar';



const data = [
  { label: '100', value: 100 },
  { label: '200', value: 200 },
  { label: '300', value: 300 },
  { label: '400', value: 400 },
  { label: '500', value: 500 },

];

const DropdownComponent = () => {
  const route = useRoute();  
  const { username , id} = route.params; 


  

  const userId = id

  
  const [isFocus, setIsFocus] = useState(false);
  const [universitiesData, setUnversitiesData] = useState([])
  const [collegeData, setCollegeData] = useState([])
  const [departmentData, setDepartmentData] = useState([])
  const [university, setUniversity] = useState('')
  const [college, setCollege] = useState('')
  const [department, setDepartment] = useState('')
  const [level, setLevel] = useState()
  const navigation = useNavigation();
console.log(college,department,university  );

    useEffect(()=>{
        const fetchUniversity = async ()=>{
            try {

                const response = await  axios.get("http://172.20.10.5:5000/api/v1/universities");
            
                
                if (response.status === 200) {
                 const universities = response.data
                 const uniArray = universities.map((uni) => ({
                    label: uni.university,
                    value: uni.university,
                    value2: uni.id
                  }));
                  setUnversitiesData(uniArray)
             
                
                
                  
                } else if (response.status === 404) {
                  console.log(response.data.message);
                  PopUp({type: "error", title: "Error", message:"error"});
                  
                }else {
                    console.log (response);
                     PopUp({type: "error", title: "Error", message:"error"});
                }
              } catch (err) {
                console.log("error", err);
                 PopUp({type: "error", title: "Error", message:"error"});
              }
    

        }
        fetchUniversity()
    }, [])
    const handleCollege = async (id)=>{
        try {

            const response = await  axios.get(`http://172.20.10.5:5000/api/v1/universities/${id}/college`);
        
            
            if (response.status === 200) {
             const colleges = response.data
             const collegeArray = colleges.map((col) => ({
                label: col.college,
                value: col.college,
                value2: col.id
              }));
              console.log(collegeArray);
              
              setCollegeData(collegeArray)
         
            
            
              
            } else if (response.status === 404) {
              console.log(response.data.message);
              
            }else {
                console.log (response);
            }
          } catch (err) {
            console.log("error", err);
          }
    }
    const handleDepartment = async (id)=>{
        try {

            const response = await  axios.get(`http://172.20.10.5:5000/api/v1/college/${id}/department`);
        
            
            if (response.status === 200) {
             const department = response.data
             const departmentArray = department.map((dept) => ({
                label: dept.department,
                value: dept.department,
            
              }));
              setDepartmentData(departmentArray)
         
            
            
              
            } else if (response.status === 404) {
              console.log(response.data.message);
              
            }else {
                console.log (response);
            }
          } catch (err) {
            console.log("error", err);
          }
    }
  const handleRegister =async(userId)=>{
    try {
     
      const response = await axios.post(`http://172.20.10.5:5000/api/v1/auth/university/${userId}`, {
        university:university,
        College:college,
        department:department,
        level:level, 
        
      });
      if (response.status === 201) {
   
        PopUp({type: "success", title: "Successful", message:"Registration successfull"});
        navigation.navigate('profilePic');
        
        
      } else {  
        // console.log (response.data.message);
        PopUp({type: "error", title: "Error", message:"error"});
       
      }
    } catch (err) {
          console.log(err);
          PopUp({type: "error", title: "Error", message:"error"});
    }
  }

const handleSkip =()=>{
  navigation.navigate('profilePic');
 
}


  return (
    <View className="h-full mt-20 " > 
    <StatusBar style='dark' />  
     <View className="items-center   "> 
            <Text className="text-2xl text-accent">
               Finish Up your Registration {username} 
            </Text>
            <Text className="text-xl">
                Register your university 
            </Text>
        </View>
        <View className=" mt-10">
  

       
        <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={universitiesData}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select University' : '...'}
        searchPlaceholder="Search..."
        value={university}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
        setUniversity(item.value);
          handleCollege(item.value2)
          setIsFocus(false);
        }}
   
      />
       <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={collegeData}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select College' : '...'}
        searchPlaceholder="Search..."
        value={college}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
            setCollege(item.value);
          handleDepartment(item.value2)
          setIsFocus(false);
        }}
   
      />
       <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={departmentData}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select Department' : '...'}
        searchPlaceholder="Search..."
        value={department}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
        setDepartment(item.value);
          setIsFocus(false);
        }}
        
      />
      
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select Current Level' : '...'}
        searchPlaceholder="Search..."
        value={level}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
            setLevel(item.value);
          setIsFocus(false);
        }}
       
      />
       </View>
       <View className=" flex-row item-center justify-around mx-5 ">
      
       
            <TouchableOpacity  onPress={handleSkip}
            className='bg-base  p-3 rounded-2xl mb-3 mt-3 w-40 justify-center border border-accent flex-row item-center'   >
                <Text className='text-xl font-bold text-accent text-center '>
                       Skip
                </Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={()=>handleRegister(userId)}
            className='bg-accent  p-3 rounded-2xl mb-3 mt-3 w-40 justify-center flex-row item-center'   >
                <Text className='text-xl font-bold text-base text-center '>
                       Register
                </Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
    justifyContent: "center",
    alignItems:"center"
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    marginHorizontal:15,
    marginBottom:10,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
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