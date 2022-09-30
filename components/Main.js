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
        options={{ title: "ホーム", headerShown: false }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{ headerTitleAlign: "center", title: "クリニックを検索" }}
      />
      <Stack.Screen
          name="ClinicCard"
          component={ClinicCard}
          options={{ headerTitleAlign: "center", title: "クリニック一覧" }}
      />
      <Stack.Screen
        name="Clinic"
        component={Clinic}
        options={{ headerTitleAlign: "center" }}
      />
      <Stack.Screen
          name="CreateReview"
          component={CreateReview}
          options={{ headerTitleAlign: "center", title: "レビューを追加" }}
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
        options={{ headerTitleAlign: "center", title: "承認" }}
      />
      <Stack.Screen name="MyPage" component={MyPage} />
    </Stack.Navigator>
    </SavedContext.Provider>
    // </NavigationContainer>
  );
}
