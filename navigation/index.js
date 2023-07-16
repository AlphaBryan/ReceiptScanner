/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Pressable } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import NotFoundScreen from "../screens/NotFoundScreen";
import Home from "../screens/Scan";
import Profil from "../screens/Profil";
import LinkingConfiguration from "./LinkingConfiguration";
import Scan from "../screens/Scan";
import StatisticsScreen from "../screens/Statistics";
import SearchScreen from "../screens/Search";
import TicketListScreen from "../screens/TicketList";
import ScanningResult from "../screens/Scanning/ScanningResult";
import TakingPicture from "../screens/Scanning/TakingPicture";

export default function Navigation({ colorScheme }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Screen
        name="ScanningResult"
        component={ScanningResult}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TicketList"
        component={TicketListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="TakingPicture" component={TakingPicture} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Scan"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        headerShown: false,
      }}
    >
      <BottomTab.Screen
        name="Scan"
        component={Scan}
        options={({ navigation }) => ({
          title: "Scan",

          tabBarIcon: ({ color, size }) => <TabBarIcon name="home" color={color} size={size * 0.9} />,
        })}
      />

      <BottomTab.Screen
        name="Statistics"
        component={StatisticsScreen}
        options={({ navigation }) => ({
          title: "Statistics",

          tabBarIcon: ({ color, size }) => <TabBarIcon name="calculator" color={color} size={size * 0.9} />,
        })}
      />

      <BottomTab.Screen
        name="Search"
        component={SearchScreen}
        options={({ navigation }) => ({
          title: "Search",

          tabBarIcon: ({ color, size }) => <TabBarIcon name="search" color={color} size={size * 0.9} />,
        })}
      />

      <BottomTab.Screen
        name="Profil"
        component={Profil}
        options={{
          title: "Profil",
          tabBarIcon: ({ color, size }) => <TabBarIcon name="user" color={color} size={size * 0.9} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
