import { MaterialCommunityIcons } from "@expo/vector-icons"
import React from "react"
import { StyleSheet, Text, View } from "react-native"

interface GameStatBarProps {
  flagsRemaining: number
}

export default function GameStatBar({ flagsRemaining }: GameStatBarProps) {
  return (
    <View style={style.bar}>
      <MaterialCommunityIcons name="flag" color="#f23607" size={22} />
      <Text style={style.text}>{flagsRemaining}</Text>
    </View>
  )
}

const style = StyleSheet.create({
  bar: {
    backgroundColor: "#4a752c",
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
    alignItems: "center"
  },
  text: {
    marginLeft: 5,
    fontSize: 20,
    color: "#fff",
    fontWeight: "600"
  }
})
