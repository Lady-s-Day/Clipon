import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { RootNavigator } from "./navigation/RootNavigator";
import { AuthenticatedUserProvider } from "./providers";
import { useFonts } from "expo-font";

const App = () => {
  const [fontsLoaded] = useFonts({
    font1: require("./assets/fonts/Kaisei_Opti/KaiseiOpti-Regular.ttf"),
    font2: require("./assets/fonts/Zen_Maru_Gothic/ZenMaruGothic-Regular.ttf"),
    font2bold: require("./assets/fonts/Zen_Maru_Gothic/ZenMaruGothic-Bold.ttf"),
  });

  if (fontsLoaded) {
    return (
      <AuthenticatedUserProvider>
        <SafeAreaProvider>
          <RootNavigator />
        </SafeAreaProvider>
      </AuthenticatedUserProvider>
    );
  }
};

export default App;
