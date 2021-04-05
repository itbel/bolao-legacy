import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { useUserContext } from "../contexts/UserContext";
import axios from "axios";
import { useTournamentContext } from "../contexts/TournamentContext";
const styles = StyleSheet.create({
  tournamentCard: {
    borderWidth: 1,
    borderColor: "#a3a3a3",
    borderRadius: 6,
    flexDirection: "column",
    marginVertical: 11,
  },
  header: {
    flex: 1,
    color: "#000",
    fontFamily: "RobotoSlab-Regular",
    fontSize: 22,
    textAlign: "center",
    borderBottomColor: "#a3a3a3",
    paddingBottom: 8,
  },
  subHeader: {
    textAlign: "center",
    fontSize: 12,
    color: "#4BA813",
    fontFamily: "RobotoSlab-Regular",
  },
  buttonStyle: {
    marginHorizontal: 10,
    borderRadius: 10,
    marginTop: 20,
    backgroundColor: "#528C6E",
    flex: 1,
    height: 50,
    justifyContent: "center",
  },
  buttonLabelStyle: {
    paddingHorizontal: 50,
    textAlign: "center",
    fontSize: 12,
    fontFamily: "RobotoSlab-Bold",
    color: "white",
  },
});
export default function ManagementTournamentCard({
  data,
  joinedTours,
  fetchJoined,
}: any): JSX.Element {
  const { userState } = useUserContext();
  const [isLoadingJoin, setIsLoadingJoin] = useState(false);
  const [isLoadingLeave, setIsLoadingLeave] = useState(false);
  const { setTournament, selectedTournament } = useTournamentContext();
  const joinTournament = async (tourid) => {
    try {
      setIsLoadingJoin(true);
      const response = await axios.patch(
        `http://18.224.228.195:3005/api/tournaments/join`,
        { tournamentid: tourid },
        { headers: { "auth-token": userState.user } }
      );
      fetchJoined();
      setIsLoadingJoin(false);
    } catch (error) {
      console.error(error);
      setIsLoadingJoin(false);
    }
  };
  const leaveTournament = async (tourid) => {
    try {
      setIsLoadingLeave(true);
      const response = await axios.patch(
        `http://18.224.228.195:3005/api/tournaments/leave`,
        { tournamentid: tourid },
        { headers: { "auth-token": userState.user } }
      );
      if (tourid === selectedTournament.tournament_id) {
        setTournament("", "");
      }
      fetchJoined();
      setIsLoadingLeave(false);
    } catch (error) {
      setIsLoadingLeave(false);
      console.error(error);
    }
  };
  // TODO: Leaving a tournament must change user's current tournament selection to nothing
  return (
    <View style={styles.tournamentCard}>
      <View style={{ margin: 20 }}>
        <Text style={styles.header}>{data.name}</Text>
        <Text style={styles.subHeader}>{data.owner}</Text>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <TouchableHighlight
            underlayColor="#85BFA1"
            onPress={() => {
              if (!isLoadingJoin) {
                joinTournament(data.tournamentid);
              }
            }}
            disabled={
              isLoadingLeave ||
              isLoadingJoin ||
              joinedTours.find(
                (tournament) => tournament.tournamentid === data.tournamentid
              )?.tournamentid === data.tournamentid
            }
            style={[
              styles.buttonStyle,
              joinedTours.find(
                (tournament) => tournament.tournamentid === data.tournamentid
              )?.tournamentid === data.tournamentid
                ? { backgroundColor: "lightgrey" }
                : {},
            ]}
          >
            {isLoadingJoin ? (
              <View style={styles.buttonLabelStyle}>
                <ActivityIndicator color="white" />
              </View>
            ) : (
              <Text style={styles.buttonLabelStyle}>Join</Text>
            )}
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="#85BFA1"
            onPress={() => {
              if (!isLoadingLeave) {
                Alert.alert(
                  "Log out",
                  "Are you sure you want to leave? All your progress will be erased.",
                  [
                    {
                      text: "Cancel",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel",
                    },
                    {
                      text: "OK",
                      onPress: () => {
                        leaveTournament(data.tournamentid);
                      },
                    },
                  ],
                  { cancelable: false }
                );
              }
            }}
            disabled={
              isLoadingLeave ||
              isLoadingJoin ||
              joinedTours.find(
                (tournament) => tournament.tournamentid === data.tournamentid
              )?.tournamentid !== data.tournamentid
            }
            style={[
              styles.buttonStyle,
              joinedTours.find(
                (tournament) => tournament.tournamentid === data.tournamentid
              )?.tournamentid !== data.tournamentid
                ? { backgroundColor: "lightgrey" }
                : {},
            ]}
          >
            {isLoadingLeave ? (
              <View style={styles.buttonLabelStyle}>
                <ActivityIndicator size="small" color="white" />
              </View>
            ) : (
              <Text style={styles.buttonLabelStyle}>Leave</Text>
            )}
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
}
