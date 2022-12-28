import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { Camera } from "expo-camera";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as Location from "expo-location";

import db from "../../firebase/config";

export default function CreateScreen({ navigation }) {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState("");
  const [comment, setComment] = useState("");
  const [location, setLocation] = useState(null);

  const { userId, nickname } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }
      let locationRes = await Location.getCurrentPositionAsync({});
      setLocation(locationRes);
    })();
  }, []);

  const takePhoto = async () => {
    console.log("comment", comment);
    console.log("location", location);
    // console.log(camera.takePictureAsync());
    const { uri } = await camera.takePictureAsync();

    console.log("photo", uri);
    setPhoto(uri);
  };

  const sendPhoto = () => {
    uploadPostToServer();
    // console.log("navigation", navigation);
    navigation.navigate("DefaultScreen", { photo });
  };

  const uploadPostToServer = async () => {
    const photo = await uploadPhotoToServer();
    const createPost = await db
      .firestore()
      .collection("posts")
      .add({ photo, comment, location: location.coords, userId, nickname });
  };

  // запись фото в storage на firebase
  const uploadPhotoToServer = async () => {
    const response = await fetch(photo);
    const file = await response.blob();
    const uniquePostId = Date.now().toString();
    await db.storage().ref(`postImage/${uniquePostId}`).put(file);

    // достал ссылку на фото
    const processedPhoto = await db
      .storage()
      .ref("postImage")
      .child(uniquePostId)
      .getDownloadURL();

    return processedPhoto;
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={setCamera}>
        {photo && (
          <View style={styles.takePhotoContainer}>
            <Image
              source={{ uri: photo }}
              style={{ width: 200, height: 200, borderRadius: 10 }}
            />
          </View>
        )}
        <TouchableOpacity style={styles.snapContainer} onPress={takePhoto}>
          <Text style={styles.snap}>SNAP</Text>
        </TouchableOpacity>
      </Camera>
      <View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} onChangeText={setComment} />
        </View>
        <TouchableOpacity onPress={sendPhoto} style={styles.sendBtn}>
          <Text style={styles.sendTitle}>Відправити</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    height: "70%",
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  takePhotoContainer: {
    position: "absolute",
    top: 50,
    left: 10,
    borderColor: "green",
    borderWidth: 3,
    borderRadius: 10,
  },
  snapContainer: {
    borderWidth: 2,
    borderColor: "#ff0000",
    borderRadius: 15,
    width: 70,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  snap: {
    color: "#fff",
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
  },
  sendTitle: {
    color: "#000000",
    fontSize: 20,
  },
});
