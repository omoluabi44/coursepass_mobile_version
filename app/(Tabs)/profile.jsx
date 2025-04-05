import { View, Text } from 'react-native'
import React from 'react'

export default function Profile() {
  return (
    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", height: "100%" }}>
      <Text style={{ fontSize: 20, color: "black" }}>Profile</Text>
    </View>
  );
}