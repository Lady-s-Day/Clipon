import React, { useContext } from "react";
import { Divider } from "@rneui/themed";
import { Icon, Button } from "@rneui/themed";
import { View, Text, StyleSheet } from "react-native";
import { AuthenticatedUserContext } from "../providers";
import { signOut } from "firebase/auth";
import { Button as CButton } from "./login_components/Button";
import { auth, Colors } from "../config";
import { UsernameContext } from "../providers/UsernameProvider";

function MyPage({ navigation }) {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const { username, setUsername } = useContext(UsernameContext);
  const handleLogout = () => {
    signOut(auth).catch((error) => console.log("Error logging out: ", error));
    setUsername(null);
  };

  return (
    <View style={styles.container}>
      <Icon raised name="person" color={Colors.navy} />
      <Text style={styles.text}>ユーザー名: {username}</Text>
      <Divider />
      <Text style={styles.text}>メールアドレス: {user.email}</Text>
      <Divider />
      <Text style={styles.text}>病院の承認について：</Text>
      <Text style={styles.text}>
        実際に利用された病院の明細書や領収書の{"\n"}
        承認を行い、口コミの精度を向上します。{"\n"}
        承認後は承認済みを示すバッチを表示します。
      </Text>
      <Divider />
      <View style={{ marginTop: 20 }}>
        <Button
          radius={5}
          buttonStyle={{ backgroundColor: Colors.red }}
          onPress={() => navigation.navigate("ClinicName")}
          titleStyle={{ fontSize: 20, fontFamily: "font2" }}
        >
          病院の承認を行う
        </Button>
      </View>
      <CButton
        style={styles.borderlessButtonContainer}
        borderless
        title={"サインアウト"}
        onPress={handleLogout}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.light,
    color: Colors.navy,
  },
  borderlessButtonContainer: {
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center",
    color: Colors.navy,
  },
  text: {
    // fontWeight: "500",
    fontSize: 17,
    padding: 5,
    color: Colors.navy,
    fontFamily: "font2",
  },
});

export default MyPage;
