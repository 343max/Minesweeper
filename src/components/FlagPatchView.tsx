import React, { useState, useEffect } from "react"
import { View, StyleProp, ViewStyle, Animated, Easing } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"

interface FlagPatchViewProps {
  style: StyleProp<ViewStyle>
  sideLength: number
}

export default function FlagPatchView({
  style,
  sideLength
}: FlagPatchViewProps) {
  const [scaleAnimation] = useState(new Animated.Value(20))
  const [fadeAnimation] = useState(new Animated.Value(0))

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnimation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true
      }),
      Animated.timing(scaleAnimation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true
      })
    ]).start()
  })

  return (
    <View style={style}>
      <Animated.View
        style={{
          opacity: fadeAnimation,
          transform: [{ scale: scaleAnimation }]
        }}
      >
        <MaterialCommunityIcons
          name="flag"
          color="#f03507"
          size={Math.round(sideLength * 0.5)}
        />
      </Animated.View>
    </View>
  )
}
