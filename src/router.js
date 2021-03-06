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
import MemberAttendance from './components/MemberAttendance';
import NewsItem from './components/News';
import EventList from './components/Events';

const headerStyle = {
  marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
};


const TabNav = createBottomTabNavigator(
  {
    Home: {
      screen: createStackNavigator({
        Home: {
          screen: Home
        }
      }),
      navigationOptions: {
        tabBarLabel: "Home"
      }
    },
    MemberList: {
      screen: MemberListPage,
      navigationOptions: {
        tabBarLabel: "Members"
      }
    },
    EventList: {
      screen: createStackNavigator({
        Home: {
          screen: EventList
        }
      }),
      navigationOptions: {
        tabBarLabel: "Events"
      }
    },
    MemberAttendance: {
      screen: MemberAttendance,
      navigationOptions: {
        tabBarLabel: "Attendance"
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
  },
  SectionSwitch: {
    screen: SectionSwitch
  },
  NewsItem: {
    screen: NewsItem
  }
});

export const createRootNavigator = (signedIn = false) => {
  return StackNav;
};