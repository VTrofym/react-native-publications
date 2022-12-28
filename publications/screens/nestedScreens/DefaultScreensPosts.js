import { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Image, Button, Text } from "react-native";

import db from "../../firebase/config";

export default function DefaultScreensPosts({ route, navigation }) {
  const [posts, setPosts] = useState([]);

  // console.log("route.params", route.params);

  const getAllPosts = async () => {
    await db
      .firestore()
      .collection("posts")
      .onSnapshot((data) =>
        setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
  };

  useEffect(() => {
    getAllPosts();
  }, []);
  // console.log("posts", posts);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, idx) => idx.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              marginTop: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: item.photo }}
              style={{ width: 200, height: 200 }}
            />
            <View>
              <Text>{item.comment}</Text>
            </View>
            <View>
              <Button
                title="Карта"
                onPress={() =>
                  navigation.navigate("Map", { location: item.location })
                }
              />
              <Button
                title="Коментарі"
                onPress={() =>
                  navigation.navigate("Comments", { postId: item.id })
                }
              />
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
