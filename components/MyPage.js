import React, { useEffect, useContext, useState } from "react";
import { Divider } from "@rneui/themed";
import { Icon, Button, Avatar } from "@rneui/themed";
import { View, Text, StyleSheet, ViewBase } from "react-native";
import { AuthenticatedUserContext } from "../providers";
import { signOut } from "firebase/auth";
import { Button as CButton } from "./login_components/Button";
import { auth, Colors } from "../config";
import { UsernameContext } from "../providers/UsernameProvider";
import axios from "axios";
import { ENDPOINT } from "../endpoint";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

function MyPage({ navigation }) {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const { username, setUsername } = useContext(UsernameContext);
  const [clinics, setClinics] = useState([]);
  const handleLogout = () => {
    signOut(auth).catch((error) => console.log("Error logging out: ", error));
    setUsername(null);
  };

  useEffect(() => {
    (async () => {
      try {
        const { data: clinic } = await axios.get(
          `${ENDPOINT}/approvedClinics/${user.uid}`
        );
        setClinics(clinic);
      } catch (err) {
        console.error("Error getting approved clinics", err);
      }
    })();
  }, [clinics]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Avatar
          margin={10}
          size={72}
          rounded
          source={require("../assets/plant.png")}
          containerStyle={{
            borderColor: "grey",
            borderStyle: "solid",
            borderWidth: 1,
          }}
        />
        <Text style={styles.text}>ユーザー名: {username}</Text>
        <Divider />
        <Text style={styles.text}>メールアドレス: {user.email}</Text>
        <Divider />
        <View>
          <Text style={styles.text}>承認された病院:</Text>
          {clinics?.map((clinic, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  navigation.navigate("Clinic", {
                    id: clinic.id,
                  });
                }}
              >
                <Text style={styles.list}>
                  <Text style={styles.text}>✔︎ </Text>
                  {clinic.clinic_name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <Divider />
        <Text style={styles.text}>病院の承認について：</Text>
        <Text style={styles.text}>
          実際に利用された病院の明細書や領収書の{"\n"}
          承認を行い、口コミの精度を向上します。{"\n"}
          承認後は承認済みを示すバッチ
          <Icon
            size={20}
            name="verified"
            iconStyle={styles.icon}
            color={Colors.red} />を表示します。
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
      </ScrollView>
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
    marginBottom: 20,
  },
  text: {
    fontSize: 17,
    padding: 5,
    color: Colors.navy,
    fontFamily: "font2",
  },
  list: {
    fontSize: 17,
    padding: 5,
    color: Colors.red,
    fontFamily: "font2",
  },
  icon: {
    padding: 3,
    position: "absolute",
    top: 3,
    left: 4
  }
});

export default MyPage;
