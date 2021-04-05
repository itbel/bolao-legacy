import React from "react";
import { Appbar } from "react-native-paper";
import { useTournamentContext } from "../contexts/TournamentContext";
import { useUserContext } from "../contexts/UserContext";

export function Header({ navigation }: any): JSX.Element {
  const { userState } = useUserContext();
  const { selectedTournament } = useTournamentContext();
  return (
    <Appbar.Header
      style={{
        backgroundColor: "#528C6E",
        height: 140,
        elevation: 0,
        shadowColor: "#528C6E",
        shadowRadius: 0,
        shadowOpacity: 1,
        shadowOffset: { width: 0, height: 0 },
      }}
    >
      <Appbar.BackAction
        onPress={() => {
          if (navigation.canGoBack()) navigation.goBack();
        }}
      />
      <Appbar.Content
        titleStyle={{ fontSize: 23, fontFamily: "RobotoSlab-Regular" }}
        subtitleStyle={{ fontSize: 13, fontFamily: "RobotoSlab-Regular" }}
        title={
          selectedTournament.tournament_name === ""
            ? "Welcome"
            : selectedTournament.tournament_name
        }
        subtitle={userState.name}
      />
      {selectedTournament.tournament_id !== "" ? (
        <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
      ) : null}
    </Appbar.Header>
  );
}

export default Header;
