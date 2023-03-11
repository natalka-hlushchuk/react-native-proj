import { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import {
  View,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Comment from "../../components/Comment";
import { AntDesign } from "@expo/vector-icons";

const CommentsScreen = ({ route }) => {
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const { avatar, nickname } = useSelector((state) => state.auth);
  const { photo, postId } = route.params;

  useEffect(() => {
    const item = query(
      collection(db, "posts", postId, "comments"),
      orderBy("date")
    );
    const unsubscribe = onSnapshot(item, (querySnapshot) => {
      const comments = [];
      querySnapshot.forEach((doc) => {
        comments.push({ ...doc.data(), id: doc.id });
      });
      setComments(comments);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleSetComment = (text) => setComment(text);

  const handleSubmit = async () => {
    await addDoc(collection(db, "posts", postId, "comments"), {
      comment,
      avatar,
      nickname,
      date: Date.now().toString(),
    });
    setComment("");
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View
        style={{
          ...styles.container,
        }}
      >
        <Image
          source={{ uri: photo }}
          style={{
            ...styles.photo,
          }}
        />

        <View style={{ flex: isKeyboardShown ? 0 : 1 }}>
          <FlatList
            data={comments}
            renderItem={({ item }) => (
              <Comment
                avatar={item.avatar}
                comment={item.comment}
                nickname={item.nickname}
                time={item.time}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
        <KeyboardAvoidingView>
          <View style={styles.inputContainer}>
            <TextInput
              value={comment}
              onChangeText={handleSetComment}
              style={styles.inputComment}
              placeholder="Ваш коментар"
              placeholderTextColor={"#BDBDBD"}
            />
            <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
              <AntDesign name="arrowup" size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    paddingBottom: 16,
    justifyContent: "flex-end",
  },
  photo: {
    marginTop: 32,
    marginBottom: 32,
    width: "100%",
    height: 240,
    borderRadius: 8,
  },
  inputComment: {
    padding: 16,
    width: "100%",
    height: 50,
    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderRadius: 100,
    backgroundColor: "#F6F6F6",
    fontFamily: "Roboto-400",
    color: "#212121",
  },
  submit: {
    position: "absolute",
    top: 8,
    right: 8,
    justifyContent: "center",
    alignItems: "center",
    width: 34,
    height: 34,
    backgroundColor: "#FF6C00",
    borderRadius: 50,
  },
});
export default CommentsScreen;
