import { useEffect, useState } from "react";
import { Link } from '@react-navigation/native';
import { View, Text, Image, ScrollView } from "react-native";
import { Card, Icon, Button } from "@rneui/themed";

function Home() {
  const [clinics, setClinics] = useState([{ name: "aaa" }, { name: "bbb" }, { name: "ccc" }])

  useEffect(() => {
    //fetch clinics
  }, [])

  return (
    <View>
      <Button title="search clinics" onPress={() => navigate('Search')} />
      <View>
        <ScrollView>
          {clinics && clinics.map((clinic, index) => {
            return (
              <Card key={index}>
                <Card.Title>{clinic.name}</Card.Title>
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
              </Card>
            )
          })}
        </ScrollView>
      </View>
    </View>
  )
}

export default Home;