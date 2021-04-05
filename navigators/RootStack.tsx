import React from "react";
import AuthNavigator from "./AuthNavigator";
import { useUserContext } from "../contexts/UserContext";
import DrawerNavigator from "./DrawerNavigator";

export default function RootStack(): JSX.Element {
  const { userState } = useUserContext();
  return !userState.isLoggedIn ? (
    <AuthNavigator></AuthNavigator>
  ) : (
    <DrawerNavigator></DrawerNavigator>
  );
}
