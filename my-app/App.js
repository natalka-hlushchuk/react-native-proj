import { Button, ImageBackground, StyleSheet, View } from "react-native";
import RegisrationScreen from "./Screens/RegistrationScreen";
// import * as Font from "expo-font";
// import RegisrationScreen from "./Screens/RegistrationScreen";

export default function App() {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require("../my-app/assets/bg.png")}
      >
        <RegisrationScreen />
      </ImageBackground>
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
    paddingRight: 16,
    paddingLeft: 16,
  },
  input: {
    backgroundColor: "#F6F6F6",
    padding: 16,
    borderColor: "#E8E8E8",
    borderStyle: "solid",
    borderRadius: 8,
    borderWidth: 1,
    color: "#212121",
    height: 50,
  },

  formTitle: {
    paddingTop: 92,
    paddingBottom: 33,
    fontSize: 30,
    textAlign: "center",
    fontWeight: 500,
    lineHeight: 1.16,
    letterSpacing: 0.01,
  },
  inputTitle: {
    color: "#f0f8ff",
    marginBottom: 10,
    fontSize: 18,
  },
  button: {
    paddingTop: 43,
  },
});
