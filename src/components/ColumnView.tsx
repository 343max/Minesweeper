import React from "react"
import { View } from "react-native"
import { CallbackWithCoordinates } from "../model/CallbackWithCoordinates"
import { VisiblePatch, GameState } from "../model/PlayingField"
import PatchView from "./PatchView"

interface ColumnViewProp {
  column: VisiblePatch[]
  index: number
  reveal: CallbackWithCoordinates
  flag: CallbackWithCoordinates
  sideLength: number
  gameState: GameState
}

export function ColumnView({
  column,
  index,
  reveal,
  flag,
  sideLength,
  gameState
}: ColumnViewProp) {
  return (
    <View style={{ flexDirection: "column" }}>
      {column.map((patch, row) => {
        return (
          <PatchView
            key={`${index}, ${row}`}
            patch={patch}
            coordinates={{ x: index, y: row }}
            reveal={reveal}
            flag={flag}
            sideLength={sideLength}
            gameState={gameState}
          />
        )
      })}
    </View>
  )
}
