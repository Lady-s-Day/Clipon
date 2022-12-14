import { View, Text, Image } from "react-native";
import { Colors } from "../config";
import { Button } from "@rneui/themed";
import Tabs from "./Tabs";
import { Avatar } from "@rneui/base";

export const Approval = ({ route, navigation }) => {
  const { approval: approval } = route.params;

  if (approval === true) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Colors.light,
          color: Colors.navy,
        }}
      >
        <Text style={{ fontSize: 20, fontFamily: "font2", color: Colors.navy }}>
          承認できました。{"\n"}是非レビューしてね♪
        </Text>
        <Image
          style={{ height: 250, width: 300, marginTop: 20, marginBottom: 20 }}
          resizeMode="contain"
          source={require("../assets/meditating.png")}
        />
        <View style={{ marginTop: 20 }}>
          <Button
            radius={5}
            buttonStyle={{ backgroundColor: Colors.red }}
            onPress={() =>
              navigation.navigate("Tabs", { screen: "マイページ" })
            }
          >
            マイページに戻る
          </Button>
        </View>
      </View>
    );
  }

  if (approval === false) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Colors.light,
          color: Colors.navy,
        }}
      >
        <Text style={{ fontSize: 20, fontFamily: "font2", color: Colors.navy }}>
          承認できませんでした。{"\n"}ごめんね・・・
        </Text>
        <Image
          style={{ height: 250, width: 270, marginTop: 20, marginBottom: 20 }}
          resizeMode="contain"
          source={require("../assets/loving.png")}
        />
        <View style={{ marginTop: 20 }}>
          <Button
            radius={5}
            buttonStyle={{ backgroundColor: Colors.red }}
            onPress={() =>
              navigation.navigate("Tabs", { screen: "マイページ" })
            }
          >
            <Text
              style={{
                fontSize: 18,
                color: Colors.white,
                fontFamily: "font2bold",
                padding: 2,
              }}
            >
              マイページに戻る
            </Text>
          </Button>
        </View>
      </View>
    );
  }

  //   if (approve.hosp1 === "pending") {
  // return (
  //   <View
  //     style={{
  //       flex: 1,
  //       justifyContent: "center",
  //       alignItems: "center",
  //       backgroundColor: Colors.light,
  //       color: Colors.navy,
  //     }}
  //   >
  //     <Text>loading...</Text>
  //     <Image
  //       source={require("../assets/loading.gif")}
  //       style={{ width: 150 }}
  //       resizeMode="contain"
  //     />
  //   </View>
  // );
  //   }
};
