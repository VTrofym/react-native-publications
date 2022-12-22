import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";

export default function App() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    // console.log("state", state);
    // setState(initialState);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("./assets/images/PhotoBG.jpg")}
        style={styles.imageBG}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "margin"}
        >
          <View
            style={{
              ...styles.form,
              paddingBottom: isShowKeyboard ? 0 : 78,
              // width: dimensions,
            }}
          >
            <Text style={styles.title}>Реєстрація</Text>
            <TextInput
              style={styles.input}
              textAlign={"center"}
              onFocus={() => setIsShowKeyboard(true)}
            />
            <TextInput
              style={styles.input}
              textAlign={"center"}
              onFocus={() => setIsShowKeyboard(true)}
            />
            <TextInput
              style={styles.input}
              textAlign={"center"}
              secureTextEntry={true}
              onFocus={() => setIsShowKeyboard(true)}
            />
            <TouchableOpacity
              style={styles.btn}
              activeOpacity={0.6}
              onPress={keyboardHide}
            >
              <Text style={styles.btnTitle}>Зареєструватися</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnQuestion}
              activeOpacity={0.6}
              onPress={keyboardHide}
            >
              <Text style={styles.btnQuestionText}>Вже є акаунт? Увійти!</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageBG: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  form: {
    backgroundColor: "#FFFFFF",
    // paddingBottom: 78,
    paddingTop: 92,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  title: {
    textAlign: "center",
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
    marginBottom: 32,
  },
  input: {
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    height: 50,
    marginBottom: 16,
    marginHorizontal: 16,
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    backgroundColor: Platform.OS === "ios" ? "#FF6C00" : "#FF6C00",
    borderRadius: 25,
    marginHorizontal: 16,
    marginBottom: 16,
    marginTop: 27,
  },
  btnTitle: {
    lineHeight: 19,
    ...Platform.select({
      ios: {
        color: "#FFFFFF",
        fontSize: 16,
      },
      android: {
        color: "#FFFFFF",
        fontSize: 16,
      },
    }),
  },
  btnQuestion: {
    alignItems: "center",
  },
  btnQuestionText: {
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
});
