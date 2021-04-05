import React, { useState, useEffect, useRef } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import { useUserContext } from "../contexts/UserContext";
import { useTournamentContext } from "../contexts/TournamentContext";
import { StackNavigationProp } from "@react-navigation/stack";
import { DrawerNavigatorParamList } from "../navigators/DrawerNavigator";
import { RouteProp } from "@react-navigation/native";
const styles = StyleSheet.create({
  tournamentCard: {
    flexDirection: "column",
    marginVertical: 11,
    borderWidth: 1,
    borderColor: "#a3a3a3",
    borderRadius: 6,
  },
  header: {
    flex: 1,
    color: "#000",
    fontFamily: "RobotoSlab-Regular",
    fontSize: 22,
    textAlign: "center",
  },
  subHeader: {
    flexDirection: "row",
    fontSize: 16,
    color: "#000",
    fontFamily: "RobotoSlab-Regular",
  },
  entry: {
    fontFamily: "RobotoSlab-Regular",
    color: "#9E9E9E",
  },
  buttonStyle: {
    borderRadius: 10,
    marginTop: 30,
    backgroundColor: "#528C6E",
    paddingVertical: 20,
  },
  buttonLabelStyle: {
    paddingHorizontal: 50,
    textAlign: "center",
    fontSize: 13,
    fontFamily: "RobotoSlab-Bold",
    color: "white",
  },
});
interface Props {
  navigation: StackNavigationProp<DrawerNavigatorParamList, "SelectTournament">;
  route: RouteProp<DrawerNavigatorParamList, "SelectTournament">;
  data: any;
}
export default function SelectTournamentCard({
  navigation,
  route,
  data,
}: Props): JSX.Element {
  const { userState } = useUserContext();
  const [firstLoad, setFirstLoad] = useState(true);
  const { setTournament, selectedTournament } = useTournamentContext();
  console.log(route);
  const handlePress = (id) => {
    setTournament(data.tournamentid, data.name);
  };
  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
    } else {
      navigation.navigate("SelectedTournament");
    }
  }, [selectedTournament.tournament_id]);
  return (
    <View style={styles.tournamentCard}>
      <View style={{ margin: 20 }}>
        <Text style={styles.header}>{data.name}</Text>

        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <TouchableHighlight
            disabled={data.tournamentid === selectedTournament.tournament_id}
            underlayColor="#85BFA1"
            onPress={() => {
              handlePress(data.tournament_id);
            }}
            style={[
              styles.buttonStyle,
              data.tournamentid === selectedTournament.tournament_id
                ? { backgroundColor: "grey" }
                : {},
            ]}
          >
            <Text style={styles.buttonLabelStyle}>
              {data.tournamentid === selectedTournament.tournament_id
                ? "Selected"
                : "Select"}
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
}
