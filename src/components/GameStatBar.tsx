import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons"
import React from "react"
import { StyleSheet, Text, View } from "react-native"
import PopupMenu, { PopupMenuItem } from "./PopupMenu"

interface GameStatBarProps {
  flagsRemaining: number
  playtime: number
}

export default function GameStatBar({
  flagsRemaining,
  playtime,
}: GameStatBarProps) {
  const menuItems: PopupMenuItem[] = [
    { id: "easy", label: "Easy" },
    { id: "medium", label: "Medium" },
    { id: "hard", label: "Hard" },
  ]

  return (
    <View style={style.bar}>
      <View style={style.section}>
        <PopupMenu items={menuItems} selected="easy" />
      </View>
      <View style={style.section}>
        <Entypo name="stopwatch" size={22} color="#fff" />
        <Text style={style.text}>{playtime}</Text>
      </View>
      <View style={style.section}>
        <MaterialCommunityIcons name="flag" color="#f23607" size={22} />
        <Text style={style.text}>{flagsRemaining}</Text>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  bar: {
    backgroundColor: "#4a752c",
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    marginLeft: 20,
    marginRight: 20,
  },
  text: {
    marginLeft: 5,
    fontSize: 20,
    color: "#fff",
    fontWeight: "600",
    fontVariant: ["tabular-nums"],
  },
})
