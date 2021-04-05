import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableHighlight,
  Text,
  ActivityIndicator,
} from "react-native";
import SelectTournamentCard from "./SelectTournamentCard";
import Header from "./Header";
import Axios from "axios";
import { useUserContext } from "../contexts/UserContext";
import { RouteProp, useIsFocused } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { DrawerNavigatorParamList } from "../navigators/DrawerNavigator";
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
    marginTop: 60,
    marginBottom: 30,
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

interface Props {
  navigation: StackNavigationProp<DrawerNavigatorParamList, "SelectTournament">;
  route: RouteProp<DrawerNavigatorParamList, "SelectTournament">;
  data: any;
}

export default function SelectTournament({
  navigation,
  route,
}: Props): JSX.Element {
  const isFocused = useIsFocused();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const { userState } = useUserContext();
  const [isLoading, setIsLoading] = useState(true);
  const [joinedTournaments, setJoinedTournaments]: any = useState();
  /// TODO: Users with no joined tournaments need to be redirected to the tournaments list to join
  useEffect(() => {
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
    if (isFocused) {
      fetchJoinedTournaments();
    }
  }, [isFocused]);
  return (
    <View style={styles.backgroundd}>
      <StatusBar barStyle="dark-content" backgroundColor="#528C6E"></StatusBar>
      <Header navigation={navigation}></Header>

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
            <View style={{ marginHorizontal: 30, flex: 1 }}>
              {joinedTournaments?.length !== 0 ? (
                <>
                  <Text style={styles.heading}>Select tournament</Text>
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ flex: 1 }}
                  >
                    {joinedTournaments ? (
                      joinedTournaments.map((tournament, index) => {
                        return (
                          <SelectTournamentCard
                            route={route}
                            key={index}
                            data={tournament}
                            navigation={navigation}
                          ></SelectTournamentCard>
                        );
                      })
                    ) : (
                      <>
                        <Text style={styles.subHeading}>
                          No tournaments joined
                        </Text>
                        <TouchableHighlight
                          underlayColor="#85BFA1"
                          onPress={() =>
                            navigation.navigate("ManageTournaments")
                          }
                          style={styles.buttonStyle}
                        >
                          <Text style={styles.buttonLabelStyle}>
                            Join A Tournament
                          </Text>
                        </TouchableHighlight>
                      </>
                    )}
                  </ScrollView>
                </>
              ) : (
                <>
                  <Text style={styles.heading}>No joined tournaments</Text>
                  <TouchableHighlight
                    underlayColor="#85BFA1"
                    onPress={() => {
                      navigation.navigate("ManageTournaments");
                    }}
                    style={styles.buttonStyle}
                  >
                    <Text style={styles.buttonLabelStyle}>
                      View all available tournaments
                    </Text>
                  </TouchableHighlight>
                </>
              )}
            </View>
          </>
        )}
      </View>
    </View>
  );
}
