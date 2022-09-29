import { useState, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Input, Button } from "@rneui/themed";
import axios from "axios";
import { ENDPOINT } from "../endpoint";
import { AuthenticatedUserContext } from "../providers";
import { useEffect } from "react";
import { Colors } from "../config";

function CreateReview({ route, navigation: { goBack } }) {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const { id } = route.params;
  const [text, setText] = useState("");
  const [approved, setApproved] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await axios.get(`${ENDPOINT}/approved/${id}`);
        setApproved(data.data.some((clinic) => clinic.user_id === user.uid));
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const addReview = () => {
    try {
      axios.post(`${ENDPOINT}/reviews`, {
        date: new Date(),
        text: text,
        clinic_id: id,
        user_id: user.uid,
        approved: approved,
      });
      setText("");
      goBack();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="レビュー"
        leftIcon={{ type: "font-awesome", name: "comment", color: Colors.navy }}
        value={text}
        onChangeText={setText}
      />
      <Button
        style={styles.addButton}
        buttonStyle={{ backgroundColor: Colors.red }}
        onPress={addReview}
      >
        レビューを追加
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.light,
  },
  addButton: {
    margin: 5,
  },
});

export default CreateReview;
