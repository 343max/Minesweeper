import React, { useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { FieldState, FieldSize, emptyField } from "./src/model/Field"
import GameFieldView from "./src/components/GameFieldView"

export default function App() {
  const size: FieldSize = { width: 10, height: 8 }
  const [field, setField] = useState<FieldState>(
    (() => {
      return emptyField(size)
    })()
  )
  return (
    <View style={styles.container}>
      <GameFieldView
        gameField={field}
        reveal={({ x, y }) => {
          console.log([x, y])
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
})
