import {
  ImageBackground,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Dimensions,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import RegisrationScreen from "./Screens/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen";
const windowDimensions = Dimensions.get("window");
const screenDimensions = Dimensions.get("screen");

export default function App() {
  const [dimensions, setDimensions] = useState({
    window: windowDimensions,
    screen: screenDimensions,
  });
  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      "change",
      ({ window, screen }) => {
        setDimensions({ window, screen });
      }
    );
    return () => subscription?.remove();
  });

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ImageBackground
          style={styles.image}
          source={require("../my-app/assets/bg.png")}
        >
          {dimensions.window.height < 400 ? (
            <ScrollView>
              <RegisrationScreen />
              {/* <LoginScreen /> */}
            </ScrollView>
          ) : (
            <RegisrationScreen />
            // <LoginScreen />
          )}
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
});
