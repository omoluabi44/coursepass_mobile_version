import { View, Text } from 'react-native'
import React from 'react'

export default function Leaderboard() {
  return (
    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", height: "100%" }}>
      <Text style={{ fontSize: 20, color: "black" }}>Leaderboard</Text>
    </View>
  );
}