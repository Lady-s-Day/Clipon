import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import Tabs from "./Tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Home";
import Search from "./Search";
import Clinic from "./Clinic";
import Camera from "./Camera";
import CreateReview from "./CrateReview";
import ClinicName from "./ClinicName";
import ClinicCard from "./ClinicCard";
import { Colors } from "../config";
import { CheckedContext } from "../providers/CheckedProvider";
import { Approval } from "./Approval";
import MyPage from "./MyPage";
// import "expo-dev-client";
// import LoginAndroid from "./components/LoginAndroid";
import { SavedContext } from "../providers/SavedContext";

export default function Main() {
  const [favorite, setFavorite] = useState({});
  const Stack = createNativeStackNavigator();

  return (
    // <NavigationContainer>
    <SavedContext.Provider value={{ favorite, setFavorite }}>
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={Tabs}
      />
      <Stack.Screen
        name="ClinicCard"
        component={ClinicCard}
      />
      <Stack.Screen
        name="Clinic"
        component={Clinic}
      />
      <Stack.Screen
        name="Search"
        component={Search}
      />
      <Stack.Screen
          name="CreateReview"
          component={CreateReview}
      />
      <Stack.Screen
        name="Camera"
        component={Camera}
      />
      <Stack.Screen
        name="ClinicName"
        component={ClinicName}
      />
      <Stack.Screen
        name="Approval"
        component={Approval}
      />
      <Stack.Screen name="MyPage" component={MyPage} />
    </Stack.Navigator>
    </SavedContext.Provider>
    // </NavigationContainer>
  );
}
