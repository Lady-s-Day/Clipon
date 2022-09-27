import { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native"
import DropDownPicker from 'react-native-dropdown-picker';
import { Button, Card, Icon } from "@rneui/themed";
import axios from "axios";
import { ENDPOINT } from '../endpoint'

function Search({ navigation }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [wardId, setWardId] = useState(null);
  const [clinics, setClinics] = useState([])
  const [items, setItems] = useState([
    { label: '足立区', value: '足立区', id: 1 },
    { label: '荒川区', value: '荒川区', id: 2 },
    { label: '板橋区', value: '板橋区', id: 3 },
    { label: '江戸川区', value: '江戸川区', id: 4 },
    { label: '大田区', value: '大田区', id: 5 },
    { label: '葛飾区', value: '葛飾区', id: 6 },
    { label: '北区', value: '北区', id: 7 },
    { label: '江東区', value: '江東区', id: 8 },
    { label: '品川区', value: '品川区', id: 9 },
    { label: '渋谷区', value: '渋谷区', id: 10 },
    { label: '新宿区', value: '新宿区', id: 11 },
    { label: '杉並区', value: '杉並区', id: 12 },
    { label: '墨田区', value: '墨田区', id: 13 },
    { label: '世田谷区', value: '世田谷区', id: 14 },
    { label: '台東区', value: '台東区', id: 15 },
    { label: '千代田区', value: '千代田区', id: 16 },
    { label: '中央区', value: '中央区', id: 17 },
    { label: '豊島区', value: '豊島区', id: 18 },
    { label: '中野区', value: '中野区', id: 19 },
    { label: '練馬区', value: '練馬区', id: 20 },
    { label: '文京区', value: '文京区', id: 21 },
    { label: '港区', value: '港区', id: 22 },
    { label: '目黒区', value: '目黒区', id: 23 },
  ]);

  const searchClinics = () => {
    if (wardId) {
      (async () => {
        try {
          const { data: response } = await axios.get(`${ENDPOINT}/wards/${wardId}`);
          setClinics(response)
        } catch (err) {
          console.error(err);
        }
      })();
    }
  }

  return (
    <>
    <View style={styles.container}>
      <DropDownPicker
        style={styles.dropDown}
        placeholder="区を選択してください"
        placeholderStyle={{ color: "grey" }}
          onSelectItem={(item) => setWardId(item.id)}
        items={items}
        setItems={setItems}
        open={open}
        setOpen={setOpen}
        value={value}
        setValue={setValue}
      />
      <Button
        radius={5}
        color="warning"
        style={styles.searchButton}
        buttonStyle={{ backgroundColor: 'rgb(212, 91, 18)' }}
          onPress={searchClinics}
        >
        検索
      </Button>
        <ScrollView style={styles.scrollArea}>
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
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 10
  },
  dropDown: {
    marginBottom: 10
  },
  searchButton: {
    margin: 5,
  },
  scrollArea: {
    marginBottom: 50
  }
});

export default Search;
