import axios from 'axios';
import React, {useState, useRef} from 'react';
import {View, TextInput, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {router} from 'expo-router';
import {useRoute} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import PopUp from '../components/toast';

const OTPInput = () => {
  const route = useRoute();
  const {username, email} = route.params;
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState(''); // State for error message
  const inputs = useRef([]);
  const [id, setId] = useState("")
  const [user_name, setUsername] = useState("")
  const navigation = useNavigation();





  const handleChange = (text, index) => {
    if (text.length > 1) {
      const newOtp = text
        .replace(/\D/g, '')
        .split('')
        .slice(0, 6)
        .concat(['', '', '', '', '', ''])
        .slice(0, 6);
      setOtp(newOtp);
      inputs.current[5].focus();
      setError(''); // Clear error on new input
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 5) {
      inputs.current[index + 1].focus();
    }
    if (!text && index > 0) {
      inputs.current[index - 1].focus();
    }
    setError(''); // Clear error on new input
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleSubmit = async () => {
    // Validate OTP
    if (!otp.every((digit) => digit !== '')) {
      setError('Please enter all 6 digits');
      return;
    }

    const otpString = otp.join('');
    if (isNaN(otpString)) {
      setError('Invalid OTP format');
      return;
    }


    try {

      const response = await axios.post("http://172.20.10.5:5000/api/v1/auth/verify", {
        code: otpString,
        email: email,
        username: username
      });
      if (response.status === 200) {
        PopUp({type: "success", title: "Success", message: "Verification successful!"});

        setId(response.data.id)
        setUsername(response.data.username)
        setError(''); // Clear error on back
        setOtp(['', '', '', '', '', '']);


        navigation.navigate('universityReg', {username: response.data.username, id: response.data.id});

      }
    } catch (err) {

      setError(err.response.data.error);
    }
  };

  const handleBack = () => {
    router.back();
    setError(''); // Clear error on back
    setOtp(['', '', '', '', '', '']);
    inputs.current[0].focus();
    navigation.navigate('signUp')
  }

  return (
    <View>
      <View className="mt-10 mb-7 items-center w-full">
        <Text className="text-xl p-2">Kindly paste the code sent to your email below</Text>
      </View>
      {error ? (
        <View className="items-center mb-4">
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}
      <View style={styles.container}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(el) => (inputs.current[index] = el)}
            style={[styles.input, error ? styles.inputError : null]}
            keyboardType="number-pad"
            maxLength={6}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
          />
        ))}
      </View>
      <View className="flex-row justify-around mt-5 w-full">
        <TouchableOpacity
          className="bg-base border border-accent p-4 rounded-2xl mb-3"
          onPress={handleBack}
        >
          <Text className="text-xl font-bold text-accent text-center">Go Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-accent border border-accent p-4 rounded-2xl mb-3"
          onPress={handleSubmit}
        >
          <Text className="text-xl font-bold text-base text-center">Confirm</Text>
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
  inputError: {
    borderColor: 'red', // Red border when error
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default OTPInput;