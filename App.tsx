import React, { useState } from "react"
import { LayoutChangeEvent, SafeAreaView, StyleSheet } from "react-native"
import GameFieldView, { Size } from "./src/components/GameFieldView"
import GameOverOverlay from "./src/components/GameOverOverlay"
import {
  emptyField,
  FieldSize,
  GameState,
  generateMinefield,
  getGameState,
  PatchCoordinate
} from "./src/model/PlayingField"
import { revealMines, revealPatch } from "./src/model/Reveal"

export default function App() {
  const fieldSize: FieldSize = { width: 8, height: 10 }
  const mineCount = 10

  const [gameState, setGameState] = useState(GameState.Playing)
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
      let newField = revealPatch(field, coordinates)

      const gameState = getGameState(field)
      setGameState(gameState)

      if (gameState != GameState.Playing) {
        newField = revealMines(newField)
      }

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

  const restartGame = () => {
    setFirstReveal(true)
    setField(emptyField(fieldSize))
    setGameState(GameState.Playing)
  }

  const overlay = (() => {
    if (gameState != GameState.Playing) {
      return <GameOverOverlay restart={restartGame} gameState={gameState} />
    } else {
      return null
    }
  })()

  return (
    <SafeAreaView style={styles.container} onLayout={onLayout}>
      <GameFieldView
        gameField={field}
        reveal={reveal}
        flag={flag}
        maxSize={viewSize}
        gameState={gameState}
      />
      {overlay}
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
