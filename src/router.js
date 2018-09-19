import React from "react";
import { Platform, StatusBar, Text } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator,
  StackNavigator,
  TabNavigator,
  SwitchNavigator
} from "react-navigation";
import { FontAwesome } from "react-native-vector-icons";

import SignIn from "./components/LoginScreen";
import Home from "./components/Home";
import MemberListPage from "./components/MemberList";
import SectionSwitch from './components/SectionSwitch';

const headerStyle = {
  marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
};

export const SignedOut = createStackNavigator({
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      title: "Sign In",
      headerStyle
    }
  }
});

export const SignedIn = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: "Home",
        /* tabBarIcon: ({ tintColor }) => (
            <FontAwesome name="home" size={30} color={tintColor} />
        ) */
      }
    },
    Profile: {
        screen: MemberListPage,
        navigationOptions: {
            tabBarLabel: "Members"
        }
    },
    SectionSwitch: {
        screen: SectionSwitch, 
        navigationOptions: {
          tabBarLabel: "SectionSwitch"
        }
    }
  },
  {
    tabBarOptions: {
      style: {
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
      }
    }
  }
);

export const createRootNavigator = (signedIn = false) => {
  return createSwitchNavigator(
    {
      SignedIn: {
        screen: SignedIn
      },
      SignedOut: {
        screen: SignedOut
      }
    },
    {
      initialRouteName: signedIn ? "SignedIn" : "SignedOut"
    }
  );
};