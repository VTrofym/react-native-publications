import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import { useSelector } from "react-redux";

import db from "../../firebase/config";

export default function CommentsScreen({ route }) {
  const [comment, setComment] = useState([]);
  const [allComments, setAllComments] = useState(null);

  useEffect(() => {
    getAllPosts();
  }, []);

  const { postId } = route.params;

  const { nickname } = useSelector((state) => state.auth);

  const createPost = async () => {
    db.firestore()
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .add({ comment, nickname });
  };

  const getAllPosts = async () => {
    db.firestore()
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .onSnapshot((data) =>
        setAllComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={allComments}
          renderItem={({ item }) => (
            <View style={styles.commentContainer}>
              <Text>{item.nickname}</Text>
              <Text>{item.comment}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} onChangeText={setComment} />
      </View>
      <TouchableOpacity onPress={createPost} style={styles.sendBtn}>
        <Text style={styles.sendTitle}>Додати пост</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "flex-end",
  },
  commentContainer: {
    borderWidth: 1,
    borderColor: "#00ff00",
    marginHorizontal: 10,
    padding: 10,
    marginBottom: 10,
  },
  inputContainer: {
    marginHorizontal: 10,
    backgroundColor: "#e0ffff",
  },
  input: {
    marginHorizontal: 10,
    height: 50,
  },
  sendBtn: {
    borderWidth: 1,
    borderColor: "#ff0000",
    borderRadius: 50,
    borderWidth: 2,
    backgroundColor: "#adff2f",
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30,
    marginTop: 20,
    marginBottom: 30,
  },
  sendTitle: {
    color: "#000000",
    fontSize: 20,
  },
});
