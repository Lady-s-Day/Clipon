import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { UserContext } from "../context/UserContext";
import LoginAndroid from "./LoginAndroid";

const Stack = createNativeStackNavigator();

const RootStack = () => {
  const [user, setUser] = useState();

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen name="Home" component={Home} />
        ) : (
          <Stack.Screen name="Login" component={LoginAndroid} />
        )}
      </Stack.Navigator>
    </UserContext.Provider>
  );
};

export default RootStack;
