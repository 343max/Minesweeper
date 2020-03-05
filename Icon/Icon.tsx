import React, { useState } from "react"
import { View, LayoutChangeEvent } from "react-native"
import { FieldState, GameState } from "../src/model/PlayingField"
import GameFieldView, { Size } from "../src/components/GameFieldView"

export default function Icon() {
  const field: FieldState = [
    [
      { isMine: true, isFlagged: false, isRevealed: true },
      { isMine: false, isFlagged: false, isRevealed: false },
      { isMine: true, isFlagged: false, isRevealed: false }
    ],
    [
      { isMine: false, isFlagged: false, isRevealed: false },
      { isMine: true, isFlagged: true, isRevealed: false },
      { isMine: false, isFlagged: false, isRevealed: true }
    ],
    [
      { isMine: false, isFlagged: false, isRevealed: false },
      { isMine: false, isFlagged: false, isRevealed: true },
      { isMine: false, isFlagged: false, isRevealed: true }
    ]
  ]

  const [viewSize, setViewSize] = useState<Size>({ width: 0, height: 0 })
  const onLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout

    const fieldWidth = field.length
    const actualWidth = Math.ceil(width / fieldWidth) * fieldWidth

    setViewSize({ width: actualWidth, height: actualWidth })
  }

  return (
    <View onLayout={onLayout}>
      <GameFieldView
        gameField={field}
        maxSize={viewSize}
        reveal={() => {}}
        flag={() => {}}
        gameState={GameState.Playing}
        remainingFlagCount={0}
      />
    </View>
  )
}
