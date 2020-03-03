import React, { useState } from "react"
import { StyleSheet, View, SafeAreaView } from "react-native"
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

  const flag = ({ x, y }: PatchCoordinate) => {
    if (!field[x][y].isRevealed) {
      field[x][y].isFlagged = !field[x][y].isFlagged
      setField([...field])
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <GameFieldView gameField={field} reveal={reveal} flag={flag} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center"
  }
})
