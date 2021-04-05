import React, { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
const styles = StyleSheet.create({
  tournamentCard: {
    flexDirection: "column",
  },
  header: {
    marginTop: 30,
    marginBottom: 20,
    textAlign: "center",
    color: "#000",
    fontFamily: "RobotoSlab-Regular",
    fontSize: 30,
  },
  subHeader: {
    paddingHorizontal: 6,
    flexDirection: "row",
    paddingBottom: 16,
    fontSize: 24,
    color: "#000",
    fontFamily: "RobotoSlab-Regular",
  },
  entry: {
    paddingBottom: 6,
    fontSize: 18,
    fontFamily: "RobotoSlab-Regular",
    color: "black",
  },
});
export default function TournamentCard({ data }: any): JSX.Element {
  return (
    <View style={styles.tournamentCard}>
      <Text style={styles.header}>Ranking</Text>
      <View
        style={{
          marginTop: 8,
          marginHorizontal: 20,
          backgroundColor: "#bfd9cc",
          borderWidth: 1,
          borderRadius: 4,
          borderColor: "#bfd9cc",
          paddingVertical: 6,
          paddingBottom: 0,
        }}
      >
        <View style={styles.subHeader}>
          <Text style={[{ flex: 1 }, styles.subHeader]}>Player</Text>
          <Text style={styles.subHeader}>Points</Text>
        </View>
        <View>
          {data.map((player, index) => {
            if (player.points !== 0)
              return (
                <View
                  key={index}
                  style={[
                    {
                      flexDirection: "row",
                      paddingVertical: 6,
                      paddingHorizontal: 6,
                    },
                    index % 2
                      ? { backgroundColor: "#bfd9cc" }
                      : { backgroundColor: "#eff6f2" },
                  ]}
                >
                  <Text style={[styles.entry, { flex: 1 }]}>
                    {index + 1}. {" " + player.name}
                  </Text>
                  <Text style={styles.entry}>{player.points}</Text>
                </View>
              );
            else return null;
          })}
        </View>
      </View>
    </View>
  );
}
