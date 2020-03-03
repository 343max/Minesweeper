import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { Patch, PatchCoordinate, VisiblePatch } from "../model/Field"
import { MaterialCommunityIcons } from "@expo/vector-icons"

interface PatchViewProp {
  patch: VisiblePatch
  coordinates: PatchCoordinate
}

export default function PatchView({ patch, coordinates }: PatchViewProp) {
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
      return (
        <View
          style={[
            style.box,
            { backgroundColor: colors[position % colors.length] }
          ]}
        >
          <MaterialCommunityIcons
            name="bomb"
            size="40"
            color="#000"
            style={{ opacity: 0.4 }}
          />
        </View>
      )
    case VisiblePatch.Flag:
      return (
        <View style={[style.box, alternatingStyle.grass]}>
          <MaterialCommunityIcons name="flag" color="#f03507" size="40" />
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
