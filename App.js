import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import Tabs from "./components/Tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./components/Home";
import Search from "./components/Search";
import Clinic from "./components/Clinic";
import Camera from "./components/Camera";
// import "expo-dev-client";
// import LoginAndroid from "./components/LoginAndroid";

export default function App() {
  const Stack = createNativeStackNavigator();

  // return (
  //   <NavigationContainer>
  //     <Stack.Navigator>
  //       <Stack.Screen
  //         name="Tabs"
  //         component={Tabs}
  //         options={{ headerShown: false }}
  //       />
  //       <Stack.Screen
  //         name="Search"
  //         component={Search}
  //         options={{ headerTitleAlign: "center", title: "クリニックを検索" }}
  //       />
  //       <Stack.Screen
  //         name="Clinic"
  //         component={Clinic}
  //         options={{ headerTitleAlign: "center" }}
  //       />
  //       <Stack.Screen
  //         name="Home"
  //         component={Home}
  //         options={{ headerTitleAlign: "center" }}
  //       />
  //     </Stack.Navigator>
  //   </NavigationContainer>
  // )

  return (
    <View style={styles.container}>
      {/* <LoginAndroid /> */}
      <Text>Open up App.js to start working on your app!</Text>
      <Camera />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
