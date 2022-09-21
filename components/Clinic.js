import { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { Card, Icon } from "@rneui/themed";
import axios from "axios";
import { ENDPOINT } from "../endpoint"

function Clinic({ route, navigation }) {
  const [selectedClinic, setSelectedClinic] = useState()
  const [reviews, setReviews] = useState([
    { name: "aaa", department: "bbb", inside: "ccc", details: "ddd" },
    { name: "aaa", department: "bbb", inside: "ccc", details: "ddd" },
    { name: "aaa", department: "bbb", inside: "ccc", details: "ddd" }
  ])
  const { id } = route.params;

  useEffect(() => {
    (async () => {
      try {
        const { data: clinic } = await axios.get(`${ENDPOINT}/clinics/${id}`);
        setSelectedClinic(clinic[0])
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <>
      {selectedClinic &&
        <>
        <Image
            style={{ width: "100%", height: 100, backgroundColor: "#fff" }}
            resizeMode="cover"
          source={{ uri: selectedClinic.image }} />
          <View style={styles.container}>
            <View style={{ flex: 3 }} >
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>{selectedClinic.clinic_name}</Text>
              <Text>{selectedClinic.url}</Text>
            </View>
            <View style={{ flex: 1 }} >
              <Icon name="favorite-outline" color='#f50'
                onPress={() => console.log('favorite!')} />
              <Icon
              name="add"
              color='black'
              onPress={() => navigation.navigate('CreateReview')} />
          </View>
          </View>
        </>
      }
      <ScrollView>
        {reviews.length && reviews.map((review, index) => {
          return (
            <Card key={index}>
              <Text>名前：</Text>
              <Text>診療科目：</Text>
              <Text>院内の様子：</Text>
              <Text>診察：</Text>
            </Card>
          )
        })}
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    padding: 20,
    backgroundColor: "#fff"
  },
});

export default Clinic;