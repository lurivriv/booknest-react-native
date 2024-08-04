import { StyleSheet, View, Text } from "react-native"
import { useSelector, useDispatch } from "react-redux"
import Toast from "react-native-toast-message"
import { colors } from "../../global/colors.js"
import { truncateSessionTable } from "../../persistence/index.js"
import { clearUser } from "../../features/User/UserSlice.js"
import { ImageProfilePicker } from "../../components/Profile/ImageProfilePicker.jsx"
import { FavoriteBooks } from "../../components/Home/FavoriteBooks.jsx"
import { CustomButton } from "../../components/CustomButton.jsx"

export const Profile = ({ navigation }) => {
  const { localId, user } = useSelector(state => state.auth.value)
  const dispatch = useDispatch()

  const signOut = async () => {
    try {
      const response = await truncateSessionTable()
      dispatch(clearUser())
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error al cerrar sesión",
        text2: "Por favor, intenta de nuevo",
        text1Style: styles.toastText,
        text2Style: styles.toastText,
        position: "bottom",
        bottomOffset: 72
      })
    }
  }

  return (
    <View style={styles.container}>
      <ImageProfilePicker navigation={navigation} localId={localId}  />
      <Text style={styles.emailText}>{user}</Text>
      <FavoriteBooks style={styles.favoritesContainer} navigation={navigation} />
      <CustomButton
        title="Cerrar sesión"
        onPress={signOut}
        style={styles.btnSignOut}
        styleContainer={styles.btnSignOutContainer}
        styleText={styles.btnSignOutText}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    backgroundColor: colors.black,
    alignItems: "center"
  },
  emailText: {
    fontFamily: "Roboto-medium",
    fontSize: 20,
    marginVertical: 30,
    color: colors.white
  },
  favoritesContainer: {
    height: 250
  },
  btnSignOutContainer: {
    margin: 0,
    position: "absolute",
    bottom: 20
  },
  btnSignOut: {
    width: "auto",
    height: "auto",
    paddingVertical: 8,
    backgroundColor: colors.black
  },
  btnSignOutText: {
    color: colors.red,
    textDecorationLine: "underline"
  },
  toastText: {
    fontFamily: "Roboto-regular",
    fontSize: 14,
    color: colors.darkGray
  }
})