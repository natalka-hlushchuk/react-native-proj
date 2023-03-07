import React from "react";
import { View, Text, StyleSheet } from "react-native";

const User = () => {
  return (
    <>
      <View style={styles.photoWrap}>
        <View style={styles.userWrap}></View>
        <View style={styles.info}>
          <Text style={styles.name}>Natali Romanova</Text>
          <Text style={styles.email}>example@example.com</Text>
        </View>
      </View>
    </>
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
    marginBottom: 32,
    flexDirection: "row",
    alignItems: "center",
  },
  userWrap: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  info: {
    marginLeft: 8,
  },
  name: {
    fontFamily: "Roboto-500",
    fontWeight: "500",
    fontSize: 13,
    color: "#212121",
  },
  email: {
    fontFamily: "Roboto-400",
    fontWeight: "400",
    fontSize: 11,
    color: "rgba(33, 33, 33, 0.8)",
  },
});
export default User;
