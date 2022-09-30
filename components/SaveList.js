import { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Card, Icon, Button } from "@rneui/themed";
import Hyperlink from "react-native-hyperlink";
import { Colors } from "../config";
import ClinicCard from "./ClinicCard";
import { AuthenticatedUserContext } from "../providers";
import { ENDPOINT } from "../endpoint";
import axios from "axios";

function SaveList({ navigation }) {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [clinics, setClinics] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await axios.get(`${ENDPOINT}/saved/${user.uid}`);
        setClinics(data.data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [clinics]);


  return (
    <View style={{ flex: 1, backgroundColor: Colors.light }}>
      <ScrollView>
        <ClinicCard clinics={clinics} navigation={navigation} />
      </ScrollView>
    </View>
  );
}

export default SaveList;
