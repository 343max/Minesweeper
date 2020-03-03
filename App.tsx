import React, { useState } from "react"
import { StyleSheet, View } from "react-native"
import GameFieldView from "./src/components/GameFieldView"
import {
  emptyField,
  FieldSize,
  PatchCoordinate,
  generateBombField
} from "./src/model/Field"
import { revealPatch } from "./src/model/Reveal"

export default function App() {
  const size: FieldSize = { width: 10, height: 8 }
  const mineCount = 10
  const [field, setField] = useState(emptyField(size))
  const [firstReveal, setFirstReveal] = useState(true)

  const reveal = (coordinates: PatchCoordinate) => {
    if (firstReveal) {
      setFirstReveal(false)
      const initialField = revealPatch(
        generateBombField(size, mineCount, coordinates),
        coordinates
      )
      setField(initialField)
    } else {
      const newField = revealPatch(field, coordinates)
      setField([...newField])
    }
  }

  return (
    <View style={styles.container}>
      <GameFieldView gameField={field} reveal={reveal} />
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
