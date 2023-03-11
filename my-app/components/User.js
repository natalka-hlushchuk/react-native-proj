import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useSelector } from "react-redux";

const User = () => {
  const { nickname, email, avatar } = useSelector((state) => state.auth);

  return (
    <>
      <View style={styles.photoWrap}>
        <View style={styles.userWrap}>
          <Image source={{ uri: avatar }} style={styles.userWrap} />
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{nickname}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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
