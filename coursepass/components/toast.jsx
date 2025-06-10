// PopUp.js
import Toast from 'react-native-toast-message';

export default function PopUp({ type, title, message }) {
  Toast.show({
    type: 'customToast',
    text1: title,
    text2: message,
    props: {
      type, // "success", "error", or anything else for info
    },
    position: 'top', // or 'bottom'
    visibilityTime: 3000,
    autoHide: true,
    topOffset: 60,
  });
}
