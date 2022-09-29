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
import { Card, Icon } from "@rneui/themed";
import axios from "axios";
import { ENDPOINT } from "../endpoint";
import { Colors } from "../config";
import Hyperlink from "react-native-hyperlink";

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
              <Card containerStyle={{ borderRadius: 8 }}>
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
                      <Hyperlink
                        linkStyle={{ color: Colors.navy, fontWeight: "bold" }}
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
                        <Text style={{ color: Colors.navy }}>{clinic.url}</Text>
                      </Hyperlink>
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
