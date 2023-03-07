import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
import * as Font from "expo-font";
import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useRoute } from "./router.js";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import PostsScreen from "./Screens/Main/PostsScreen";
// import CreatePostsScreen from "./Screens/Main/CreatePostsScreen";
// import ProfileScreen from "./Screens/Main/ProfileScreen";

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const routing = useRoute(true);
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

  return <NavigationContainer>{routing}</NavigationContainer>;
}
