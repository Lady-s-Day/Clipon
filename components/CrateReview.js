import { Divider } from "@rneui/themed";
import { View, Text, StyleSheet } from "react-native";
import { Input, Button } from "@rneui/themed";

function CreateReview() {
  return (
    <View style={styles.container}>
      <Input
        placeholder="レビュー"
        leftIcon={{ type: 'font-awesome', name: 'comment' }}
        onChangeText={value => this.setState({ comment: value })}
      />
      <Button color="warning" style={styles.addButton} buttonStyle={{ backgroundColor: 'rgb(212, 91, 18)' }}>レビューを追加</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 10
  },
  addButton: {
    margin: 5
  }
});

export default CreateReview;