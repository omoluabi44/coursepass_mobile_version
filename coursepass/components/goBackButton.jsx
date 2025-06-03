import { useNavigation } from '@react-navigation/native';
import { Button, TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function GoBackBtn({route}){
      const navigation = useNavigation()
      return(
        <TouchableOpacity onPress={() => navigation.navigate(route)}>
            <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
       
      )
      
       

}