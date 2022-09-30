import React, { useEffect, useState } from "react";
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
// import { Chip } from "@rneui/themed";
// import { LinearGradient } from 'expo-linear-gradient';

const ClinicCard = ({ clinics, navigation }) => {
  const [treatments, setTreatments] = useState({});

  useEffect(() => {
    (async () => {
      try {
        // const { data: response } = await axios.get(`${ENDPOINT}/treatments`);
        setTreatments({ 1: ["生理痛", "月経異常"], 2: ["PMS"], 3: ["PMS"] });
      } catch (err) {
        console.error("Error getting treatement types (ClinicCard.js)", err);
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
                  {treatments[clinic.id]?.map((type, i) => {
                    return (
                      <View key={i} style={{ width: 100, height: 27 }}>
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
                  <Icon
                    name="favorite-outline"
                    color={Colors.red}
                    onPress={() => console.log("favorite!")}
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
