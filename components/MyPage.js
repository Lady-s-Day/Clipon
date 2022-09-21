import { Divider } from "@rneui/themed";
import { Icon, Button } from "@rneui/themed";
import { View, Text, StyleSheet } from "react-native";

function MyPage({ navigation }) {
  return (
    <View style={styles.container}>
      <Icon raised name="person" color="black" />
      <Text style={{ fontWeight: "bold", fontSize: 16, padding: 5 }}>ユーザー名:</Text>
      <Divider />
      <Text style={{ fontWeight: "bold", fontSize: 16, padding: 5 }}>メールアドレス:</Text>
      <Divider />
      <View style={{ marginTop: 20 }}>
        <Button
          radius={5}
          buttonStyle={{ backgroundColor: 'rgb(212, 91, 18)' }}
          onPress={() => navigation.navigate('Camera')}
        >
          認証する
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  }
});

export default MyPage;