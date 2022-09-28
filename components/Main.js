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
<<<<<<< HEAD
import ClinicName from "./ClinicName";
=======
import { Colors } from "../config";
>>>>>>> 6dfb3e3d3b8529f3c1fddf015d804c87bf6406c7
// import "expo-dev-client";
// import LoginAndroid from "./components/LoginAndroid";

export default function Main() {
  const Stack = createNativeStackNavigator();

  return (
    // <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={Tabs}
        options={{ title: "ホーム", headerShown: false }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{ headerTitleAlign: "center", title: "クリニックを検索" }}
      />
      <Stack.Screen
        name="CreateReview"
        component={CreateReview}
        options={{ headerTitleAlign: "center", title: "レビューを追加" }}
      />
      <Stack.Screen
        name="Clinic"
        component={Clinic}
        options={{ headerTitleAlign: "center" }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerTitleAlign: "center" }}
      />
      <Stack.Screen
        name="Camera"
        component={Camera}
        options={{ headerTitleAlign: "center", title: "認証" }}
      />
      <Stack.Screen
        name="ClinicName"
        component={ClinicName}
        options={{ headerTitleAlign: "center", title: "病院名" }}
      />
      <Stack.Screen
        name="Approval"
        component={Approval}
        options={{headerTitleAlign: "center", title: "承認"}}
      />
    </Stack.Navigator>
    // </NavigationContainer>
  );
}
