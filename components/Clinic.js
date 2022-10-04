import { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Linking,
} from "react-native";
import { Card, Icon, Badge } from "@rneui/themed";
import axios from "axios";
import { ENDPOINT } from "../endpoint";
import Hyperlink from "react-native-hyperlink";
import { Colors } from "../config";
import { format, parseISO } from "date-fns";
import { toggleFavorite } from "../utils/toggleFavorite";
import { SavedContext } from "../providers/SavedContext";
import { AuthenticatedUserContext } from "../providers";

function Clinic({ route, navigation }) {
  const { favorite, setFavorite } = useContext(SavedContext);
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [selectedClinic, setSelectedClinic] = useState();
  const [reviews, setReviews] = useState([]);
  const { id } = route.params;
  const formatDate = "yyyy-MM-dd HH:mm";

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
      {selectedClinic && (
        <>
          <Image
            style={{
              width: "100%",
              height: 100,
              backgroundColor: Colors.light,
            }}
            resizeMode="cover"
            source={{ uri: selectedClinic.image }}
          />
          <View style={styles.container}>
            <View style={{ flex: 3 }}>
              <Text
                style={{
                  fontSize: 18,
                  color: Colors.navy,
                  marginBottom: 10,
                  fontFamily: "font2bold"
                }}
              >
                {selectedClinic.clinic_name}
              </Text>
              <View>
                <Text style={{ color: Colors.navy, fontFamily: "font2bold" }}>
                  HP:
                </Text>
                <Hyperlink
                  linkStyle={{ color: Colors.blue, fontFamily: "font2" }}
                  onPress={(url, text) => {
                    Linking.canOpenURL(url).then((supported) => {
                      if (!supported) {
                        console.log("無効なURLです: " + url);
                      } else {
                        return Linking.openURL(url);
                      }
                    });
                  }}
                >
                  <Text style={{ fontSize: 15, fontFamily: "font2" }}>{selectedClinic.url}</Text>
                </Hyperlink>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <Icon
                name="favorite-outline"
                color={Colors.red}
                onPress={() => {
                  toggleFavorite(id, favorite, setFavorite, user);
                  console.log("favorite!");
                }}
              />
              <Icon
                name="add"
                color={Colors.navy}
                onPress={() =>
                  navigation.navigate("CreateReview", {
                    id: id,
                  })
                }
              />
            </View>
          </View>
        </>
      )}
      <ScrollView style={{ backgroundColor: Colors.light }}>
        {reviews &&
          reviews.map((review, index) => {
            return (
              <Card
                key={index}
                containerStyle={{
                  borderColor: Colors.brown,
                  borderWidth: 0.5,
                  borderRadius: 8,
                }}
              >
                <Text style={styles.text}>{review.text}</Text>
                <View style={{ marginTop: 5 }}>
                  <Text style={{fontFamily: "font2"}}>
                    {review.user_name}
                    {review.approved && (
                      <Badge status="error" value={"Approved"} />
                    )}
                  </Text>
                </View>
                <Text style={{fontFamily: "font2"}}>{format(parseISO(review.date), formatDate)}</Text>
              </Card>
            );
          })}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    padding: 20,
    backgroundColor: Colors.light,
  },
  text: {
    fontSize: 14,
    marginBottom: 10,
    color: Colors.navy,
    fontFamily: "font2bold"
  },
});

export default Clinic;
