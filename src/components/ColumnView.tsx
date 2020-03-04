import React from "react"
import { View } from "react-native"
import { CallbackWithCoordinates } from "../model/CallbackWithCoordinates"
import { VisiblePatch } from "../model/PlayingField"
import PatchView from "./PatchView"

interface ColumnViewProp {
  column: VisiblePatch[]
  index: number
  reveal: CallbackWithCoordinates
  flag: CallbackWithCoordinates
  sideLength: number
}

export function ColumnView({
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
