import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import GuessAccordion from "./GuessAccordion";
import { useTournamentContext } from "../contexts/TournamentContext";
import { useUserContext } from "../contexts/UserContext";
import Header from "./Header";
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
    marginTop: 30,
    marginBottom: 20,
    color: "#000",
    fontFamily: "RobotoSlab-Regular",
    fontSize: 30,
  },
  subHeading: {
    marginTop: 60,
    color: "#000",
    fontFamily: "RobotoSlab-Regular",
    fontSize: 26,
  },
});

export default function GuessScreen({ navigation, route }: any): JSX.Element {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [isLoading, setIsLoading] = useState(true);
  const { userState } = useUserContext();
  const isFocused = useIsFocused();
  const { selectedTournament } = useTournamentContext();
  const [rounds, setRounds] = useState([]);

  const loadRound = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `http://18.224.228.195:3005/api/matches/unguessed/${selectedTournament.tournament_id}`,
        { headers: { "auth-token": `${userState.user}` } }
      );
      const data = await response.json();
      setIsLoading(false);
      setRounds(data);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      loadRound();
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
          <>
            <View style={{ marginHorizontal: 30 }}>
              <ScrollView
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                style={{ flexDirection: "column" }}
              >
                {rounds && rounds.length > 0 ? (
                  <Text style={styles.heading}>Guess</Text>
                ) : null}
                {rounds && rounds.length > 0 ? (
                  rounds.map((round, index) => {
                    return (
                      <GuessAccordion
                        setRounds={setRounds}
                        key={index}
                        data={round}
                        openState={index === 0 ? true : false}
                      ></GuessAccordion>
                    );
                  })
                ) : (
                  <Text style={styles.subHeading}>No matches to guess</Text>
                )}
              </ScrollView>
            </View>
          </>
        )}
      </View>
    </View>
  );
}
