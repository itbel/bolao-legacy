import React, { useEffect } from "react";

import { createStackNavigator } from "@react-navigation/stack";

import SplashScreen from "../screens/SplashScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";

export type AuthNavigatorParamList = {
  SplashScreen: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  ForgotPasswordScreen: undefined;
};

const Auth = createStackNavigator<AuthNavigatorParamList>();

export default function AuthNavigator(): JSX.Element {
  return (
    <Auth.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="SplashScreen"
    >
      <Auth.Screen name="SplashScreen" component={SplashScreen} />
      <Auth.Screen name="LoginScreen" component={LoginScreen} />
      <Auth.Screen name="RegisterScreen" component={RegisterScreen} />
      <Auth.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
      />
    </Auth.Navigator>
  );
}
