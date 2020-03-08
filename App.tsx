import React, { useEffect, useState } from "react"
import { LayoutChangeEvent, SafeAreaView, StyleSheet, View } from "react-native"
import CodePush from "react-native-code-push"
import GameFieldView, { Size } from "./src/components/GameFieldView"
import GameOverOverlay from "./src/components/GameOverOverlay"
import GameStatBar from "./src/components/GameStatBar"
import {
  createEmptyField,
  FieldSize,
  GameState,
  addMinesToField,
  getFlagCount,
  getGameState,
  PatchCoordinate,
} from "./src/model/PlayingField"
import { revealMines, revealPatch } from "./src/model/Reveal"

function AppComponent() {
  const fieldSize: FieldSize = { width: 8, height: 10 }
  const mineCount = 10

  const [gameState, setGameState] = useState(GameState.Playing)
  const [field, setField] = useState(createEmptyField(fieldSize))
  const [firstReveal, setFirstReveal] = useState(true)
  const [startTime, setStartTime] = useState(0)
  const [playtime, setPlaytime] = useState(0)

  const remainingFlagCount = mineCount - getFlagCount(field)

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (gameState != GameState.Playing) return

      if (startTime == 0) {
        setPlaytime(0)
      } else {
        const playtime = Math.floor((new Date().getTime() - startTime) / 1000)
        setPlaytime(playtime)
      }
    }, 200)
    return () => clearInterval(intervalId)
  })

  const reveal = (coordinates: PatchCoordinate) => {
    if (firstReveal) {
      setFirstReveal(false)
      const initialField = revealPatch(
        addMinesToField(field, mineCount, coordinates),
        coordinates
      )
      setField(initialField)
      setStartTime(new Date().getTime())
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
      if (field[x][y].isFlagged) {
        field[x][y].isFlagged = false
      } else if (remainingFlagCount > 0) {
        field[x][y].isFlagged = true
      }
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
    setField(createEmptyField(fieldSize))
    setGameState(GameState.Playing)
    setStartTime(0)
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
      <View style={{ flex: 1, justifyContent: "center" }}>
        <GameStatBar flagsRemaining={remainingFlagCount} playtime={playtime} />
        <GameFieldView
          gameField={field}
          reveal={reveal}
          flag={flag}
          maxSize={viewSize}
          gameState={gameState}
          remainingFlagCount={remainingFlagCount}
        />
        {overlay}
      </View>
    </SafeAreaView>
  )
}

const App = CodePush({
  checkFrequency: CodePush.CheckFrequency.ON_APP_START,
  installMode: CodePush.InstallMode.IMMEDIATE,
})(AppComponent)
export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
})
