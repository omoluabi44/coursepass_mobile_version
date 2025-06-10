import React, {useState} from 'react';
import {View, Button, Text, Alert, Image, Platform, TouchableOpacity} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import {useSelector} from 'react-redux';
import Load from '../components/loader';
import {useNavigation} from '@react-navigation/native';
import PopUp from '../components/toast';
import { useRoute } from '@react-navigation/native';


const ImageUploadComponent = () => {
  const [image, setImage] = useState(null);
  // const {user} = useSelector((state) => state.login);
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const { userId} = route.params;
  // const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  console.log("this",userId);

  // Pick image from gallery
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaType,
        allowsEditing: true, // Allows cropping/editing
        quality: 1, // 0 to 1, 1 is highest quality
      });

      if (result.canceled) {

      } else {
        setImage(result.assets[0]);

      }
    } catch (err) {

      Alert.alert('Error', 'Failed to pick image.');
    }
  };

  // Capture image from camera


  // Upload image to API
  const uploadImage = async () => {

    if (!image) {
      Alert.alert('Error', 'Please select or capture an image first.');
      return;
    }

    try {
      const formData = new FormData();
      const fileName = image.uri.split('/').pop() || `image_${Date.now()}.jpg`;
      formData.append('image', {
        uri: image.uri,
        type: image.mimeType || 'image/jpeg', // Fallback to JPEG
        name: fileName,
      });
      formData.append('user_id', userId);
      console.log("i executed");



      const response = await axios.post('https://api.coursepass.me/api/v1/user/upload_profile_image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response);


      PopUp({type: "success", title: "Success", message: "Image uploaded successfully!"});
      // setLoading(false)
      navigation.navigate('login');
    } catch (error) {
      // setLoading(false)

    }
    finally {
      setLoading(false);


      // Alert.alert('Error', 'Failed to upload image.');

    }

  };
  // {loading && <Load visible={loading} data="Uploading image" />}
  return (

    <View className="h-full  items-center mt-10" >
      <Load visible={loading} data="Uploading image" />
      {image ?
        <View>

          <Image
            source={{uri: image.uri}}
            className="w-40 h-40 rounded-full mb-3 mt-10 "

            style={{width: 200, height: 200, marginBottom: 20}}
          />

        </View>
        :
        <View className="mt-10 mb-5 items-center">
          <Text className="text-2xl font-bold">UPLOAD PROFILE PICTURE </Text>
          <Image
            // source={{ uri: "" }}
            className="w-40 h-40 rounded-full mb-3 mt-10 items-center"
            source={require('../assets/images/profile.png')}
            style={{width: 200, height: 200, marginBottom: 20}}
          />
        </View>
      }
      <View className="flex-row justify-around items-center bg-accen w-full">
        <View>
          <TouchableOpacity onPress={() => navigation.navigate("login")}
            className='bg-base  p-3 rounded-2xl mb-3  w-40 justify-center border-accent border flex-row '>
            <Text className='text-xl font-bold text-accent text-center '>Skip</Text>
          </TouchableOpacity>
        </View>

        {image ?
          <View>
            <TouchableOpacity onPress={async () => {
              setLoading(true)
              await uploadImage()
            }}
              className='bg-accent  p-3 rounded-2xl mb-3 mt-3 justify-center flex-row'>
              <Text className='text-xl font-bold text-base text-center '>Set  Profile</Text>
            </TouchableOpacity>
          </View>
          :
          <View>
            <TouchableOpacity onPress={pickImage}

              className='bg-accent  p-3 rounded-2xl mb-3 w-60 '>

              <Text className='text-xl font-bold text-base text-center '> Select Image</Text>
            </TouchableOpacity>
          </View>
        }

      </View>

      {/* {image && (
        <Image
          source={{ uri: image.uri }}
          style={{ width: 200, height: 200, marginBottom: 20 }}
        />
      )}
      <Text>{image ? `Selected: ${image.uri.split('/').pop()}` : 'No image selected'}</Text>
      <Button title="Pick Image from Gallery" onPress={pickImage} />
      <View>
        <Button title="Upload Image" onPress={uploadImage} />
      </View> */}
    </View>
  );
};

export default ImageUploadComponent;