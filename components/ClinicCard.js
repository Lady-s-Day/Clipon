import React, { useContext, useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Linking
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
  }, [clinics]);

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
                  {treatments[clinic.id]?.map((type, i) => {
                    return (
                      <View key={i} style={{ width: 70, height: 27 }}>
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
                <View style={{ flex: 1 }}>
                  {favorite[clinic.id] ?
                    <Icon
                      name="favorite"
                      color={Colors.red}
                      onPress={() =>
                        toggleFavorite(clinic.id, favorite, setFavorite, user)
                      }
                    /> :
                    <Icon
                      name="favorite-outline"
                      color={Colors.red}
                      onPress={() =>
                        toggleFavorite(clinic.id, favorite, setFavorite, user)
                      }
                    />}
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