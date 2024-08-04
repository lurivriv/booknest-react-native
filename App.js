import { StyleSheet, SafeAreaView, StatusBar, Platform } from "react-native"
import { useFonts } from "expo-font"
import Toast from "react-native-toast-message"
import { Provider } from "react-redux"
import store from "./src/store"
import { colors } from "./src/global/colors.js"
import { initSQLiteDB } from "./src/persistence/index.js"
import { Navigator } from "./src/navigation/Navigator.jsx"

(async () => {
  try {
    const response = await initSQLiteDB()
  } catch (error) {
    Toast.show({
      type: "error",
      text1: "Ocurrió problema con la base de datos",
      text2: "Por favor, intenta de nuevo",
      text1Style: styles.toastText,
      text2Style: styles.toastText,
      position: "bottom",
      bottomOffset: 72
    })
  }
})()

export default function App() {
  StatusBar.setBackgroundColor(colors.black)
  StatusBar.setBarStyle("light-content")

  const [fontsLoaded, fontError] = useFonts({
    "Roboto-regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-regular-italic": require("./assets/fonts/Roboto-Italic.ttf"),
    "Roboto-medium": require("./assets/fonts/Roboto-Medium.ttf")
  })

  if (!fontsLoaded && !fontError) {
    return null
  }

  return (
    <SafeAreaView style={styles.container}>
      <Provider store={store}>
        <Navigator />
      </Provider>
      <Toast />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: colors.black
  },
  toastText: {
    fontFamily: "Roboto-regular",
    fontSize: 14,
    color: colors.darkGray
  }
})