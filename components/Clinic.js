import { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { Card, Icon, Badge, Button } from "@rneui/themed";
import axios from "axios";
import { ENDPOINT } from "../endpoint";
import { format, parseISO } from 'date-fns';

function Clinic({ route, navigation }) {
  const [selectedClinic, setSelectedClinic] = useState()
  const [reviews, setReviews] = useState([])
  const { id } = route.params;
  const formatDate = 'yyyy-MM-dd HH:mm';

  useEffect(() => {
    (async () => {
      try {
        const { data: clinic } = await axios.get(`${ENDPOINT}/clinics/${id}`);
        setSelectedClinic(clinic[0]);
        const data = await axios.get(`${ENDPOINT}/reviews/${id}`);
        setReviews(data.data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [reviews]);

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
              onPress={() => navigation.navigate('CreateReview', {
                id: id
              })} />
          </View>
          </View>
        </>
      }
      <ScrollView>
        {reviews && reviews.map((review, index) => {
          return (
            <Card key={index}>
              <Text style={styles.text}>{review.text}</Text>
              <View style={{ marginTop: 5 }}>
                <Text>{review.user_name}
                  {review.approved && <Badge
                    status="error"
                    value={"Approved"}
                  />}</Text>
              </View>
              <Text>{format(parseISO(review.date), formatDate)}</Text>
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
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10
  }
});

export default Clinic;