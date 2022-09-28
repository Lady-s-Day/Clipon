import { useState, useContext } from "react";
import { Divider } from "@rneui/themed";
import { View, Text, StyleSheet } from "react-native";
import { Input, Button } from "@rneui/themed";
import axios from 'axios';
import { ENDPOINT } from "../endpoint";
import { AuthenticatedUserContext } from "../providers";
import { useEffect } from "react";

function CreateReview({ route, navigation: { goBack } }) {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const { id } = route.params;
  const [text, setText] = useState("");
  const [approved, setApproved] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await axios.get(`${ENDPOINT}/approved/${id}`);
        setApproved(data.data.some(clinic => clinic.user_id === user.uid));
      }
      catch (err) {
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
        approved: approved
      })
      setText("")
      goBack()
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <View style={styles.container}>
      <Input
        placeholder="レビュー"
        leftIcon={{ type: 'font-awesome', name: 'comment' }}
        value={text}
        onChangeText={setText}
      />
      <Button
        color="warning"
        style={styles.addButton}
        buttonStyle={{ backgroundColor: 'rgb(212, 91, 18)' }}
        onPress={addReview}
      >レビューを追加</Button>
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