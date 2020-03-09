import React, { useState, ReactElement, Component } from "react"
import { View, Text, TouchableWithoutFeedback, UIManager } from "react-native"
import { FontAwesome } from "@expo/vector-icons"
import Popover, { Rect } from "react-native-popover-view"

export interface PopupMenuItem {
  id: string
  label: string
}

interface PopupMenuItemViewProps {
  item: PopupMenuItem
  selected: boolean
}

function PopupMenuItemView({ item, selected }: PopupMenuItemViewProps) {
  const [isHighlighted, setHighlighted] = useState(false)

  return (
    <View
      style={{ padding: 10, backgroundColor: isHighlighted ? "#000" : "#fff" }}
    >
      <TouchableWithoutFeedback
        onPressIn={() => setHighlighted(true)}
        onPressOut={() => setHighlighted(false)}
      >
        <Text style={{ color: isHighlighted ? "#fff" : "#000" }}>
          {item.label}
        </Text>
      </TouchableWithoutFeedback>
    </View>
  )
}

export interface PopupMenuProps {
  items: PopupMenuItem[]
  selected: string
}

interface ExpandedPopupMenuViewProps extends PopupMenuProps {
  collapse: () => void
  isVisible: boolean
  fromRect: Rect
}

function ExpandedPopupMenuView({
  items,
  selected,
  collapse,
  isVisible,
  fromRect,
}: ExpandedPopupMenuViewProps) {
  return (
    <Popover
      isVisible={isVisible}
      fromRect={fromRect}
      onRequestClose={collapse}
      animationConfig={{ duration: 120, toValue: 1 }}
    >
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 6,
        }}
      >
        {items.map(item => {
          return (
            <PopupMenuItemView
              item={item}
              selected={item.id == selected}
              key={item.id}
            />
          )
        })}
      </View>
    </Popover>
  )
}

export default function PopupMenu({ items, selected }: PopupMenuProps) {
  const selectedIndex = items.findIndex(item => {
    return item.id == selected
  })
  const selectedItem = items[selectedIndex]

  const [isHighlighted, setHighlighted] = useState(false)
  const [isExpanded, setExpanded] = useState(false)
  const [fromRect, setFromRect] = useState(new Rect(0, 0, 0, 0))

  const bgColor = isHighlighted ? "#000" : "#fff"
  const fgColor = isHighlighted ? "#fff" : "#000"

  let outerView = null

  let fromView = null

  return (
    <View
      style={{
        backgroundColor: bgColor,
        padding: 10,
        borderRadius: 6,
      }}
      ref={ref => (fromView = ref)}
      onLayout={event => {
        // @ts-ignore: TypeScript doesn't know about event.target
        const target = event.target
        UIManager.measure(target, (x, y, width, height, pageX, pageY) => {
          setFromRect(new Rect(pageX, pageY, width, height))
        })
      }}
    >
      <TouchableWithoutFeedback
        onPressIn={() => setHighlighted(true)}
        onPressOut={() => setHighlighted(false)}
        onPress={() => setExpanded(true)}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ color: fgColor }}>{selectedItem.label}</Text>
          <View style={{ marginLeft: 5 }}>
            <FontAwesome name="angle-down" color={fgColor} />
          </View>
        </View>
      </TouchableWithoutFeedback>
      <ExpandedPopupMenuView
        items={items}
        selected={selected}
        collapse={() => setExpanded(false)}
        isVisible={isExpanded}
        fromRect={fromRect}
      />
    </View>
  )
}
