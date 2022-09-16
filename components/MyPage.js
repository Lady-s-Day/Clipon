import { Divider } from "@rneui/themed";
import { View, Text, StyleSheet } from "react-native";

function MyPage() {
  return (
    <View style={styles.container}>
      <Text>Name:</Text>
      <Divider />
      <Text>Email:</Text>
      <Divider />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default MyPage;