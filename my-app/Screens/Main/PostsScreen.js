import React from "react";
import { View, StyleSheet } from "react-native";
import Post from "../../components/Post";
import User from "../../components/User";

const PostsScreen = () => {
  return (
    <View style={styles.container}>
      <User />
      <Post />
    </View>
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
});
export default PostsScreen;
