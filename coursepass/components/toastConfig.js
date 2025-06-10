// toastConfig.js
import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const backgroundColors = {
  success: '#2ecc71', // green
  error: '#e74c3c',   // red
  info: '#2f3542',    // dark grey
};

export const toastConfig = {
  customToast: ({ text1, text2, props }) => {
    const bgColor = backgroundColors[props.type] || backgroundColors.info;
    const icon =
      props.type === 'success'
        ? 'checkmark-circle-outline'
        : props.type === 'error'
        ? 'close-circle-outline'
        : 'information-circle-outline';

    return (
      <View
        style={{
          backgroundColor: bgColor,
          borderRadius: 12,
          paddingVertical: 12,
          paddingHorizontal: 16,
          marginHorizontal: 20,
          shadowColor: '#000',
          shadowOpacity: 0.2,
          shadowRadius: 10,
          elevation: 5,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Ionicons
          name={icon}
          size={24}
          color="#fff"
          style={{ marginRight: 12 }}
        />
        <View style={{ flex: 1 }}>
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
            {text1}
          </Text>
          <Text style={{ color: '#f1f1f1', marginTop: 2 }}>{text2}</Text>
        </View>
      </View>
    );
  },
};
