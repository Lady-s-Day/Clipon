import React from "react";
import { StyleSheet, Text } from "react-native";

import { Colors } from "../../config";

export const FormErrorMessage = ({ error, visible }) => {
  if (!error || !visible) {
    return null;
  }

  // console.log("error::::::::::::::", error);
  if (error == "Email is a required field") {
    error = "メールアドレスを入力してください";
  }
  if (error == "Password is a required field") {
    error = "パスワードを入力してください";
  }
  if (error == "Password must be at least 6 characters") {
    error = "パスワードは6文字以上にしてください";
  }
  if (error == "Firebase: Error (auth/wrong-password).") {
    error = "パスワードが間違っています";
  }
  if (error == "Email must be a valid email") {
    error = "メールアドレスの形式が正しくありません";
  }
  if (error == "Firebase: Error (auth/user-not-found).") {
    error = "メールアドレスまたはパスワードが違います";
  }
  if (error == "Enter a valid email") {
    error = "有効なメールアドレスを入力してください";
  }
  if (error == "Please enter a registered email") {
    error = "登録済みのメールアドレスを入力してください";
  }
  if (error == "Confirm Password must match password.") {
    error = "確認用パスワードがパスワードと一致していません";
  }

  return <Text style={styles.errorText}>{error}</Text>;
};

const styles = StyleSheet.create({
  errorText: {
    marginLeft: 15,
    color: Colors.red,
    fontSize: 16,
    marginVertical: 8,
    fontWeight: "600",
    fontFamily: "font2",
  },
});
