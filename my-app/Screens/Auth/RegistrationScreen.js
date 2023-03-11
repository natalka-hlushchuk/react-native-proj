import React from "react";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/config";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ImageBackground,
  Image,
} from "react-native";
import { authSignUpUser } from "../../redux/auth/authOperations";
import { useDispatch } from "react-redux";
import { AntDesign } from "@expo/vector-icons";

export default function RegisrationScreen({ navigation }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [showPass, setShowPass] = useState(true);
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState({
    email: false,
    login: false,
    password: false,
  });

  const dispatch = useDispatch();
  const handleSetLogin = (text) => setLogin(text);
  const handleSetEmail = (text) => setEmail(text);
  const handleSetPassword = (text) => setPassword(text);
  const formReset = () => {
    setLogin("");
    setAvatar(null);
    setEmail("");
    setPassword("");
  };

  const uploadPhoto = async () => {
    try {
      const response = await fetch(avatar);
      const file = await response.blob();
      await uploadBytes(ref(storage, `avatars/${file._data.blobId}`), file);
      const photoUrl = await getDownloadURL(
        ref(storage, `avatars/${file._data.blobId}`)
      );
      return photoUrl;
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async () => {
    Keyboard.dismiss();
    if (email === "" || password === "" || login === "")
      return console.log("Неможливо зареєструватися");

    const avatar = await uploadPhoto();
    dispatch(authSignUpUser({ email, password, login, avatar }));
    formReset();
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setAvatar(result.assets[0].uri);
    }
  };
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ImageBackground
          style={styles.image}
          source={require("../../assets/bg-3x.png")}
        >
          <KeyboardAvoidingView>
            <View
              style={{
                ...styles.form,
                paddingBottom: isShowKeyboard ? 32 : 78,
              }}
            >
              <View style={styles.photoWrap}>
                <Image source={{ uri: avatar }} style={styles.avatarImg} />
                {avatar ? (
                  <TouchableOpacity
                    onPress={() => {
                      setAvatar(null);
                    }}
                  >
                    <View style={styles.removeAvatarIcon}>
                      <AntDesign
                        name="closecircleo"
                        size={25}
                        color="#E8E8E8"
                      />
                    </View>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={pickImage}>
                    <View style={styles.addAvatarIcon}>
                      <AntDesign name="pluscircleo" size={25} color="#FF6C00" />
                    </View>
                  </TouchableOpacity>
                )}
              </View>
              <Text style={styles.formTitle}>Реєстрація</Text>
              <View style={{ paddingBottom: isShowKeyboard ? 0 : 43 }}>
                <TextInput
                  style={{
                    ...styles.input,
                    borderColor: isActive.login ? "#FF6C00" : "#E8E8E8",
                    backgroundColor: isActive.login ? "#FFFFFF" : "#F6F6F6",
                  }}
                  value={login}
                  placeholder={"Логін"}
                  placeholderTextColor={"#BDBDBD"}
                  onChangeText={handleSetLogin}
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
                    borderColor: isActive.email ? "#FF6C00" : "#E8E8E8",
                    backgroundColor: isActive.email ? "#FFFFFF" : "#F6F6F6",
                  }}
                  value={email}
                  placeholder={"Адреса електронної пошти"}
                  placeholderTextColor={"#BDBDBD"}
                  onChangeText={handleSetEmail}
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
                      borderColor: isActive.password ? "#FF6C00" : "#E8E8E8",
                      backgroundColor: isActive.password
                        ? "#FFFFFF"
                        : "#F6F6F6",
                      marginBottom: 0,
                    }}
                    value={password}
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
                    onChangeText={handleSetPassword}
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
                    onPress={handleSubmit}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.textButton}>Зареєструватися</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.textLogWrap}>
                  <Text
                    style={styles.textLog}
                    onPress={() => navigation.navigate("Login")}
                  >
                    Вже є акаунт? Ввійти
                  </Text>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
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
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    position: "absolute",
    justifyContent: "center",
    top: -60,
    left: 122,
  },
  avatarImg: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  addAvatarIcon: {
    position: "absolute",
    right: -13,
    bottom: 14,
  },
  removeAvatarIcon: {
    position: "absolute",
    right: -13,
    bottom: 14,
    backgroundColor: "#fff",
    borderRadius: 50,
  },
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
    marginBottom: 16,
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
