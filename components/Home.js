import { useEffect, useState } from "react";
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
import * as React from "react";
import { Chip } from "react-native-paper";
import ClinicCard from "./ClinicCard";

function Home({ navigation }) {
  const [clinics, setClinics] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data: response } = await axios.get(`${ENDPOINT}/clinics`);
        setClinics(response);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <View style={{ backgroundColor: Colors.light }}>
      <Icon
        style={styles.findIcon}
        name="search"
        onPress={() => navigation.navigate("Search")}
      />
      <ScrollView style={styles.scrollArea}>
        <ClinicCard clinics={clinics} navigation={navigation} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  findIcon: {
    marginTop: 14,
    color: Colors.navy,
  },
  scrollArea: {
    marginBottom: 50,
  },
});

export default Home;
