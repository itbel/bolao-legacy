import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import Header from "./Header";
import TournamentCard from "./TournamentCard";
import { useTournamentContext } from "../contexts/TournamentContext";
import { useUserContext } from "../contexts/UserContext";
import { useIsFocused } from "@react-navigation/native";

const styles = StyleSheet.create({
  backgroundd: {
    backgroundColor: "#528C6E",
    flex: 1,
  },
  container: {
    flexDirection: "column",
    justifyContent: "flex-start",
    flex: 1,
    marginHorizontal: 0,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: "#fff",
  },
  buttonStyle: {
    marginTop: 30,
    marginHorizontal: 30,
    backgroundColor: "#528C6E",
    paddingVertical: 25,
  },
  buttonLabelStyle: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: "RobotoSlab-Bold",
    color: "white",
  },
  heading: {
    marginTop: 90,
    marginBottom: 50,
    marginHorizontal: 30,
    color: "#000",
    fontFamily: "RobotoSlab-Regular",
    fontSize: 30,
  },
});

export default function RankingScreen({ navigation, route }: any): JSX.Element {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [isLoading, setIsLoading] = useState(true);
  const isFocused = useIsFocused();
  const { userState } = useUserContext();
  const { selectedTournament } = useTournamentContext();
  const [ranking, setRanking] = useState([]);
  const loadRanking = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `http://18.224.228.195:3005/api/tournaments/players/${selectedTournament.tournament_id}`,
        { headers: { "auth-token": `${userState.user}` } }
      );
      const data = await response.json();
      setRanking(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (isFocused) {
      loadRanking();
    }
  }, [isFocused]);
  return (
    <View style={styles.backgroundd}>
      <StatusBar barStyle="dark-content" backgroundColor="#528C6E"></StatusBar>
      <Header
        title={selectedTournament.tournament_name}
        navigation={navigation}
      ></Header>
      <View style={styles.container}>
        {isLoading ? (
          <View style={{ position: "absolute", top: "50%", left: "45%" }}>
            <ActivityIndicator
              animating={isLoading}
              color={"#000"}
              size={"large"}
            ></ActivityIndicator>
          </View>
        ) : (
          <View style={{ marginHorizontal: 30 }}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ flexDirection: "column" }}
            >
              <TournamentCard data={ranking}></TournamentCard>
            </ScrollView>
          </View>
        )}
      </View>
    </View>
  );
}
