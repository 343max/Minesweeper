import { MaterialCommunityIcons } from "@expo/vector-icons"
import { BlurView } from "@react-native-community/blur"
import React, { useEffect, useState } from "react"
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native"
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

  const messages =
    gameState == GameState.Won
      ? { text: "🎉 Congratulations! 🎉", buttonTitle: "Once More!" }
      : { text: "😫 Bummer! You lost 😭", buttonTitle: "Retry" }

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          opacity: fadeAnimation,
          transform: [{ translateY: slideInAnimation }]
        }}
      >
        <BlurView blurType="extraDark" style={styles.dialog}>
          <Text style={{ fontSize: 28, fontWeight: "bold", color: "#fff" }}>
            {messages.text}
          </Text>
          <TouchableOpacity style={styles.button} onPress={restart}>
            <View style={{ paddingTop: 2 }}>
              <MaterialCommunityIcons name="reload" size={28} color="#fff" />
            </View>
            <Text
              style={{
                fontSize: 28,
                fontWeight: "bold",
                marginLeft: 7,
                color: "#fff"
              }}
            >
              {messages.buttonTitle}
            </Text>
          </TouchableOpacity>
        </BlurView>
      </Animated.View>
    </View>
  )
}

function rgba(red: number, green: number, blue: number, alpha: number): string {
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    alignItems: "center",
    right: 0,
    left: 0,
    paddingBottom: 60
  },
  dialog: {
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
