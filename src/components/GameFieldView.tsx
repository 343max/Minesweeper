import React from "react"
import { View } from "react-native"
import {
  FieldState,
  getVisibleField,
  VisiblePatch,
  VisibleField
} from "../model/PlayingField"
import PatchView from "./PatchView"
import { CallbackWithCoordinates } from "../model/CallbackWithCoordinates"

interface ColumnViewProp {
  column: VisiblePatch[]
  index: number
  reveal: CallbackWithCoordinates
  flag: CallbackWithCoordinates
}

function ColumnView({ column, index, reveal, flag }: ColumnViewProp) {
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
          />
        )
      })}
    </View>
  )
}

interface GameFieldViewProps {
  gameField: FieldState
  reveal: CallbackWithCoordinates
  flag: CallbackWithCoordinates
}

const testField: VisibleField = [
  [VisiblePatch.Grass, VisiblePatch.Empty, VisiblePatch.Mine],
  [VisiblePatch.Flag, VisiblePatch.AdjacentMine1, VisiblePatch.AdjacentMine2],
  [
    VisiblePatch.AdjacentMine3,
    VisiblePatch.AdjacentMine4,
    VisiblePatch.AdjacentMine5
  ],
  [
    VisiblePatch.AdjacentMine6,
    VisiblePatch.AdjacentMine7,
    VisiblePatch.AdjacentMine8
  ]
]

export default function GameFieldView({
  gameField,
  reveal,
  flag
}: GameFieldViewProps) {
  const visibleField = getVisibleField(gameField)
  // const visibleField = testField
  return (
    <View
      style={{
        flex: 1,
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
          />
        )
      })}
    </View>
  )
}
