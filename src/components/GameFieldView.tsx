import React from "react"
import { View } from "react-native"
import { CallbackWithCoordinates } from "../model/CallbackWithCoordinates"
import {
  FieldState,
  getFieldSize,
  getVisibleField,
  GameState
} from "../model/PlayingField"
import { ColumnView } from "./ColumnView"
import GameStatBar from "./GameStatBar"

export interface Size {
  width: number
  height: number
}

interface GameFieldViewProps {
  gameField: FieldState
  reveal: CallbackWithCoordinates
  flag: CallbackWithCoordinates
  maxSize: Size
  gameState: GameState
  remainingFlagCount: number
}

export default function GameFieldView({
  gameField,
  reveal,
  flag,
  maxSize,
  gameState,
  remainingFlagCount
}: GameFieldViewProps) {
  const visibleField = getVisibleField(gameField)

  const sideLength = (() => {
    const fieldSize = getFieldSize(gameField)
    return Math.floor(
      Math.min(
        maxSize.width / fieldSize.width,
        maxSize.height / fieldSize.height
      )
    )
  })()

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <GameStatBar flagsRemaining={remainingFlagCount} />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          alignContent: "center"
        }}
      >
        {visibleField.map((column, index) => {
          return (
            <ColumnView
              column={column}
              index={index}
              reveal={reveal}
              flag={flag}
              key={`${index}`}
              sideLength={sideLength}
              gameState={gameState}
            />
          )
        })}
      </View>
    </View>
  )
}
