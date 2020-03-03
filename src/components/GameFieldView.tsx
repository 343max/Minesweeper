import React from "react"
import { View } from "react-native"
import {
  FieldState,
  getVisibleField,
  VisiblePatch,
  VisibleField
} from "../model/Field"
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
  [VisiblePatch.Grass, VisiblePatch.Empty, VisiblePatch.Bomb],
  [VisiblePatch.Flag, VisiblePatch.AdjacentBomb1, VisiblePatch.AdjacentBomb2],
  [
    VisiblePatch.AdjacentBomb3,
    VisiblePatch.AdjacentBomb4,
    VisiblePatch.AdjacentBomb5
  ],
  [
    VisiblePatch.AdjacentBomb6,
    VisiblePatch.AdjacentBomb7,
    VisiblePatch.AdjacentBomb8
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
