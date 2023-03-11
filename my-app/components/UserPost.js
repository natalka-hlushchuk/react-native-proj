import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { db } from "../firebase/config";
import { Ionicons } from "@expo/vector-icons";
import {
  collection,
  getCountFromServer,
  doc,
  updateDoc,
} from "firebase/firestore";
const UserPost = ({
  photo,
  title,
  location,
  navigation,
  coords,
  postId,
  likes,
}) => {
  const [count, setCount] = useState(null);
  const [isLike, setIsLike] = useState(false);

  const onLike = async () => {
    setIsLike(!isLike);

    if (isLike) {
      await updateDoc(doc(db, "posts", postId), {
        like: likes - 1,
      });
      return;
    }
    await updateDoc(doc(db, "posts", postId), {
      like: likes ? likes + 1 : 1,
    });
    return;
  };

  const getCommentsCount = async () => {
    try {
      const coll = collection(db, "posts", postId, "comments");
      const snapshot = await getCountFromServer(coll);
      setCount(snapshot.data().count);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCommentsCount();
  }, []);
  return (
    <View style={{ marginBottom: 34 }}>
      <View
        style={{
          ...styles.photoWrap,
        }}
      >
        <Image style={styles.image} source={{ uri: photo }} />
        <Text style={styles.photoText}>{title}</Text>
      </View>
      <View style={styles.wrap}>
        <View style={{ ...styles.commentsWrap, alignItems: "center" }}>
          <View style={{ ...styles.commentsWrap, marginRight: 27 }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                navigation.navigate("Коментарі", { photo, postId })
              }
              activeOpacity={0.7}
            >
              <FontAwesome5
                name="comment"
                size={24}
                color="#FF6C00"
                style={{ ...styles.icon }}
              />
            </TouchableOpacity>
            <Text style={styles.count}>0</Text>
          </View>
          <TouchableOpacity
            onPress={onLike}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            {isLike ? (
              <AntDesign name="like1" size={24} color="#FF6C00" />
            ) : (
              <AntDesign name="like2" size={24} color="#FF6C00" />
            )}
            <Text style={styles.quantity}> {likes ? likes : 0}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.geoWrap}
          onPress={() =>
            navigation.navigate("Мапа", { coords, title, location })
          }
          activeOpacity={0.7}
        >
          <Ionicons
            name="location-outline"
            size={24}
            color="#BDBDBD"
            style={styles.icon}
          />
          <Text style={styles.geo}>{location}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    color: "#212121",
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

export default UserPost;
