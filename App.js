import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import Camera from "./components/Camera";

export default function App() {
  const [state, setState] = useState("");

  useEffect(() => {
    // (async () => {
    //   try {
    //     // need proxy setting in package.json to use axios
    //     // const { data: response } = await axios.get(
    //     //   "https://a688-27-91-167-204.ngrok.io/"
    //     // );
    //     const response = await fetch(
    //       "https://7cc2-153-136-225-46.ngrok.io"
    //     ).then((res) => res.json());
    //     console.log(response);
    //     setState(response);
    //   } catch (err) {
    //     console.error("Error starting app!", err);
    //   }
    // })();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      {/* <Text>{state.apple}</Text> */}
      <Camera />
      <StatusBar style="auto" />
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
