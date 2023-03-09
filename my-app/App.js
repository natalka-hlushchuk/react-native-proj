import { NavigationContainer } from "@react-navigation/native";
import * as Font from "expo-font";
import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useRoute } from "./router.js";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const routing = useRoute(false);
  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          "Roboto-400": require("./assets/fonts/Roboto-Regular.ttf"),
          "Roboto-500": require("./assets/fonts/Roboto-Medium.ttf"),
        });
        SplashScreen.hideAsync();
      } catch (error) {
        console.log(error);
      } finally {
        setFontsLoaded(true);
        SplashScreen.hideAsync();
      }
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>{routing}</NavigationContainer>
    </Provider>
  );
}
