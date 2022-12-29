import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Button,
  FlatList,
  Image,
  SafeAreaView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { authSignOutUser } from "../../redux/auth/authOperations";
import db from "../../firebase/config";

export default function ProfileScreen() {
  const [userPosts, setUserPosts] = useState([]);

  const dispatch = useDispatch();

  const { userId } = useSelector((state) => state.auth);

  useEffect(() => {
    getUserPosts();
  }, []);

  const getUserPosts = async () => {
    await db
      .firestore()
      .collection("posts")
      .where("userId", "==", userId)
      .onSnapshot((data) =>
        setUserPosts(data.docs.map((doc) => ({ ...doc.data() })))
      );
  };

  const signOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <Button title="signOut" onPress={signOut} style={styles.btn} />
        <View>
          <FlatList
            data={userPosts}
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
              </View>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    // backgroundColor: "#fff",
  },
  container: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    marginTop: 150,
  },
});
