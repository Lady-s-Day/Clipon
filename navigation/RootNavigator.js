import React, { useState, useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";

import { AuthStack } from "./AuthStack";
import { AppStack } from "./AppStack";
import { AuthenticatedUserContext } from "../providers";
import { auth } from "../config";
import { LoadingIndicator } from "../components/login_components";
import { UsernameContext } from "../providers/UsernameProvider";
import { UsernameStack } from "./UsernameStack";
import axios from "axios";

export const RootNavigator = () => {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const { username, setUsername } = useContext(UsernameContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // onAuthStateChanged returns an unsubscriber
    const unsubscribeAuthStateChanged = onAuthStateChanged(
      auth,
      (authenticatedUser) => {
        authenticatedUser ? setUser(authenticatedUser) : setUser(null);
        setIsLoading(false);
      }
    );

    // console.log("RootNavigator, line29 ", user.email);

    // unsubscribe auth listener on unmount
    return unsubscribeAuthStateChanged;
  }, [user]);

  useEffect(() => {
    console.log("RootNavigator, username ", username);
  }, [username]);

  // useEffect(() => {
  //   if (!username) {
  //     (async () => {
  //       try {
  //         const { data: response } = await axios.get(`/username/${user.uid}`);
  //         setUsername(response.username);
  //       } catch (err) {
  //         console.log("Error getting username", err);
  //       }
  //     })();
  //   }
  // }, [username]);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <NavigationContainer>
      {user ? username ? <AppStack /> : <UsernameStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
