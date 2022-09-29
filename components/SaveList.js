import { useState } from "react";
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

function SaveList({ navigation }) {
  const [clinics, setClinics] = useState([
    {
      id: 10,
      clinic_name: "池ノ上産婦人科",
      stars: 0,
      url: "http://www.sanfujin.com/",
      image: "https://i.ibb.co/s63zDyS/ikenoue.jpg",
      tokyo_ward_id: 14,
    },
    {
      id: 11,
      clinic_name: "三軒茶屋ウィメンズクリニック",
      stars: 0,
      url: "http://www.sangenjaya-wcl.com/index.html",
      image: "https://i.ibb.co/VgRMfJ8/sancha-womens.jpg",
      tokyo_ward_id: 14,
    },
  ]);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.light }}>
      <ScrollView>
        {clinics &&
          clinics.map((clinic, index) => {
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
                          <Text>{clinic.url}</Text>
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

export default SaveList;
