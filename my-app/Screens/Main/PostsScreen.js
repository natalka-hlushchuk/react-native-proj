import { MaterialIcons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import CommentsScreen from "../nestedScreens/CommentScreen";
import DefaultPostsScreen from "../nestedScreens/DefaultPostsScreen";
import MapScreen from "../nestedScreens/MapScreen";
import { authSignOutUser } from "../../redux/auth/authOperations";
const NestedScreen = createStackNavigator();
const PostsScreen = () => {
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(authSignOutUser());
  };
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="Публікації"
        component={DefaultPostsScreen}
        options={{
          headerRight: () => (
            <TouchableOpacity style={{ right: 16 }} onPress={signOut}>
              <MaterialIcons name="logout" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "Roboto-500",
            color: "#212121",
            fontSize: 17,
          },
          headerStyle: {
            borderBottomWidth: 0.3,
            borderBottomColor: "#B3B3B3",
          },
        }}
      />
      <NestedScreen.Screen
        name="Коментарі"
        component={CommentsScreen}
        options={{
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 17,
            fontFamily: "Roboto-500",
            color: "#212121",
          },
        }}
      />
      <NestedScreen.Screen
        name="Мапа"
        component={MapScreen}
        options={{
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 17,
            fontFamily: "Roboto-500",
            color: "#212121",
          },
        }}
      />
    </NestedScreen.Navigator>
  );
};

export default PostsScreen;
