import React, { useContext, useState } from "react";
import { Text, StyleSheet } from "react-native";
import { Formik } from "formik";
import { signInWithEmailAndPassword } from "firebase/auth";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import {
  View,
  TextInput,
  Logo,
  Button,
  FormErrorMessage,
} from "../components/login_components";
import { Images, Colors, auth } from "../config";
import { useTogglePasswordVisibility } from "../hooks";
import { loginValidationSchema } from "../utils";
import { UsernameContext } from "../providers/UsernameProvider";

export const LoginScreen = ({ navigation }) => {
  const { username, setUsername } = useContext(UsernameContext);
  const [errorState, setErrorState] = useState("");
  const { passwordVisibility, handlePasswordVisibility, rightIcon } =
    useTogglePasswordVisibility();

  const handleLogin = (values) => {
    console.log("Login Button ############################");
    console.log("Login username ", username);
    const { email, password } = values;
    signInWithEmailAndPassword(auth, email, password)
      // .then(res => console.log(res))
      .catch((error) => setErrorState(error.message));
  };
  return (
    <>
      <View isSafe style={styles.container}>
        <KeyboardAwareScrollView enableOnAndroid={true}>
          {/* LogoContainer: consits app logo and screen title */}
          <View style={styles.logoContainer}>
            <Logo uri={Images.logo} />
            <Text style={styles.screenTitle}>おかえりなさい！</Text>
          </View>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={loginValidationSchema}
            onSubmit={(values) => handleLogin(values)}
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
                  name="email"
                  leftIconName="email"
                  placeholder="メールアドレス"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  autoFocus={true}
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                />
                <FormErrorMessage
                  error={errors.email}
                  visible={touched.email}
                />
                <TextInput
                  name="password"
                  leftIconName="key-variant"
                  placeholder="パスワード"
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry={passwordVisibility}
                  textContentType="password"
                  rightIcon={rightIcon}
                  handlePasswordVisibility={handlePasswordVisibility}
                  value={values.password}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                />
                <FormErrorMessage
                  error={errors.password}
                  visible={touched.password}
                />
                {/* Display Screen Error Mesages */}
                {errorState !== "" ? (
                  <FormErrorMessage error={errorState} visible={true} />
                ) : null}
                {/* Login button */}
                <Button style={styles.button} onPress={handleSubmit}>
                  <Text style={styles.buttonText}>ログイン</Text>
                </Button>
              </>
            )}
          </Formik>
          {/* Button to navigate to SignupScreen to create a new account */}
          <Text
            style={{
              marginTop: 20,
              alignSelf: "center",
              fontSize: 16,
              color: Colors.navy,
            }}
          >
            初めてのご利用の場合は
          </Text>
          <Button
            style={{
              marginTop: 5,
              alignItems: "center",
              justifyContent: "center",
            }}
            borderless
            title={"アカウントを作成してください"}
            onPress={() => navigation.navigate("Signup")}
          />
          <Button
            style={styles.borderlessButtonContainer}
            borderless
            title={"パスワードを忘れた場合"}
            onPress={() => navigation.navigate("ForgotPassword")}
          />
        </KeyboardAwareScrollView>
      </View>

      {/* App info footer */}
      {/* <View style={styles.footer}>
        <Text style={styles.footerText}>
          Expo Firebase Starter App (based on managed workflow)
        </Text>
      </View> */}
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
  },
  screenTitle: {
    fontSize: 25,
    fontWeight: "500",
    color: Colors.navy,
    paddingTop: 20,
  },
  footer: {
    backgroundColor: Colors.light,
    paddingHorizontal: 12,
    paddingBottom: 48,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    fontWeight: "700",
    // color: Colors.orange,
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
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
