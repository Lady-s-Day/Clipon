import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import Tabs from "./components/Tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "./components/Home";
import Search from "./components/Search";
import Clinic from "./components/Clinic";

export default function App() {
  const Stack = createNativeStackNavigator();
  // const [state, setState] = useState("");

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       // need proxy setting in package.json to use axios
  //       // const { data: response } = await axios.get(
  //       //   "https://a688-27-91-167-204.ngrok.io/"
  //       // );
  //       const response = await fetch(
  //         "https://3ce2-2405-6580-a6a0-2700-2823-ce5d-f69c-b8d1.ngrok.io"
  //       ).then((res) => res.json());
  //       console.log(response);
  //       setState(response);
  //     } catch (err) {
  //       console.error("Error starting app!", err);
  //     }
  //   })();
  // }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{ headerTitleAlign: "center", title: "クリニックを検索" }}
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
      </Stack.Navigator>
    </NavigationContainer>
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
