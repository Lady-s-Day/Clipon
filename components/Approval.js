import { View, Text } from "react-native";
import { Colors } from "../config";
import { Button } from "@rneui/themed";

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
        <Text style={{ fontSize: 20 }}>認証できました</Text>
        <View style={{ marginTop: 20 }}>
          <Button
            radius={5}
            buttonStyle={{ backgroundColor: Colors.red }}
            onPress={() => navigation.navigate("MyPage")}
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
        <Text style={{ fontSize: 20 }}>認証できませんでした</Text>
        <View style={{ marginTop: 20 }}>
          <Button
            radius={5}
            buttonStyle={{ backgroundColor: Colors.red }}
            onPress={() => navigation.navigate("MyPage")}
          >
            マイページに戻る
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
