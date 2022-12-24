import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Camera, CameraType } from "expo-camera";
import { useState } from "react";

import * as Location from "expo-location";

export default function CreateScreen({ navigation }) {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState("");

  const takePhoto = async () => {
    // console.log(camera.takePictureAsync());
    const photo = await camera.takePictureAsync();

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      // console.log("status", status);
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      // console.log("latitude", location.coords.latitude);
      // console.log("longitude", location.coords.longitude);
    })();

    // console.log("photo", photo.uri);
    setPhoto(photo.uri);
  };

  const sendPhoto = () => {
    // console.log("navigation", navigation);
    navigation.navigate("Posts", { photo });
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
