import React, { useState } from "react"
import { StyleSheet, View, SafeAreaView, LayoutChangeEvent } from "react-native"
import GameFieldView, { Size } from "./src/components/GameFieldView"
import {
  emptyField,
  FieldSize,
  PatchCoordinate,
  generateMinefield
} from "./src/model/PlayingField"
import { revealPatch } from "./src/model/Reveal"

export default function App() {
  const fieldSize: FieldSize = { width: 10, height: 8 }
  const mineCount = 10

  const [field, setField] = useState(emptyField(fieldSize))
  const [firstReveal, setFirstReveal] = useState(true)
  const reveal = (coordinates: PatchCoordinate) => {
    if (firstReveal) {
      setFirstReveal(false)
      const initialField = revealPatch(
        generateMinefield(fieldSize, mineCount, coordinates),
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

  const [viewSize, setViewSize] = useState<Size>({ width: 0, height: 0 })
  const onLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout

    setViewSize({ width, height })
  }

  return (
    <SafeAreaView style={styles.container} onLayout={onLayout}>
      <GameFieldView
        gameField={field}
        reveal={reveal}
        flag={flag}
        maxSize={viewSize}
      />
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
