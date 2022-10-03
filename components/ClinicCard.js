import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from "react-native";
import { Card, Icon, Button } from "@rneui/themed";
import axios from "axios";
import { ENDPOINT } from "../endpoint";
import { Colors } from "../config";
import Hyperlink from "react-native-hyperlink";
import { Chip } from "react-native-paper";

import { AuthenticatedUserContext } from "../providers";
import { toggleFavorite } from "../utils/toggleFavorite";
import { SavedContext } from "../providers/SavedContext";

const ClinicCard = ({ clinics, navigation }) => {
  const [treatments, setTreatments] = useState({});
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const { favorite, setFavorite } = useContext(SavedContext);

  // console.log(clinics);

  useEffect(() => {
    if (clinics.length > 0) {
      const sendingParams = { ids: [] };
      for (const clinic of clinics) {
        sendingParams.ids.push(clinic.id);
      }
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
    }
  }, [clinics]);

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
      } catch (err) {
        console.error("Error getting saved", err);
      }
    })();
  }, []);

  return (
    <>
      {clinics?.map((clinic, index) => {
        return (
          <TouchableOpacity
            key={index}
            onPress={() =>
              navigation.navigate("Clinic", {
                id: clinic.id,
              })
            }
          >
            <Card>
              <Image
                style={{ width: "100%", height: 100, marginBottom: 10 }}
                resizeMode="cover"
                source={{ uri: clinic.image }}
              />
              <View style={{ flex: 1, flexDirection: "row" }}>
                <View style={{ flex: 3 }}>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 16,
                      color: Colors.navy,
                    }}
                  >
                    {clinic.clinic_name}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      flexWrap: "wrap",
                    }}
                  >
                    {treatments[clinic.id]?.map((type, i) => {
                      return (
                        <View
                          key={i}
                          style={{
                            alignSelf: "flex-start",
                            marginRight: 5,
                            marginBottom: 5
                          }}
                        >
                          <Chip
                            onPress={() => console.log("Pressed")}
                            style={{
                              backgroundColor: Colors.light,
                              size: "small",
                            }}
                            textStyle={{
                              fontSize: 10,
                              includeFontPadding: false,
                              textAlign: "center",
                              textAlignVertical: "center",
                            }}
                            compact
                          >
                            {type}
                          </Chip>
                        </View>
                      );
                    })}
                  </View>
                </View>
                <View style={{ flex: 1 }}>
                  <Icon
                    name="favorite-outline"
                    color={Colors.red}
                    onPress={() =>
                      toggleFavorite(clinic.id, favorite, setFavorite, user)
                    }
                  />
                </View>
              </View>
            </Card>
          </TouchableOpacity>
        );
      })}
    </>
  );
};

export default ClinicCard;
