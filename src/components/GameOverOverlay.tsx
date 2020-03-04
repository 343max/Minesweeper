import React, { useState, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  Animated
} from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { GameState } from "../model/PlayingField"

interface GameOverlayProps {
  restart: () => void
  gameState: GameState
}

export default function GameOverOverlay({
  restart,
  gameState
}: GameOverlayProps) {
  const [fadeAnimation] = useState(new Animated.Value(0))
  const [slideInAnimation] = useState(new Animated.Value(-150))

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnimation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true
      }),
      Animated.spring(slideInAnimation, { toValue: 0, useNativeDriver: true })
    ]).start()
  })

  const message =
    gameState == GameState.Won
      ? "🎉 Congratulations! 🎉"
      : "😫 Bummer! You lost 😭"

  return (
    <Animated.View
      style={[
        styles.box,
        {
          opacity: fadeAnimation,
          transform: [{ translateY: slideInAnimation }]
        }
      ]}
    >
      <Text style={{ fontSize: 28, fontWeight: "bold" }}>{message}</Text>
      <TouchableOpacity style={styles.button} onPress={restart}>
        <MaterialCommunityIcons name="reload" size={28} />
        <Text style={{ fontSize: 28, fontWeight: "bold", marginLeft: 7 }}>
          Start Over
        </Text>
      </TouchableOpacity>
    </Animated.View>
  )
}

function rgba(red: number, green: number, blue: number, alpha: number): string {
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`
}

const styles = StyleSheet.create({
  box: {
    position: "absolute",
    backgroundColor: rgba(255, 255, 255, 0.8),
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    flex: 1,
    alignItems: "center"
  },
  button: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    padding: 14,
    backgroundColor: rgba(0, 180, 0, 0.6),
    borderRadius: 20
  }
})
