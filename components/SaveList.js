import { useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { Card, Icon, Button } from "@rneui/themed";

function SaveList({ navigation }) {
  const [clinics, setClinics] = useState([{
    "id": 10,
    "clinic_name": "池ノ上産婦人科",
    "stars": 0,
    "url": "http://www.sanfujin.com/",
    "image": "https://i.ibb.co/s63zDyS/ikenoue.jpg",
    "tokyo_ward_id": 14
  },
  {
    "id": 11,
    "clinic_name": "三軒茶屋ウィメンズクリニック",
    "stars": 0,
    "url": "http://www.sangenjaya-wcl.com/index.html",
    "image": "https://i.ibb.co/VgRMfJ8/sancha-womens.jpg",
    "tokyo_ward_id": 14
  }])

  return (
    <View>
      <ScrollView>
        {clinics && clinics.map((clinic, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate('Clinic', {
                id: clinic.id
              })}>
              <Card>
                  <Image
                  style={{ width: "100%", height: 100, marginBottom: 10 }}
                  resizeMode="cover"
                  source={{ uri: clinic.image }}
                  />
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <View style={{ flex: 3 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 16 }}>{clinic.clinic_name}</Text>
                    <View>
                      <Text>{clinic.url}</Text>
                    </View>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Icon name="favorite-outline" color="#f50" onPress={() => console.log('favorite!')} />
                  </View>
                </View>
              </Card>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    </View>
  )
}

export default SaveList;