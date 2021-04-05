import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
  Modal,
  TouchableWithoutFeedback,
  Pressable,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useTournamentContext } from "../contexts/TournamentContext";
import { useUserContext } from "../contexts/UserContext";
import axios from "axios";
import { ActivityIndicator } from "react-native";
const styles = StyleSheet.create({
  openCard: {
    flexDirection: "column",
    marginVertical: 11,
    borderWidth: 1,
    borderColor: "#a3a3a3",
    borderRadius: 6,
  },
  heading: {
    color: "#000",
    fontFamily: "RobotoSlab-Regular",
    fontSize: 26,
    marginBottom: 30,
  },
  closedCard: {
    flexDirection: "column",
    height: 72,
    marginVertical: 11,
    borderWidth: 1,
    borderColor: "#a3a3a3",
    borderRadius: 6,
  },
  roundTitleText: {
    flex: 1,
    fontFamily: "RobotoSlab-Regular",
    fontSize: 22,
  },
  buttonStyle: {
    marginTop: 30,
    backgroundColor: "#528C6E",
    borderRadius: 5,
    flexDirection: "row",
    marginHorizontal: 50,
  },
  buttonLabelStyle: {
    padding: 12,
    textAlign: "center",
    fontSize: 16,
    fontFamily: "RobotoSlab-Bold",
    color: "white",
    flex: 1,
  },
  centeredView: {
    backgroundColor: "rgba(0,0,0,0.8)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    flexDirection: "row",
  },
  modalView: {
    flex: 1,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 5,

    paddingTop: 35,
    paddingBottom: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    marginTop: 20,
    backgroundColor: "#528C6E",
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
});
export default function GuessAccordion({
  openState,
  data,
  setRounds,
}: any): JSX.Element {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [modalVisible, setModalVisible] = useState(false);
  const { userState } = useUserContext();
  const { selectedTournament } = useTournamentContext();
  const [open, setOpen] = useState(openState);
  const [selectedMatch, setSelectedMatch]: any = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [matchInfo, setMatchInfo] = useState({
    teamAguess: "",
    teamBguess: "",
  });
  const handleSubmitGuess = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `http://18.224.228.195:3005/api/guesses/manage`,
        {
          matchid: selectedMatch.matchid,
          tourid: selectedTournament.tournament_id,
          teamAguess: matchInfo.teamAguess,
          teamBguess: matchInfo.teamBguess,
        },
        { headers: { "auth-token": userState.user } }
      );
      if (response?.data?.msg === "Guess Created") {
        const fetchGuessRounds = await fetch(
          `http://18.224.228.195:3005/api/matches/unguessed/${selectedTournament.tournament_id}`,
          { headers: { "auth-token": `${userState.user}` } }
        );
        setIsLoading(false);
        const data = await fetchGuessRounds.json();
        setRounds(data);
        setModalVisible(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };
  useEffect(() => {
    setMatchInfo({ teamAguess: "", teamBguess: "" });
  }, [modalVisible]);
  return open ? (
    <>
      {modalVisible ? (
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <Pressable style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.heading}>
                {selectedMatch?.teamAName}
                {"   "}x{"   "}
                {selectedMatch?.teamBName}
              </Text>
              <View style={{ flexDirection: "row" }}>
                <TextInput
                  autoFocus={true}
                  onKeyPress={(e) =>
                    e.nativeEvent.key === "enter" &&
                    matchInfo.teamAguess !== "" &&
                    matchInfo.teamBguess !== ""
                      ? handleSubmitGuess()
                      : null
                  }
                  maxLength={2}
                  keyboardType={"number-pad"}
                  onChangeText={(text) => {
                    /^[0-9]*$/.test(text)
                      ? setMatchInfo({ ...matchInfo, teamAguess: text })
                      : null;
                  }}
                  style={{
                    borderRadius: 6,
                    marginHorizontal: 30,
                    fontSize: 20,
                    flex: 1,
                    height: 40,
                    textAlign: "center",
                    borderColor: "gray",
                    borderWidth: 1,
                  }}
                  value={matchInfo.teamAguess}
                />
                <TextInput
                  maxLength={2}
                  onKeyPress={(e) =>
                    e.nativeEvent.key === "enter" &&
                    matchInfo.teamAguess !== "" &&
                    matchInfo.teamBguess !== ""
                      ? handleSubmitGuess()
                      : null
                  }
                  keyboardType={"number-pad"}
                  onChangeText={(text) => {
                    /^[0-9]*$/.test(text)
                      ? setMatchInfo({ ...matchInfo, teamBguess: text })
                      : null;
                  }}
                  style={{
                    borderRadius: 6,
                    marginHorizontal: 30,
                    flex: 1,
                    fontSize: 20,
                    textAlign: "center",
                    height: 40,
                    borderColor: "gray",
                    borderWidth: 1,
                  }}
                  value={matchInfo.teamBguess}
                />
              </View>
              <TouchableHighlight
                underlayColor="#85BFA1"
                style={styles.buttonStyle}
                disabled={isLoading}
                onPress={() => {
                  if (
                    matchInfo.teamAguess !== "" &&
                    matchInfo.teamBguess !== ""
                  )
                    handleSubmitGuess();
                }}
              >
                {isLoading ? (
                  <View style={styles.buttonLabelStyle}>
                    <ActivityIndicator color="white" />
                  </View>
                ) : (
                  <Text style={styles.buttonLabelStyle}>Submit</Text>
                )}
              </TouchableHighlight>
            </View>
          </Pressable>
        </Modal>
      ) : null}
      <View style={styles.openCard}>
        <Pressable onPress={() => setOpen(false)}>
          <>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#A4A4A4",
                margin: 20,
                flexDirection: "row",
              }}
            >
              <Text style={styles.roundTitleText}>Round: {data.round}</Text>
              <Icon name="angle-up" size={40} color="#000" />
            </View>
            <View style={{ marginHorizontal: 20, flexDirection: "row" }}>
              <Text
                style={{
                  fontFamily: "RobotoSlab-SemiBold",
                  fontSize: 16,
                  flex: 1,
                }}
              >
                Match
              </Text>
            </View>
            {data.matches.map((match) => {
              console.log(match);
              return (
                <Pressable
                  onPress={() => {
                    setSelectedMatch(match);
                    setModalVisible(true);
                  }}
                  style={{ marginHorizontal: 20 }}
                  key={match.matchid}
                >
                  <Text
                    style={{
                      marginVertical: 16,
                      fontFamily: "RobotoSlab-SemiBold",
                      fontSize: 16,
                      color: "#9E9E9E",
                    }}
                  >
                    {match.teamAName} X {match.teamBName}
                  </Text>
                </Pressable>
              );
            })}
          </>
        </Pressable>
      </View>
    </>
  ) : (
    <View style={styles.closedCard}>
      <TouchableWithoutFeedback onPress={() => setOpen(true)}>
        <View style={{ margin: 20, flexDirection: "row" }}>
          <Text style={styles.roundTitleText}>Round: {data.round}</Text>
          <Icon name="angle-down" size={40} color="#000"></Icon>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
