import { useState, useEffect } from "react"
import { StyleSheet, View, Text, Image } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { useDispatch } from "react-redux"
import Toast from "react-native-toast-message"
import { colors } from "../global/colors.js"
import { insertSession } from "../persistence/index.js"
import { useSignInMutation } from "../services/authService.js"
import { setUser } from "../features/User/UserSlice.js"
import { loginSchema } from "../validations/sessionSchema.js"
import { InputForm } from "../components/InputForm.jsx"
import { CustomButton } from "../components/CustomButton.jsx"

export const Login = ({ navigation }) => {
  const [email, setEmail] = useState("")
  const [errorEmail, setErrorEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorPassword, setErrorPassword] = useState("")

  const [triggerSignIn, { data, isSuccess }] = useSignInMutation()
  const dispatch = useDispatch()

  useEffect(() => {
    if (data && isSuccess) {
      insertSession({
        email: data.email,
        token: data.idToken,
        localId: data.localId
      }).then((response) => {
        dispatch(
          setUser({
            email: data.email,
            idToken: data.idToken,
            localId: data.localId
          })
        )
      }).catch(err => {
        Toast.show({
          type: "error",
          text1: "Error al iniciar sesión",
          text2: "Por favor, intenta de nuevo",
          text1Style: styles.toastText,
          text2Style: styles.toastText,
          position: "bottom",
          bottomOffset: 72
        })
      })
    }
  }, [isSuccess, data])

  const onSubmit = async () => {
    try {
      setErrorEmail("")
      setErrorPassword("")

      loginSchema.validateSync({ email, password }, { abortEarly: false })
      await triggerSignIn({ email, password, returnSecureToken: true }).unwrap()
    } catch (error) {
      if (error.data?.error?.message === "INVALID_LOGIN_CREDENTIALS") {
        setErrorEmail("Email o contraseña incorrectos")
        setErrorPassword("Email o contraseña incorrectos")
      }
      
      if (error.inner) {
        error.inner.forEach(err => {
          switch (err.path) {
            case "email":
              setErrorEmail(err.message)
              break
            case "password":
              setErrorPassword(err.message)
              break
            default:
              break
          }
        })
      }
    }
  }

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.mainContainer} keyboardShouldPersistTaps="handled">
      <Image source={require("../../assets/logo.png")} style={styles.logo} />
      <View style={styles.container}>
        <Text style={styles.title}>Iniciar sesión</Text>
        <View style={styles.formContainer}>
          <InputForm
            label={"Email"}
            onChange={setEmail}
            error={errorEmail}
          />
          <InputForm
            label={"Contraseña"}
            onChange={setPassword}
            error={errorPassword}
            isSecure={true}
          />
          <CustomButton
            styleContainer={styles.submitBtnContainer}
            onPress={onSubmit}
            title="Iniciar sesión"
          />
        </View>
        <View>
          <Text style={styles.subSignup}>¿Todavía no tienes una cuenta?</Text>
          <CustomButton
            style={styles.subSignupBtn}
            styleContainer={styles.subSignupBtnContainer}
            styleText={styles.subSignupBtnText}
            onPress={() => navigation.navigate("Signup")}
            title="Crear cuenta"
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: colors.black,
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  logo: {
    width: "100%",
    maxWidth: 300,
    height: 90,
    marginVertical: 20,
    resizeMode: "contain"
  },
  container: {
    width: "100%",
    maxWidth: 400,
    paddingVertical: 20,
    backgroundColor: colors.darkGray,
    borderRadius: 10,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  title: {
    fontFamily: "Roboto-regular",
    fontSize: 24,
    color: colors.white
  },
  formContainer: {
    width: "100%",
    marginTop: 14,
    marginBottom: 40,
    alignItems: "center"
  },
  submitBtnContainer: {
    width: "50%",
    margin: 0,
    marginTop: 10
  },
  subSignup: {
    fontFamily: "Roboto-regular",
    fontSize: 15,
    color: colors.white
  },
  subSignupBtnContainer: {
    margin: 0
  },
  subSignupBtn: {
    width: "auto",
    height: "auto",
    paddingVertical: 8,
    backgroundColor: colors.darkGray
  },
  subSignupBtnText: {
    color: colors.skyBlue,
    textDecorationLine: "underline"
  },
  toastText: {
    fontFamily: "Roboto-regular",
    fontSize: 14,
    color: colors.darkGray
  }
})