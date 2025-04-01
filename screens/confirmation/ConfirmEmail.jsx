import React, { useState, useRef } from 'react';
import { View, TextInput, Text,StyleSheet, TouchableOpacity } from 'react-native';

const OTPInput = () => {
     const [otp, setOtp] = useState(['', '', '', '', '', '']);
     const inputs = useRef([]);

     const handleChange = (text, index) => {
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);
    
        if (text && index < 5) {
            inputs.current[index + 1].focus();
          }
    }

      
  return (
    <View>
        <View className='mt-10 mb-7 items-center w-full'>
            <Text className='text-xl p-2'>kindly paste the code sent to your email below </Text>
        </View>
         <View style={styles.container}
    >
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          ref={(el) => (inputs.current[index] = el)}
          style={styles.input}

          keyboardType="number-pad"
          maxLength={1}
          value={digit}
          onChangeText={(text) => handleChange(text, index)}
        />
      ))}
    </View>
     <View className='flex-row justify-center mt-5 w-full '>      
                
                  <TouchableOpacity  className='bg-base border border-accent p-4 rounded-2xl mb-3'>
                              <Text className='text-xl font-bold text-accent text-center '> Confirm </Text>
                          </TouchableOpacity>
              </View>
    </View>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  input: {
    width: 40,
    height: 50,
    borderWidth: 1,
    borderColor: '#000',
    textAlign: 'center',
    fontSize: 20,
    marginHorizontal: 5,
    borderRadius: 5,
  },
});

export default OTPInput;