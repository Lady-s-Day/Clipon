import React, { useContext, useEffect, useState } from "react";
import { Text, StyleSheet } from "react-native";
import { Formik } from "formik";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import {
  View,
  TextInput,
  Logo,
  Button,
  FormErrorMessage,
} from "../components/login_components";
import { Images, Colors } from "../config";
import { loginValidationSchema } from "../utils";
import axios from "axios";
import { UsernameContext } from "../providers/UsernameProvider";
import { AuthenticatedUserContext } from "../providers";
import { usernameValidationSchema } from "../utils";
import { ENDPOINT } from "../endpoint";

import { signOut } from "firebase/auth";

import { auth } from "../config";

export const UsernameScreen = () => {
  const [errorState, setErrorState] = useState("");
  const { username, setUsername } = useContext(UsernameContext);
  const { user, setUser } = useContext(AuthenticatedUserContext);

  const handleUsernameRegister = async (values) => {
    console.log("######## register button pressed #############");

    const { username: uName } = values;

    console.log(uName);

    try {
      await axios.put(
        // `${ENDPOINT}/username?uid=${user.uid}&&username=${uName}`
        `${ENDPOINT}/username`,
        {
          uid: user.uid,
          username: uName,
        }
      );
      setUsername(uName);
    } catch (err) {
      console.log("Error registering username", err);
      setErrorState(err.message);
    }
  };

  const handleLogout = () => {
    signOut(auth).catch((error) => console.log("Error logging out: ", error));
    setUsername(null);
  };

  return (
    <>
      <View isSafe style={styles.container}>
        <KeyboardAwareScrollView enableOnAndroid={true}>
          {/* LogoContainer: consits app logo and screen title */}
          <View style={styles.logoContainer}>
            <Logo uri={Images.logo} />
            <Text style={styles.screenTitle}>ユーザー名の設定</Text>
          </View>
          <Formik
            initialValues={{
              username: "",
            }}
            // validationSchema={usernameValidationSchema}
            onSubmit={(values) => handleUsernameRegister(values)}
          >
            {({
              values,
              touched,
              errors,
              handleChange,
              handleSubmit,
              handleBlur,
            }) => (
              <>
                {/* Input fields */}
                <TextInput
                  name="username"
                  leftIconName="account"
                  placeholder="ユーザ名"
                  autoCapitalize="none"
                  keyboardType="default"
                  textContentType="username"
                  autoFocus={true}
                  value={values.uName}
                  onChangeText={handleChange("username")}
                  onBlur={handleBlur("username")}
                />
                <FormErrorMessage
                  error={errors.username}
                  visible={touched.username}
                />
                {/* Display Screen Error Mesages */}
                {errorState !== "" ? (
                  <FormErrorMessage error={errorState} visible={true} />
                ) : null}
                {/* Register button */}
                <Button style={styles.button} onPress={handleSubmit}>
                  <Text style={styles.buttonText}>登録</Text>
                </Button>
              </>
            )}
          </Formik>
          <Button
            style={styles.borderlessButtonContainer}
            borderless
            title={"サインアウト"}
            onPress={handleLogout}
          />
        </KeyboardAwareScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light,
    paddingHorizontal: 12,
  },
  logoContainer: {
    alignItems: "center",
    // resizeMode: "stretch",
    // height: 100,
    // width: 200,
  },
  screenTitle: {
    fontSize: 23,
    fontWeight: "500",
    color: Colors.navy,
    paddingTop: 20,
    marginBottom: 10,
  },
  footer: {
    backgroundColor: Colors.white,
    paddingHorizontal: 12,
    paddingBottom: 48,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.red,
  },
  button: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    backgroundColor: Colors.red,
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 20,
    color: Colors.white,
    fontWeight: "700",
  },
  borderlessButtonContainer: {
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});
