import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, SafeAreaView } from "react-native";
import Post from "../../components/Post";
import { db } from "../../firebase/config";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import User from "../../components/User";

const DefaultPostsScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("date", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const allPosts = [];
      querySnapshot.forEach((doc) => {
        allPosts.push({ ...doc.data(), id: doc.id });
      });
      setPosts(allPosts);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <View style={styles.container}>
      <User />
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          data={posts}
          renderItem={({ item }) => (
            <Post
              navigation={navigation}
              photo={item.photo}
              title={item.title}
              location={item.location}
              coords={item.coords}
              postId={item.id}
              likes={item.like}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
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

export default DefaultPostsScreen;
