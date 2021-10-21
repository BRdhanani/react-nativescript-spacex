import * as React from "react";
import { BaseNavigationContainer } from "@react-navigation/core";
import { stackNavigatorFactory } from "react-nativescript-navigation";
import { HomeScreen } from "./HomeScreen";
import { Launches } from "./Launches";
import { SecondaryScreen } from "./SecondaryScreen";

const StackNavigator = stackNavigatorFactory();

export const mainStackNavigator = () => (
  <BaseNavigationContainer>
    <StackNavigator.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: "white"
        },
        headerShown: true
      }}
    >
      <StackNavigator.Screen name="Home" component={HomeScreen} />
      <StackNavigator.Screen name="Launches" component={Launches} />
      <StackNavigator.Screen name="Secondary" component={SecondaryScreen} />
    </StackNavigator.Navigator>
  </BaseNavigationContainer>
);
