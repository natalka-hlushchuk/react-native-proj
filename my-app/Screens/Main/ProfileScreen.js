import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../firebase/config";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  SafeAreaView,
  FlatList,
  Image,
} from "react-native";
import {
  onSnapshot,
  collection,
  getCountFromServer,
  doc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import UserPost from "../../components/UserPost";
import { authSignOutUser } from "../../redux/auth/authOperations";

const ProfileScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const { nickname, email, avatar, userId } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    const item = query(collection(db, "posts"), where("userId", "==", userId));
    const unsubscribe = onSnapshot(item, (querySnapshot) => {
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
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require("../../assets/bg-3x.png")}
      >
        <View style={styles.wrap}>
          <TouchableOpacity style={styles.logoutWrap} onPress={signOut}>
            <MaterialIcons name="logout" size={24} color="#BDBDBD" />
          </TouchableOpacity>
          <View style={styles.photoWrap}>
            <Image source={{ uri: avatar }} style={styles.img} />
          </View>

          <Text style={styles.formTitle}>{nickname}</Text>

          <SafeAreaView style={{ width: "100%", marginTop: 32 }}>
            <FlatList
              data={posts}
              renderItem={({ item }) => (
                <UserPost
                  navigation={navigation}
                  photo={item.photo}
                  title={item.place}
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
      </ImageBackground>
    </View>
  );
};
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
  wrap: {
    height: "75%",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 92,
    paddingRight: 16,
    paddingLeft: 16,
    paddingBottom: 78,
  },
  logoutWrap: {
    position: "absolute",
    top: 34,
    right: 16,
  },
  photoWrap: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    position: "absolute",
    justifyContent: "center",
    top: -60,
    left: 128,
  },
  img: {
    width: 120,
    height: 120,
    borderRadius: 16,
    position: "absolute",
    justifyContent: "center",
  },
  formTitle: {
    fontSize: 30,
    fontFamily: "Roboto-500",
    textAlign: "center",
    fontWeight: "500",
    letterSpacing: 0.01,
    color: "#212121",
  },
});
export default ProfileScreen;
