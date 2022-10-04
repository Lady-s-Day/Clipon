import { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Linking,
} from "react-native";
import { Card, Icon, Badge, Button } from "@rneui/themed";
import axios from "axios";
import { ENDPOINT } from "../endpoint";
import Hyperlink from "react-native-hyperlink";
import { Colors } from "../config";
import { format, parseISO } from "date-fns";
import { toggleFavorite } from "../utils/toggleFavorite";
import { SavedContext } from "../providers/SavedContext";
import { AuthenticatedUserContext } from "../providers";
import { Chip } from "react-native-paper";
import FavoriteButton from "./FavoriteButton";

function Clinic({ route, navigation }) {
  const [treatments, setTreatments] = useState({});
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

  useEffect(() => {
    const sendingParams = { ids: [] };
    sendingParams.ids.push(id);
    (async () => {
      try {
        const { data: response } = await axios.get(`${ENDPOINT}/types/ids`, {
          params: sendingParams,
        });
        setTreatments(response);
      } catch (err) {
        console.error("Error getting treatement types (ClinicCard.js)", err);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const { data: response } = await axios.get(
          `${ENDPOINT}/saved/${user.uid}`
        );
        const obj = {};
        for (const clinic of response) {
          obj[clinic.id] = true;
        }
        setFavorite(obj);
        console.log(obj);
      } catch (err) {
        console.error("Error getting saved", err);
      }
    })();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.light }}>
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
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              paddingTop: 15,
              paddingLeft: 15,
              paddingRight: 10,
            }}
          >
            <View style={{ flex: 3 }}>
              <Text
                style={{
                  fontFamily: "font2bold",
                  fontSize: 22,
                  color: Colors.navy,
                }}
              >
                {selectedClinic.clinic_name}
              </Text>
            </View>
            <FavoriteButton clinic_id={id} favorite={favorite} setFavorite={setFavorite} user={user} />
            {/* <View style={{ flex: 1, paddingLeft: 15, paddingRight: 10 }}>
              {favorite[id] ? (
                <Icon
                  size={30}
                  name="favorite"
                  color={Colors.red}
                  onPress={() =>
                    toggleFavorite(id, favorite, setFavorite, user)
                  }
                />
              ) : (
                <Icon
                  size={30}
                  name="favorite-outline"
                  color={Colors.red}
                  onPress={() =>
                    toggleFavorite(id, favorite, setFavorite, user)
                  }
                />
              )}
            </View> */}
          </View>
          <View style={{ flex: 16, padding: 10 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                flexWrap: "wrap",
              }}
            >
              {treatments[id]?.map((type, i) => {
                return (
                  <View
                    key={i}
                    style={{
                      alignSelf: "flex-start",
                      marginRight: 5,
                      marginBottom: 5,
                    }}
                  >
                    <Chip
                      onPress={() => console.log("Pressed")}
                      style={{
                        backgroundColor: Colors.white,
                        size: "small",
                        borderColor: Colors.red,
                        borderWidth: 1,
                      }}
                      textStyle={{
                        fontSize: 10,
                        includeFontPadding: false,
                        textAlign: "center",
                        textAlignVertical: "center",
                        fontFamily: "font2",
                      }}
                      compact
                    >
                      {type}
                    </Chip>
                  </View>
                );
              })}
            </View>
            <View style={{ padding: 5 }}>
              <Text style={{ color: Colors.navy, fontFamily: "font2" }}>
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
                <Text style={{ fontSize: 15 }}>{selectedClinic.url}</Text>
              </Hyperlink>
            </View>
            <Button
              radius={5}
              style={{ marginTop: 15, marginBottom: 10 }}
              color={Colors.red}
              onPress={() =>
                navigation.navigate("CreateReview", {
                  id: id,
                })
              }
            >
              <Text
                style={{
                  fontSize: 18,
                  color: Colors.white,
                  fontFamily: "font2bold",
                  padding: 1,
                }}
              >
                レビューを投稿する
              </Text>
            </Button>
            <ScrollView style={{ backgroundColor: Colors.light }}>
              {reviews?.map((review, index) => {
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
                      <Text style={{ fontFamily: "font2" }}>
                        {review.user_name}
                        {review.approved && (
                          <Badge status="error" value={"Approved"} />
                        )}
                      </Text>
                    </View>
                    <Text style={{ fontFamily: "font2" }}>
                      {format(parseISO(review.date), formatDate)}
                    </Text>
                  </Card>
                );
              })}
            </ScrollView>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colors.white,
  },
  text: {
    fontSize: 14,
    marginBottom: 10,
    color: Colors.navy,
    fontFamily: "font2bold",
  },
});

export default Clinic;
