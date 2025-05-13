import Toast from 'react-native-toast-message';

export default function PopUp({type, title , message }) {

    Toast.show({
        type: type,
        text1: title,
        text2: message
      })

}