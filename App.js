import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import Tabs from "./components/Tabs";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
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
      <Tabs />
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
