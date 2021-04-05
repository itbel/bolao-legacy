import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
const styles = StyleSheet.create({
  openCard: {
    flexDirection: "column",
    marginVertical: 11,
    borderColor: "#a3a3a3",
    borderRadius: 6,
    borderWidth: 1,
    paddingBottom: 10,
    backgroundColor: "#FFF",
  },
  closedCard: {
    flexDirection: "column",
    flexGrow: 1,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#a3a3a3",
    backgroundColor: "#eff6f2",
    marginVertical: 11,
  },
  roundTitleText: {
    flex: 1,
    fontFamily: "RobotoSlab-Regular",
    fontSize: 22,
  },
});
export default function RoundAccordion({ openState, data }: any): JSX.Element {
  const [open, setOpen] = useState(openState);
  const [roundPoints, setroundPoints] = useState({});
  useEffect(() => {
    let userPoints = {};
    data.matches.forEach((match) => {
      match.guesses.forEach((guess) => {
        if (userPoints[guess?.name]) {
          if (guess?.points)
            userPoints[guess?.name] =
              userPoints[guess?.name] + guess?.points ?? 0;
        } else {
          if (guess?.name) {
            userPoints[guess?.name] = 0;
            userPoints[guess?.name] = userPoints[guess?.name] + guess?.points;
          }
        }
      });
    });
    setroundPoints(userPoints);
  }, [data]);
  return (
    <>
      {open ? (
        <TouchableHighlight
          underlayColor="#bfd9cc"
          activeOpacity={0.6}
          style={styles.openCard}
          onPress={() => setOpen(false)}
        >
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
            {data.matches.map((match, matchkey) => {
              return (
                <View style={{ marginHorizontal: 20 }} key={matchkey}>
                  <Text
                    style={{
                      marginVertical: 8,
                      fontFamily: "RobotoSlab-Medium",
                      fontSize: 16,
                    }}
                  >
                    {match.teamAName} {match.teamAResult} X {match.teamBResult}{" "}
                    {match.teamBName}
                  </Text>
                  {match.guesses.map((guess, index) => {
                    if (guess)
                      return (
                        <View
                          key={index}
                          style={{ marginVertical: 2, flexDirection: "row" }}
                        >
                          <Text
                            style={{
                              flex: 1,
                              color: "#9E9E9E",
                              fontFamily: "RobotoSlab-Regular",
                              fontSize: 14,
                            }}
                          >
                            {guess?.name}
                          </Text>
                          <Text
                            style={{
                              fontFamily: "RobotoSlab-Regular",
                              fontSize: 14,
                              color: "#9E9E9E",
                            }}
                          >
                            {guess?.teamAguess} X {guess?.teamBguess}{" "}
                            {guess?.points !== undefined
                              ? `(${guess.points})`
                              : null}
                          </Text>
                        </View>
                      );
                    else return null;
                  })}
                </View>
              );
            })}
          </>
        </TouchableHighlight>
      ) : (
        <TouchableHighlight
          underlayColor="#bfd9cc"
          activeOpacity={0.6}
          style={styles.closedCard}
          onPress={() => setOpen(true)}
        >
          <>
            <View style={{ margin: 20, flexDirection: "row" }}>
              <Text style={styles.roundTitleText}>Round: {data.round}</Text>
              <Icon name="angle-down" size={40} color="#000"></Icon>
            </View>
            <View style={{ marginBottom: 20 }}>
              {roundPoints
                ? Object.keys(roundPoints).map((player, index) => {
                    if (roundPoints[player] && roundPoints[player] > 0) {
                      return (
                        <View
                          key={index}
                          style={{
                            marginVertical: 2,
                            flexDirection: "row",
                            marginHorizontal: 20,
                          }}
                        >
                          <Text
                            style={{
                              flex: 1,
                              color: "black",
                              fontFamily: "RobotoSlab-Regular",
                              fontSize: 15,
                            }}
                          >
                            {player}
                          </Text>
                          <Text
                            style={{
                              fontFamily: "RobotoSlab-Regular",
                              fontSize: 16,
                              color: "black",
                            }}
                          >
                            {roundPoints[player] > 0
                              ? `+${roundPoints[player]}`
                              : roundPoints[player]}
                          </Text>
                        </View>
                      );
                    }
                  })
                : null}
            </View>
          </>
        </TouchableHighlight>
      )}
    </>
  );
}
