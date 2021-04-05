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
import ManageTournamentCard from "./ManageTournamentCard";
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
    marginTop: 50,
    marginBottom: 20,
    marginHorizontal: 30,
    color: "#000",
    fontFamily: "RobotoSlab-Regular",
    fontSize: 30,
  },
});
export default function Tournaments({ navigation, route }: any): JSX.Element {
  const [tournaments, setTournaments] = useState([]);
  const [joinedTournaments, setJoinedTournaments] = useState([]);
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(true);
  const { userState } = useUserContext();
  const fetchJoinedTournaments = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `http://18.224.228.195:3005/api/tournaments/joined`,
        { headers: { "auth-token": `${userState.user}` } }
      );
      const data = await response.json();
      setJoinedTournaments(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  const loadTournaments = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://18.224.228.195:3005/api/tournaments/all`
      );
      const data = await response.json();
      setTournaments(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    if (isFocused) {
      loadTournaments();
      fetchJoinedTournaments();
    }
  }, [isFocused]);
  return (
    <View style={styles.backgroundd}>
      <StatusBar barStyle="dark-content" backgroundColor="#528C6E"></StatusBar>
      <Header title={"Manage Tournaments"} navigation={navigation}></Header>
      <View style={styles.container}>
        <Text style={styles.heading}>All tournaments</Text>
        <View style={{ marginHorizontal: 30, flex: 1 }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ flexDirection: "column", flex: 1 }}
          >
            {tournaments && tournaments.length > 0
              ? tournaments.map((tour: any, index) => {
                  return (
                    <ManageTournamentCard
                      fetchJoined={() => fetchJoinedTournaments()}
                      joinedTours={joinedTournaments}
                      key={tour?.tournamentid ?? index}
                      data={tour}
                    ></ManageTournamentCard>
                  );
                })
              : null}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}
