import "react-native-gesture-handler";
import React from "react";
import RootStack from "./navigators/RootStack";
import { NavigationContainer } from "@react-navigation/native";
import { UserProvider } from "./contexts/UserContext";
import { TournamentProvider } from "./contexts/TournamentContext";

export default function App() {
  return (
    <UserProvider>
      <TournamentProvider>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </TournamentProvider>
    </UserProvider>
  );
}
