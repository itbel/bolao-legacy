import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import registerBackground from "../assets/media/forgot.png";
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
    marginBottom: 48,
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
    bottom: "65%",
  },
  forgotText: {
    color: "white",
    fontFamily: "RobotoSlab-Regular",
    fontSize: 16,
  },
  loginBtn: {
    marginHorizontal: 48,
    marginBottom: 48,
    marginTop: -70,
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
export default function ForgotPasswordScreen({ navigation }: any): JSX.Element {
  const [email, setEmail]: any = useState("");
  return (
    <ImageBackground style={styles.backgroundPic} source={registerBackground}>
      <KeyboardAvoidingView behavior="padding" style={styles.content}>
        <View>
          <Text style={styles.logoHeader}>Forgotten Password</Text>
          <Text style={styles.logoSubheader}>
            Please enter your email to recover password
          </Text>
        </View>
        <View>
          <View>
            <TextInput
              value={email}
              style={styles.inputText}
              placeholder="Email..."
              placeholderTextColor="white"
              onChangeText={(email) => setEmail({ email: email })}
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={() =>
            Alert.alert("Sorry", "This feature is not yet implemented!")
          }
          style={styles.loginBtn}
        >
          <Text style={styles.loginText}>Request Reset</Text>
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
