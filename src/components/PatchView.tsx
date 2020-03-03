import { MaterialCommunityIcons } from "@expo/vector-icons"
import React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { PatchCoordinate, VisiblePatch, Patch } from "../model/Field"
import { CallbackWithCoordinates } from "../model/CallbackWithCoordinates"

interface PatchViewContentProps {
  patch: VisiblePatch
  coordinates: PatchCoordinate
}

interface PatchViewProps extends PatchViewContentProps {
  reveal: CallbackWithCoordinates
  flag: CallbackWithCoordinates
}

export default function PatchView({
  patch,
  coordinates,
  reveal,
  flag
}: PatchViewProps) {
  const disabled = patch != VisiblePatch.Grass && patch != VisiblePatch.Flag
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={() => {
        reveal(coordinates)
      }}
      onLongPress={() => {
        flag(coordinates)
      }}
    >
      <PatchViewContent patch={patch} coordinates={coordinates} />
    </TouchableOpacity>
  )
}

function PatchViewContent({ patch, coordinates }: PatchViewContentProps) {
  const position = coordinates.x + coordinates.y
  const alternatingStyle = position % 2 == 0 ? evenStyle : oddStyle
  switch (patch) {
    case VisiblePatch.Grass:
      return <View style={[style.box, alternatingStyle.grass]} />
    case VisiblePatch.Empty:
      return <View style={[style.box, alternatingStyle.empty]} />
    case VisiblePatch.Bomb:
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
      const diameter = 12
      return (
        <View
          style={[
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
        <View style={[style.box, alternatingStyle.grass]}>
          <MaterialCommunityIcons name="flag" color="#f03507" size={20} />
        </View>
      )
    case VisiblePatch.AdjacentBomb1:
    case VisiblePatch.AdjacentBomb2:
    case VisiblePatch.AdjacentBomb3:
    case VisiblePatch.AdjacentBomb4:
    case VisiblePatch.AdjacentBomb5:
    case VisiblePatch.AdjacentBomb6:
    case VisiblePatch.AdjacentBomb7:
    case VisiblePatch.AdjacentBomb8:
      const index = [
        VisiblePatch.AdjacentBomb1,
        VisiblePatch.AdjacentBomb2,
        VisiblePatch.AdjacentBomb3,
        VisiblePatch.AdjacentBomb4,
        VisiblePatch.AdjacentBomb5,
        VisiblePatch.AdjacentBomb6,
        VisiblePatch.AdjacentBomb7,
        VisiblePatch.AdjacentBomb8
      ].indexOf(patch)
      const color = [
        "#1976d2",
        "#388e3c",
        "#f23607",
        "#f23607",
        "#f23607",
        "#f23607",
        "#f23607",
        "#f23607"
      ]
      return (
        <View style={[style.box, alternatingStyle.empty]}>
          <Text style={{ color: color[index], fontWeight: "700" }}>{`${index +
            1}`}</Text>
        </View>
      )
  }
}

const style = StyleSheet.create({
  box: {
    width: 30,
    height: 30,
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
