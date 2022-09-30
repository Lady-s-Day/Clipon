import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { UsernameScreen } from "../screens/UsernameScreen";



const Stack = createStackNavigator();

export const UsernameStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ユーザーネーム" component={UsernameScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
};
