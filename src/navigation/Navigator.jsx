import { useEffect } from "react"
import { StyleSheet } from "react-native"
import { useSelector, useDispatch } from "react-redux"
import { NavigationContainer } from "@react-navigation/native"
import Toast from "react-native-toast-message"
import { colors } from "../global/colors.js"
import { getSession } from "../persistence/index.js"
import { setUser } from "../features/User/UserSlice.js"
import { AuthStackNavigator } from "./AuthStackNavigator.jsx"
import { BottomTabNavigator } from "./BottomTabNavigator.jsx"

export const Navigator = () => {
  const { user } = useSelector(state => state.auth.value)
  const dispatch = useDispatch()

  useEffect(() => {
    (async () => {
      try {
        const response = await getSession()

        if (response.rows.length) {
          const user = response.rows._array[0]
          dispatch(setUser({
            email: user.email,
            idToken: user.token,
            localId: user.localId
          }))
        }
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Error al obtener la sesión",
          text2: "Por favor, intenta de nuevo",
          text1Style: styles.toastText,
          text2Style: styles.toastText,
          position: "bottom",
          bottomOffset: 72
        })
      }
    })()
  })

  return (
    <NavigationContainer>
      {user ? <BottomTabNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  toastText: {
    fontFamily: "Roboto-regular",
    fontSize: 14,
    color: colors.darkGray
  }
})