import { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Button, Card, Icon } from "@rneui/themed";
import axios from "axios";
import { ENDPOINT } from "../endpoint";
import CheckBox from "./CheckBox";
import { Colors } from "../config";
import { CheckedContext } from "../providers/CheckedProvider";
import ClinicCard from "./ClinicCard";

function Search({ navigation }) {
  const [isChecked, setChecked] = useState({});
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [wardId, setWardId] = useState(null);
  const [clinics, setClinics] = useState([]);
  const [items, setItems] = useState([
    { label: "足立区", value: "足立区", id: 1 },
    { label: "荒川区", value: "荒川区", id: 2 },
    { label: "板橋区", value: "板橋区", id: 3 },
    { label: "江戸川区", value: "江戸川区", id: 4 },
    { label: "大田区", value: "大田区", id: 5 },
    { label: "葛飾区", value: "葛飾区", id: 6 },
    { label: "北区", value: "北区", id: 7 },
    { label: "江東区", value: "江東区", id: 8 },
    { label: "品川区", value: "品川区", id: 9 },
    { label: "渋谷区", value: "渋谷区", id: 10 },
    { label: "新宿区", value: "新宿区", id: 11 },
    { label: "杉並区", value: "杉並区", id: 12 },
    { label: "墨田区", value: "墨田区", id: 13 },
    { label: "世田谷区", value: "世田谷区", id: 14 },
    { label: "台東区", value: "台東区", id: 15 },
    { label: "千代田区", value: "千代田区", id: 16 },
    { label: "中央区", value: "中央区", id: 17 },
    { label: "豊島区", value: "豊島区", id: 18 },
    { label: "中野区", value: "中野区", id: 19 },
    { label: "練馬区", value: "練馬区", id: 20 },
    { label: "文京区", value: "文京区", id: 21 },
    { label: "港区", value: "港区", id: 22 },
    { label: "目黒区", value: "目黒区", id: 23 },
  ]);

  const searchClinics = () => {
    if (wardId) {
      const searchCondition = {
        ...isChecked,
      };
      searchCondition.ward = wardId;
      console.log(searchCondition);
      (async () => {
        try {
          const { data: response } = await axios.get(
            `${ENDPOINT}/searched-clinics`,
            searchCondition
          );
          setClinics(response);
        } catch (err) {
          console.error(err);
        }
      })();
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.light }}>
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
        <CheckedContext.Provider value={{ isChecked, setChecked }}>
          <CheckBox />
        </CheckedContext.Provider>
      </View>
      <View style={styles.container}>
        <Button
          radius={5}
          color="warning"
          style={styles.searchButton}
          buttonStyle={{ backgroundColor: Colors.red }}
          onPress={searchClinics}
          titleStyle={{ fontSize: 20, fontWeight: "700" }}
        >
          検索
        </Button>
      </View>
      <View style={styles.container}>
        <ScrollView style={styles.scrollArea}>
          <ClinicCard clinics={clinics} />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: Colors.light,
    zIndex: 1000
  },
  dropDown: {
    marginBottom: 10,
    color: Colors.navy,
  },
  searchButton: {
    margin: 5,
  },
  scrollArea: {
    marginBottom: 50,
    backgroundColor: Colors.light,
  },
});

export default Search;
