import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import * as MediaLibrary from "expo-media-library";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
const initialState = {
  label: "",
  place: "",
};

const CreatePostsScreen = ({ navigation }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);
  const keyboardHide = () => {
    Keyboard.dismiss();
    console.log(state);
    setState(initialState);
  };

  const takePhoto = async () => {
    try {
      const photo = await cameraRef.takePictureAsync();
      setPhoto(photo.uri);
      console.log(photo);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      console.log(coords);
      setLocation(coords);
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  const resetPhoto = () => {
    setPhoto(null);
    setLocation(null);
  };

  const sendPost = () => {
    if (!photo) return;
    console.log(navigation);
    console.log(photo);
    navigation.navigate("Всі публікації");
    resetPhoto();
    setState(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        {!photo ? (
          <Camera
            ref={setCameraRef}
            style={{
              ...styles.photoWrap,
              display: isShowKeyboard ? "none" : "flex",
            }}
          >
            <View style={styles.camWrap}>
              <TouchableOpacity style={styles.camBatton} onPress={takePhoto}>
                <FontAwesome name="camera" size={24} color="#BDBDBD" />
              </TouchableOpacity>
            </View>
          </Camera>
        ) : (
          <View>
            <ImageBackground
              source={{ uri: photo }}
              style={{
                ...styles.photoWrap,
                display: isShowKeyboard ? "none" : "flex",
              }}
            >
              <TouchableOpacity style={styles.camBatton} onPress={resetPhoto}>
                <FontAwesome name="camera" size={24} color="white" />
              </TouchableOpacity>
            </ImageBackground>
          </View>
        )}

        <Text
          style={{
            ...styles.photoText,
            display: isShowKeyboard ? "none" : "flex",
          }}
        >
          {!photo ? "Завантажте фото" : "Редагуйте фото"}
        </Text>
        <KeyboardAvoidingView>
          <View
            style={{
              ...styles.form,
              paddingBottom: isShowKeyboard ? 32 : 78,
            }}
          >
            <View style={{ ...styles.inputWrap, marginBottom: 16 }}>
              <TextInput
                style={{
                  ...styles.input,
                  fontFamily: "Roboto-500",
                }}
                value={state.label}
                placeholder={"Назва"}
                placeholderTextColor={"#BDBDBD"}
                onChangeText={(value) =>
                  setState((prevState) => ({
                    ...prevState,
                    label: value,
                  }))
                }
                onFocus={() => {
                  setIsShowKeyboard(true);
                }}
                onBlur={() => {
                  setIsShowKeyboard(false);
                }}
              />
            </View>
            <View style={{ ...styles.inputWrap }}>
              <TextInput
                style={{
                  ...styles.input,
                  marginBottom: 32,
                  paddingLeft: 28,
                }}
                value={state.place}
                placeholder={"Місцевість"}
                placeholderTextColor={"#BDBDBD"}
                onChangeText={(value) =>
                  setState((prevState) => ({
                    ...prevState,
                    place: value,
                  }))
                }
                onFocus={() => {
                  setIsShowKeyboard(true);
                }}
                onBlur={() => {
                  setIsShowKeyboard(false);
                }}
              />
              <Ionicons
                name="location-outline"
                size={24}
                color="#BDBDBD"
                style={styles.icon}
              />
            </View>
            <View>
              <TouchableOpacity
                style={{
                  ...styles.button,
                  backgroundColor: photo ? "#FF6C00" : "#F6F6F6",
                }}
                onPress={sendPost}
                activeOpacity={0.7}
              >
                <Text
                  style={{
                    ...styles.textButton,
                    color: photo ? "#FFFFFF" : "#BDBDBD",
                  }}
                >
                  Опублікувати
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "white",
  },
  photoWrap: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    color: "#F6F6F6",
    marginBottom: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  camWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "#FFFFFF",
  },
  camBatton: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: " rgba(255, 255, 255, 0.3);",
  },
  userWrap: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    marginBottom: 8,
  },

  photoText: {
    fontFamily: "Roboto-400",
    fontWeight: "400",
    fontSize: 16,
    color: "#BDBDBD",
  },
  // form: {
  //   backgroundColor: "#FFFFFF",
  //   // borderTopLeftRadius: 25,
  //   // borderTopRightRadius: 25,
  // },
  inputWrap: {
    flex: 1,
    alignItems: "center",
  },
  input: {
    fontFamily: "Roboto-400",
    padding: 16,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    color: "#212121",
    height: 50,
  },
  icon: {
    position: "absolute",
    top: 10,
  },
  inputWrap: {},
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

export default CreatePostsScreen;
