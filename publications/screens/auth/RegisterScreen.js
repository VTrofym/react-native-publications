import { useEffect, useState } from "react";
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
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { useDispatch } from "react-redux";
import { authSignUpUser } from "../../redux/auth/authOperations";

const initialState = {
  nickname: "",
  email: "",
  password: "",
};

export default function RegisterScreen({ navigation }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 20 * 2
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width - 20 * 2;
      // console.log("width", width);

      setDimensions(width);
    };
    Dimensions.addEventListener("change", onChange);
    // return () => {
    //   Dimensions.removeEventListener("change", onChange);
    // };
  }, []);

  const handleSubmit = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    // console.log("state", state);

    dispatch(authSignUpUser(state));
    setState(initialState);
  };

  const keyboardHideByTouch = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHideByTouch}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/images/PhotoBG.jpg")}
          style={styles.imageBG}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "margin"}
          >
            <View
              style={{
                ...styles.form,
                paddingBottom: isShowKeyboard ? 0 : 78,
              }}
            >
              <Text style={styles.title}>Реєстрація</Text>
              <TextInput
                style={{ ...styles.input, width: dimensions }}
                textAlign={"center"}
                onFocus={() => setIsShowKeyboard(true)}
                value={state.nickname}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, nickname: value }))
                }
              />
              <TextInput
                style={{ ...styles.input, width: dimensions }}
                textAlign={"center"}
                onFocus={() => setIsShowKeyboard(true)}
                value={state.email}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, email: value }))
                }
              />
              <TextInput
                style={{ ...styles.input, width: dimensions }}
                textAlign={"center"}
                secureTextEntry={true}
                onFocus={() => setIsShowKeyboard(true)}
                value={state.password}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, password: value }))
                }
              />
              <TouchableOpacity
                style={{ ...styles.btn, width: dimensions }}
                activeOpacity={0.6}
                onPress={handleSubmit}
              >
                <Text style={styles.btnTitle}>Зареєструватися</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnQuestion}
                activeOpacity={0.6}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={styles.btnQuestionText}>
                  Вже є акаунт? <Text>Увійти!</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
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
    paddingTop: 92,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: "center",
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
    // marginHorizontal: 16,
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    backgroundColor: Platform.OS === "ios" ? "#FF6C00" : "#FF6C00",
    borderRadius: 25,
    // marginHorizontal: 16,
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
