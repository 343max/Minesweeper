import React from "react"
import { View, ViewProps } from "react-native"
import { CallbackWithCoordinates } from "../model/CallbackWithCoordinates"
import {
  FieldState,
  getVisibleField,
  VisibleField,
  VisiblePatch,
  getFieldSize
} from "../model/PlayingField"
import PatchView from "./PatchView"

interface ColumnViewProp {
  column: VisiblePatch[]
  index: number
  reveal: CallbackWithCoordinates
  flag: CallbackWithCoordinates
  sideLength: number
}

function ColumnView({
  column,
  index,
  reveal,
  flag,
  sideLength
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
          />
        )
      })}
    </View>
  )
}

export interface Size {
  width: number
  height: number
}

interface GameFieldViewProps {
  gameField: FieldState
  reveal: CallbackWithCoordinates
  flag: CallbackWithCoordinates
  maxSize: Size
}

export default function GameFieldView({
  gameField,
  reveal,
  flag,
  maxSize,
  onLayout
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
            sideLength={sideLength}
          />
        )
      })}
    </View>
  )
}
