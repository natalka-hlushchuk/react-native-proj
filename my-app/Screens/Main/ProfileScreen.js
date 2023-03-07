import React from "react";
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
  ImageBackground,
} from "react-native";
import Post from "../../components/Post";

const ProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require("../../assets/bg-3x.png")}
      >
        <View style={styles.wrap}>
          <View style={styles.photoWrap}></View>
          <Text style={styles.formTitle}>Natali Romanova</Text>
          <Post />
        </View>
      </ImageBackground>
    </View>
  );
};
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
  wrap: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 92,
    paddingRight: 16,
    paddingLeft: 16,
    paddingBottom: 78,
  },
  photoWrap: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    position: "absolute",
    justifyContent: "center",
    top: -60,
    left: 128,
  },
  // titleWrap: {  },
  formTitle: {
    paddingBottom: 33,
    fontSize: 30,
    fontFamily: "Roboto-500",
    textAlign: "center",
    fontWeight: "500",
    letterSpacing: 0.01,
    color: "#212121",
  },
});
export default ProfileScreen;
