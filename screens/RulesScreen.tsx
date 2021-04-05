import React from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import Header from "./Header";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default function RulesScreen({ navigation }: any): JSX.Element {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#528C6E"></StatusBar>
      <Header title={"Rules"} navigation={navigation}></Header>
      <StatusBar barStyle="dark-content" backgroundColor="#528C6E"></StatusBar>
      <View style={styles.container}>
        <Text>Rules Screen</Text>
      </View>
    </>
  );
}
