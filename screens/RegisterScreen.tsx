import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  ToastAndroid,
} from "react-native";
import { Assets } from "../Assets";
import Axios from "axios";

const styles = StyleSheet.create({
  backgroundPic: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    resizeMode: "contain",
  },
  content: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  logoHeader: {
    marginLeft: 48,
    color: "white",
    fontFamily: "RobotoSlab-Bold",
    fontSize: 30,
  },
  logoSubheader: {
    marginLeft: 48,
    marginTop: 8,
    color: "#707070",
    fontSize: 20,
    fontFamily: "RobotoSlab-Regular",
  },
  inputText: {
    marginHorizontal: 48,
    marginVertical: 24,
    color: "white",
    borderBottomColor: "white",
    fontFamily: "RobotoSlab-Regular",
    fontSize: 16,
    borderBottomWidth: 2,
  },
  forgotBtn: {
    position: "absolute",
    right: 0,
    marginRight: 48,
    bottom: "40%",
  },
  forgotText: {
    color: "white",
    fontFamily: "RobotoSlab-Regular",
    fontSize: 16,
  },
  loginBtn: {
    marginHorizontal: 48,
    marginBottom: 48,
  },
  loginText: {
    backgroundColor: "#fff",
    textAlign: "center",
    borderRadius: 6,
    color: "#225B00",
    padding: 16,
    height: 56,
    fontSize: 16,
    fontWeight: "bold",
  },
});
export default function RegisterScreen({ navigation }: any): JSX.Element {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [registerData, setRegisterData] = useState({
    username: "",
    password: "",
    email: "",
    name: "",
  });

  const isValidUser = (user) => {
    let isRequiredLength = user?.length >= 4;
    let hasNoWhitespace = !/\s/.test(user);
    let hasNoSymbols = !/[!@#~$%^&*()_+=[{\]};:<>\\|.`/?,-]/.test(user);
    let isAlphanumeric = /^[a-zA-Z0-9]+$/.test(user);
    return (
      isRequiredLength && hasNoWhitespace && hasNoSymbols && isAlphanumeric
    );
  };
  const isValidPass = (pass) => {
    let isRequiredLength = pass?.length >= 4;
    let hasNoWhitespace = !/\s/.test(pass);
    return isRequiredLength && hasNoWhitespace;
  };
  const isValidName = (name) => {
    let isRequiredLength = name?.length > 0 && name?.length < 10;
    let hasNoWhitespace = !/\s/.test(name);
    let hasNoSymbols = !/[!@#~$%^&*()_+=[{\]};:<>\\|.`/?,-]/.test(name);
    return isRequiredLength && hasNoWhitespace && hasNoSymbols;
  };

  const register = () => {
    if (isValidUser(registerData.username)) {
      if (isValidPass(registerData.password)) {
        if (isValidName(registerData.name)) {
          Axios.post(
            `http://18.224.228.195:3005/api/users/register`,
            {
              username: registerData.username,
              password: registerData.password,
              name: registerData.name,
              email: registerData.email,
            },
            { timeout: 2000 }
          )
            .then((response) => {
              if (response.status === 201) {
                ToastAndroid.show(
                  "Registered Successfully.",
                  ToastAndroid.SHORT
                );
                navigation.push("LoginScreen", {
                  params: {
                    username: registerData.username,
                    password: registerData.password,
                  },
                });
              }
            })
            .catch((error) => {
              ToastAndroid.show(
                "There was an error while registering.",
                ToastAndroid.SHORT
              );
            });
        } else {
          ToastAndroid.show("Invalid Name.", ToastAndroid.SHORT);
        }
      } else {
        ToastAndroid.show("Invalid Password.", ToastAndroid.SHORT);
      }
    } else {
      ToastAndroid.show("Invalid Username.", ToastAndroid.SHORT);
    }
  };

  return (
    <ImageBackground
      style={styles.backgroundPic}
      source={Assets.media.register}
    >
      <KeyboardAvoidingView behavior="padding" style={styles.content}>
        <View>
          <Text style={styles.logoHeader}>Register</Text>
          <Text style={styles.logoSubheader}>Create an account to login</Text>
        </View>
        <View>
          <View>
            <TextInput
              onFocus={() => {}}
              value={registerData.email}
              style={styles.inputText}
              placeholder="Email..."
              placeholderTextColor="white"
              onChangeText={(email) =>
                setRegisterData({ ...registerData, email: email.toLowerCase() })
              }
            />
          </View>
          <View>
            <TextInput
              onFocus={() => {}}
              value={registerData.name}
              style={styles.inputText}
              placeholder="Name..."
              placeholderTextColor="white"
              onChangeText={(name) =>
                setRegisterData({ ...registerData, name: name })
              }
            />
          </View>
          <View>
            <TextInput
              onFocus={() => {}}
              value={registerData.username}
              style={styles.inputText}
              placeholder="Username..."
              placeholderTextColor="white"
              onChangeText={(user) =>
                setRegisterData({
                  ...registerData,
                  username: user.toLowerCase(),
                })
              }
            />
          </View>
          <View>
            <TextInput
              value={registerData.password}
              style={styles.inputText}
              secureTextEntry={true}
              placeholder="Password..."
              placeholderTextColor="white"
              onChangeText={(pass) =>
                setRegisterData({ ...registerData, password: pass })
              }
            />
          </View>
        </View>

        <TouchableOpacity onPress={register} style={styles.loginBtn}>
          <Text style={styles.loginText}>Register</Text>
        </TouchableOpacity>
        <Text style={{ color: "white", textAlign: "center" }}>
          Already have an account?{" "}
          <Text
            onPress={() => navigation.navigate("LoginScreen")}
            style={{ fontWeight: "bold" }}
          >
            Login
          </Text>
        </Text>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}
