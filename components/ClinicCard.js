import React from 'react';
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

const ClinicCard = ({ clinics, navigation }) => {

  return (
    <>
    {clinics.map((clinic, index) => {
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
                <View>
                  <Chip
                    icon="information"
                    onPress={() => console.log("Pressed")}
                  >
                    Example Chip
                  </Chip>
                </View>
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
}

export default ClinicCard