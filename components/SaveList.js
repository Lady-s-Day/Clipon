import { useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { Card, Icon, Button } from "@rneui/themed";

function SaveList({ navigation }) {
  const [clinics, setClinics] = useState([{ name: "aaa" }, { name: "bbb" }, { name: "ccc" }])

  return (
    <View>
      <ScrollView>
        {clinics && clinics.map((clinic, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate('Clinic')}>
              <Card>
                <Card.Title>{clinic.name}</Card.Title>
                <View style={{ position: "relative", alignItems: "center" }}>
                  <Image
                    style={{ width: "100%", height: 100 }}
                    resizeMode="contain"
                    source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ8Tf1Fa2Zlf-oyBCoxt7eVGdeC-kepuNIlA&usqp=CAU" }}
                  />
                  <Text>Clinic info</Text>
                  <Icon
                    raised
                    name="favorite"
                    color='#f50'
                    onPress={() => console.log('favorite!')} />
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