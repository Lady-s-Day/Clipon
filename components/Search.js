import { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
  SafeAreaView,
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

  const searchClinics = ({ navigation }) => {
    if (wardId) {
      const searchCondition = {
        ...isChecked,
      };
      searchCondition.ward = wardId;
      (async () => {
        try {
          const { data: response } = await axios.get(
            `${ENDPOINT}/searched-clinics`,
            { params: searchCondition }
          );
          // console.log(response);
          setClinics(response);
          setSearch(true);
        } catch (err) {
          console.error(err);
        }
      })();
    }
  };

  const ListFooterComponent = (
    <>
      <View style={styles.searchCondition}>
        <DropDownPicker
          style={styles.dropDown}
          placeholder="区を選択してください"
          placeholderStyle={{ color: "grey", fontFamily: "font2" }}
          onSelectItem={(item) => setWardId(item.id)}
          items={items}
          setItems={setItems}
          open={open}
          setOpen={setOpen}
          value={value}
          setValue={setValue}
          labelStyle={{ fontFamily: "font2" }}
          dropDownStyle={{ fontFamily: "font2" }}
          itemStyle={{ fontFamily: "font2" }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            flexWrap: "wrap",
            marginBottom: 5,
          }}
        >
          <CheckedContext.Provider value={{ isChecked, setChecked }}>
            <CheckBox />
          </CheckedContext.Provider>
        </View>
        {/* </View>
        <View style={styles.container}> */}
        <Button
          radius={5}
          color="warning"
          style={styles.searchButton}
          buttonStyle={{ backgroundColor: Colors.red }}
          onPress={searchClinics}
          titleStyle={{ fontSize: 20, fontFamily: "font2bold" }}
        >
          検索
        </Button>
        {/* </View>
        <View style={styles.container}> */}
        <ClinicCard clinics={clinics} navigation={navigation} />
      </View>
    </>
  );

  return (
    <View style={{ flex: 1, backgroundColor: Colors.light }}>
      <ScrollView contentContainerStyle={styles.scrollArea}>
        <View style={styles.searchCondition}>
          <DropDownPicker
            style={styles.dropDown}
            placeholder="区を選択してください"
            placeholderStyle={{ color: "grey", fontFamily: "font2" }}
            onSelectItem={(item) => setWardId(item.id)}
            items={items}
            setItems={setItems}
            open={open}
            setOpen={setOpen}
            value={value}
            setValue={setValue}
            labelStyle={{ fontFamily: "font2" }}
            dropDownStyle={{ fontFamily: "font2" }}
            itemStyle={{ fontFamily: "font2" }}
            listMode="SCROLLVIEW"
            maxHeight={150}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              flexWrap: "wrap",
              marginBottom: 5,
            }}
          >
            <CheckedContext.Provider value={{ isChecked, setChecked }}>
              <CheckBox />
            </CheckedContext.Provider>
          </View>
          <Button
            radius={5}
            color="warning"
            style={styles.searchButton}
            buttonStyle={{ backgroundColor: Colors.red }}
            onPress={searchClinics}
            titleStyle={{ fontSize: 20, fontFamily: "font2bold" }}
          >
            検索
          </Button>
        </View>
        <ClinicCard clinics={clinics} navigation={navigation} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  searchCondition: {
    margin: 10,
    backgroundColor: Colors.light,
    zIndex: 100,
    height: 180,
  },
  container: {
    margin: 10,
    backgroundColor: Colors.light,
  },
  dropDown: {
    marginBottom: 10,
    color: Colors.navy,
    fontFamily: "font2",
  },
  searchButton: {
    margin: 5,
  },
  scrollArea: {
    backgroundColor: Colors.light,
    paddingBottom: 10,
  },
});

export default Search;
