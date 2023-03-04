import React, { useCallback } from "react";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

const initialState = {
  login: "",
  email: "",
  password: "",
};
export default function RegisrationScreen() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [showPass, setShowPass] = useState(false);
  const [active, setIsActive] = useState({
    email: false,
    login: false,
    password: false,
  });
  const [fontsLoaded] = useFonts({
    "Roboto-400": require("../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-500": require("../assets/fonts/Roboto-Medium.ttf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const keyboardHide = () => {
    Keyboard.dismiss();
    console.log(state);
    setState(initialState);
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView>
        <View
          style={{ ...styles.form, paddingBottom: isShowKeyboard ? 32 : 78 }}
          onLayout={onLayoutRootView}
        >
          <View style={styles.photoWrap}></View>
          <Text style={styles.formTitle}>Реєстрація</Text>
          <View style={{ gap: 16, paddingBottom: isShowKeyboard ? 0 : 43 }}>
            <TextInput
              style={{
                ...styles.input,
                borderColor: active.login ? "#FF6C00" : "#E8E8E8",
              }}
              value={state.login}
              placeholder={"Логін"}
              placeholderTextColor={"#BDBDBD"}
              onChangeText={(value) =>
                setState((prevState) => ({ ...prevState, login: value }))
              }
              onFocus={() => {
                setIsShowKeyboard(true);
                setIsActive((prevState) => ({
                  ...prevState,
                  login: true,
                }));
              }}
              onBlur={() => {
                setIsShowKeyboard(false);
                setIsActive((prevState) => ({
                  ...prevState,
                  login: false,
                }));
              }}
            />
            <TextInput
              style={{
                ...styles.input,
                borderColor: active.email ? "#FF6C00" : "#E8E8E8",
              }}
              value={state.email}
              placeholder={"Адреса електронної пошти"}
              placeholderTextColor={"#BDBDBD"}
              onChangeText={(value) =>
                setState((prevState) => ({ ...prevState, email: value }))
              }
              onFocus={() => {
                setIsShowKeyboard(true);
                setIsActive((prevState) => ({
                  ...prevState,
                  email: true,
                }));
              }}
              onBlur={() => {
                setIsShowKeyboard(false);
                setIsActive((prevState) => ({
                  ...prevState,
                  email: false,
                }));
              }}
            />
            <View style={styles.inputWrap}>
              <TextInput
                style={{
                  ...styles.input,
                  borderColor: active.password ? "#FF6C00" : "#E8E8E8",
                }}
                value={state.password}
                placeholder={"Пароль"}
                placeholderTextColor={"#BDBDBD"}
                onFocus={() => {
                  setIsShowKeyboard(true);
                  setIsActive((prevState) => ({
                    ...prevState,
                    password: true,
                  }));
                }}
                onBlur={() => {
                  setIsShowKeyboard(false);
                  setIsActive((prevState) => ({
                    ...prevState,
                    password: false,
                  }));
                }}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, password: value }))
                }
                secureTextEntry={showPass}
              />
              <Text
                style={styles.show}
                onPress={() => {
                  setShowPass(!showPass);
                }}
              >
                Показати
              </Text>
            </View>
          </View>
          <View style={{ display: `${isShowKeyboard ? "none" : "flex"}` }}>
            <View style={{ paddingBottom: 16 }}>
              <TouchableOpacity
                style={styles.button}
                onPress={keyboardHide}
                activeOpacity={0.7}
              >
                <Text style={styles.textButton}>Зареєструватися</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.textLogWrap}>
              <Text style={styles.textLog}>Вже є акаунт? Ввійти</Text>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  form: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 92,
    paddingRight: 16,
    paddingLeft: 16,
    paddingBottom: 78,
  },
  photoWrap: {
    // width: 120,
    // height: 120,
    // backgroundColor: "#F6F6F6",
    // borderRadius: 16,
    // // position: "absolute",
    // justifyContent: "center",
  },
  // titleWrap: {  },
  formTitle: {
    paddingBottom: 32,
    fontSize: 30,
    fontFamily: "Roboto-500",
    textAlign: "center",
    fontWeight: "500",
    letterSpacing: 0.01,
    color: "#212121",
  },
  input: {
    fontFamily: "Roboto-400",
    backgroundColor: "#F6F6F6",
    padding: 16,
    borderColor: "#E8E8E8",
    borderStyle: "solid",
    borderRadius: 8,
    borderWidth: 1,
    color: "#212121",
    height: 50,
  },
  inputWrap: {},
  show: {
    position: "absolute",
    right: 16,
    top: 13,
    fontFamily: "Roboto-400",
    fontWeight: "400",
    fontSize: 16,
    textAlign: "right",
    color: "#1B4371",
  },
  button: {
    alignItems: "center",
    paddingTop: 16,
    paddingRight: 32,
    paddingBottom: 16,
    paddingLeft: 32,
    gap: 12,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },
  textButton: {
    fontFamily: "Roboto-400",
    color: "#FFFFFF",
    fontSize: 16,
  },
  textLogWrap: {},
  textLog: {
    fontFamily: "Roboto-400",
    fontWeight: "400",
    fontSize: 16,
    textAlign: "center",
    color: "#1B4371",
  },
});
