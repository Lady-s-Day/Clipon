import { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { Card, Icon, Button } from "@rneui/themed";
import axios from "axios";
import { ENDPOINT } from '../endpoint'

function Home({ navigation }) {
  const [clinics, setClinics] = useState([])

  useEffect(() => {
    (async () => {
      try {
        const { data: response } = await axios.get(`${ENDPOINT}/clinics`);
        setClinics(response)
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <View>
      <Icon
        style={styles.findIcon}
        name="search"
        onPress={() => navigation.navigate('Search')} />
      <ScrollView style={styles.scrollArea}>
        {clinics.map((clinic, index) => {
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

const styles = StyleSheet.create({
  findIcon: {
    marginTop: 14,
  },
  scrollArea: {
    marginBottom: 50
  }
});


export default Home;