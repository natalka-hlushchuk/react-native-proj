import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const Post = () => {
  return (
    <View style={styles.container}>
      <View
        style={{
          ...styles.photoWrap,
        }}
      >
        <Image style={styles.image} source={require("../assets/img.png")} />
        <Text style={styles.photoText}>Небо</Text>
      </View>
      <View style={styles.wrap}>
        <View style={styles.commentsWrap}>
          <TouchableOpacity
            style={styles.button}
            // onPress={keyboardHide}
            activeOpacity={0.7}
          >
            <FontAwesome5
              name="comment"
              size={24}
              color="#BDBDBD"
              style={styles.icon}
            />
          </TouchableOpacity>
          <Text style={styles.count}>0</Text>
        </View>
        <View style={styles.geoWrap}>
          <Ionicons
            name="location-outline"
            size={24}
            color="#BDBDBD"
            style={styles.icon}
          />
          <Text style={styles.geo}>Ivano-Frankivs'k Region, Ukraine</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
  },
  photoWrap: {
    display: "flex",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: 240,
    marginBottom: 8,
  },
  photoText: {
    marginBottom: 8,
    fontFamily: "Roboto-500",
    fontWeight: "500",
    fontSize: 16,
    color: "#212121",
  },
  wrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  commentsWrap: {
    flexDirection: "row",
  },
  icon: {
    marginRight: 8,
  },
  count: {
    color: "#BDBDBD",
    fontFamily: "Roboto-400",
    fontWeight: "400",
    fontSize: 16,
  },
  geoWrap: {
    flexDirection: "row",
  },
  geo: {
    fontFamily: "Roboto-400",
    fontWeight: "400",
    fontSize: 16,
    color: "#212121",
  },
});

export default Post;
