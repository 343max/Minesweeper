import React from "react"
import { View } from "react-native"
import {
  FieldState,
  getVisibleField,
  VisiblePatch,
  VisibleField
} from "../model/Field"
import PatchView from "./PatchView"

interface ColumnViewProp {
  column: VisiblePatch[]
  index: number
}

function ColumnView({ column, index }: ColumnViewProp) {
  return (
    <View style={{ flex: 1, flexDirection: "column" }}>
      {column.map((patch, row) => {
        return <PatchView patch={patch} coordinates={{ x: index, y: row }} />
      })}
    </View>
  )
}

interface GameFieldViewProps {
  gameField: FieldState
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

export default function GameFieldView({ gameField }: GameFieldViewProps) {
  const visibleField = getVisibleField(gameField)
  // const visibleField = testField
  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      {visibleField.map((column, index) => {
        return <ColumnView column={column} index={index} />
      })}
    </View>
  )
}
