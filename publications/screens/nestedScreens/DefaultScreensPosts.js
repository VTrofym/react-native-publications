import { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Image, Button } from "react-native";

export default function DefaultScreensPosts({ route, navigation }) {
  const [posts, setPosts] = useState([]);

  // console.log("route.params", route.params);

  useEffect(() => {
    if (route.params) {
      setPosts((prevPosts) => [...prevPosts, route.params]);
    }
  }, [route.params]);
  // console.log("posts", posts);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, idx) => idx.toString()}
        renderItem={({ item }) => (
          <View style={{ marginTop: 10 }}>
            <Image
              source={{ uri: item.photo }}
              style={{ width: 200, height: 200 }}
            />
          </View>
        )}
      />
      <Button title="go to map" onPress={() => navigation.navigate("Map")} />
      <Button
        title="go to comments"
        onPress={() => navigation.navigate("Comments")}
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
