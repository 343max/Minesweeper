import { MaterialCommunityIcons } from "@expo/vector-icons"
import React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import {
  PatchCoordinate,
  VisiblePatch,
  Patch,
  getAdjacentMineCountFromVisiblePatch,
  GameState
} from "../model/PlayingField"
import { CallbackWithCoordinates } from "../model/CallbackWithCoordinates"

interface PatchViewContentProps {
  patch: VisiblePatch
  coordinates: PatchCoordinate
  sideLength: number
}

interface PatchViewProps extends PatchViewContentProps {
  reveal: CallbackWithCoordinates
  flag: CallbackWithCoordinates
  gameState: GameState
}

export default function PatchView({
  patch,
  coordinates,
  reveal,
  flag,
  sideLength,
  gameState
}: PatchViewProps) {
  const disabled =
    (patch != VisiblePatch.Grass && patch != VisiblePatch.Flag) ||
    gameState != GameState.Playing
  const revealable = patch != VisiblePatch.Flag
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={() => {
        if (revealable) {
          reveal(coordinates)
        }
      }}
      onLongPress={() => {
        flag(coordinates)
      }}
    >
      <PatchViewContent
        patch={patch}
        coordinates={coordinates}
        sideLength={sideLength}
      />
    </TouchableOpacity>
  )
}

function PatchViewContent({
  patch,
  coordinates,
  sideLength
}: PatchViewContentProps) {
  const sizeStyle = { width: sideLength, height: sideLength }
  const position = coordinates.x + coordinates.y
  const alternatingStyle = position % 2 == 0 ? evenStyle : oddStyle
  switch (patch) {
    case VisiblePatch.Grass:
      return <View style={[sizeStyle, style.box, alternatingStyle.grass]} />
    case VisiblePatch.Empty:
      return <View style={[sizeStyle, style.box, alternatingStyle.empty]} />
    case VisiblePatch.Mine:
      const colors = [
        "#008744",
        "#f4c20d",
        "#ed44b5",
        "#48e6f1",
        "#b648f2",
        "#f4840d",
        "#4885ed",
        "#f4c20d"
      ]
      const diameter = Math.round((sideLength * 0.4) / 2) * 2
      return (
        <View
          style={[
            sizeStyle,
            style.box,
            { backgroundColor: colors[position % colors.length] }
          ]}
        >
          <View
            style={{
              width: diameter,
              height: diameter,
              backgroundColor: "#000",
              opacity: 0.4,
              borderRadius: diameter / 2
            }}
          />
        </View>
      )
    case VisiblePatch.Flag:
      return (
        <View style={[sizeStyle, style.box, alternatingStyle.grass]}>
          <MaterialCommunityIcons
            name="flag"
            color="#f03507"
            size={Math.round(sideLength * 0.5)}
          />
        </View>
      )
    case VisiblePatch.AdjacentMine1:
    case VisiblePatch.AdjacentMine2:
    case VisiblePatch.AdjacentMine3:
    case VisiblePatch.AdjacentMine4:
    case VisiblePatch.AdjacentMine5:
    case VisiblePatch.AdjacentMine6:
    case VisiblePatch.AdjacentMine7:
    case VisiblePatch.AdjacentMine8:
      const mineCount = getAdjacentMineCountFromVisiblePatch(patch)
      const color = [
        "#1976d2",
        "#388e3c",
        "#f23607",
        "#7b1fa2",
        "#fd9006",
        "#0897a7",
        "#0897a7",
        "#0897a7"
      ]
      return (
        <View style={[sizeStyle, style.box, alternatingStyle.empty]}>
          <Text
            style={{
              color: color[mineCount - 1],
              fontWeight: "700",
              fontSize: sideLength * 0.5
            }}
          >{`${mineCount}`}</Text>
        </View>
      )
  }
}

const style = StyleSheet.create({
  box: {
    justifyContent: "center",
    alignItems: "center"
  }
})

const oddStyle = StyleSheet.create({
  grass: {
    backgroundColor: "#aad751"
  },
  empty: {
    backgroundColor: "#d7b899"
  }
})

const evenStyle = StyleSheet.create({
  grass: {
    backgroundColor: "#a2d149"
  },
  empty: {
    backgroundColor: "#e5c29f"
  }
})
