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
import MemberDetailPage from './components/MemberDetail';
import MemberDetailEntry from './components/MemberDetailEntry';

const headerStyle = {
  marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
};


const TabNav = createBottomTabNavigator(
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
    MemberList: {
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

export const StackNav = createStackNavigator({
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      title: "Sign In",
      headerStyle
    }
  },
  Home: {
    screen: TabNav,
    navigationOptions: {
      header: null
    }
  },
  MemberDetailPage: {
    screen: MemberDetailPage
  },
  MemberDetailEntry: {
    screen: MemberDetailEntry
  }
});

export const createRootNavigator = (signedIn = false) => {
  return StackNav;
};