import React, { useContext } from "react";
import { Divider } from "@rneui/themed";
import { Icon, Button } from "@rneui/themed";
import { View, Text, StyleSheet } from "react-native";

import { signOut } from "firebase/auth";
import { Button as CButton } from "./login_components/Button";
import { auth } from "../config";
import { UsernameContext } from "../providers/UsernameProvider";

function MyPage({ navigation }) {
  const { username, setUsername } = useContext(UsernameContext);
  const handleLogout = () => {
    signOut(auth).catch((error) => console.log("Error logging out: ", error));
    setUsername(null);
  };

  return (
    <View style={styles.container}>
      <Icon raised name="person" color="black" />
      <Text style={{ fontWeight: "bold", fontSize: 16, padding: 5 }}>
        ユーザー名:
      </Text>
      <Divider />
      <Text style={{ fontWeight: "bold", fontSize: 16, padding: 5 }}>
        メールアドレス:
      </Text>
      <Divider />
      <View style={{ marginTop: 20 }}>
        <Button
          radius={5}
          buttonStyle={{ backgroundColor: "rgb(212, 91, 18)" }}
          onPress={() => navigation.navigate("Camera")}
        >
          認証する
        </Button>
      </View>
      <CButton
        style={styles.borderlessButtonContainer}
        borderless
        title={"Sign Out"}
        onPress={handleLogout}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  borderlessButtonContainer: {
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MyPage;
