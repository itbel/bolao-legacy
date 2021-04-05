import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, View } from "react-native";
import { Assets } from "../Assets";
import GuessScreen from "../screens/GuessScreen";
import RoundsScreen from "../screens/RoundsScreen";
import RankingsScreen from "../screens/RankingsScreen";

export type TabNavigatorParamList = {
  GuessScreen: undefined;
  RulesScreen: undefined;
  RoundsScreen: undefined;
  WinsScreen: undefined;
  RankingsScreen: undefined;
};

const Tab = createBottomTabNavigator<TabNavigatorParamList>();

export default function TabNavigator(): JSX.Element {
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === "GuessScreen")
              return (
                <Image
                  style={focused ? {} : { opacity: 0.3 }}
                  source={Assets.media.guess}
                ></Image>
              );
            else if (route.name === "RulesScreen")
              return (
                <Image
                  style={focused ? {} : { opacity: 0.3 }}
                  source={Assets.media.rules}
                ></Image>
              );
            else if (route.name === "RoundsScreen")
              return (
                <Image
                  style={focused ? {} : { opacity: 0.3 }}
                  source={Assets.media.rounds}
                ></Image>
              );
            else if (route.name === "WinsScreen")
              return (
                <Image
                  style={focused ? {} : { opacity: 0.3 }}
                  source={Assets.media.wins}
                ></Image>
              );
            else if (route.name === "RankingsScreen")
              return (
                <Image
                  style={focused ? {} : { opacity: 0.3 }}
                  source={Assets.media.rank}
                ></Image>
              );
          },
        })}
        tabBarOptions={{
          labelStyle: { fontFamily: "RobotoSlab-Medium", fontSize: 12 },
          style: {
            backgroundColor: "white",
            height: 80,
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
          },
          tabStyle: { marginBottom: 10 },
          activeTintColor: "black",
          inactiveTintColor: "gray",
        }}
        initialRouteName="RoundsScreen"
      >
        <Tab.Screen
          options={{ title: "Guess" }}
          name="GuessScreen"
          component={GuessScreen}
        />
        {/*<Tab.Screen options={{ title: "Rules" }} name="RulesScreen" component={RulesScreen} />*/}
        <Tab.Screen
          options={{ title: "Rounds" }}
          name="RoundsScreen"
          component={RoundsScreen}
        />
        <Tab.Screen
          options={{ title: "Ranking" }}
          name="RankingsScreen"
          component={RankingsScreen}
        />
        {/*<Tab.Screen options={{ title: "Wins" }} name="WinsScreen" component={WinsScreen} />*/}
      </Tab.Navigator>
    </View>
  );
}
