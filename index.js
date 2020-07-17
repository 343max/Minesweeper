import { AppRegistry } from "react-native"
import App from "./App"
import { name as appName } from "./app.json"
import { previewingRootComponent } from "react-native-previewing"

AppRegistry.registerComponent(appName, () => {
  const { preview } = require("./preview_temp.js")
  return (__DEV__ && previewingRootComponent(preview)) || App
})
