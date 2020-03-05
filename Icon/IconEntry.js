import "expo/build/Expo.fx"
import registerRootComponent from "expo/build/launch/registerRootComponent"
import { activateKeepAwake } from "expo-keep-awake"

import Icon from "./Icon"

if (__DEV__) {
  activateKeepAwake()
}

console.log(process.argv)

registerRootComponent(Icon)
