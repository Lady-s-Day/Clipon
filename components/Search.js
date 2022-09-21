import { useState } from "react";
import { View, Text, StyleSheet } from "react-native"
import DropDownPicker from 'react-native-dropdown-picker';
import { Button } from "@rneui/themed";

function Search({ navigation }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: '足立区', value: '足立区' },
    { label: '荒川区', value: '荒川区' },
    { label: '板橋区', value: '板橋区' },
    { label: '江戸川区', value: '江戸川区' },
    { label: '大田区', value: '大田区' },
    { label: '北区', value: '北区' },
    { label: '江東区', value: '江東区' },
    { label: '品川区', value: '品川区' },
    { label: '渋谷区', value: '渋谷区' },
    { label: '新宿区', value: '新宿区' },
    { label: '杉並区', value: '杉並区' },
    { label: '墨田区', value: '墨田区' },
    { label: '世田谷区', value: '世田谷区' },
    { label: '台東区', value: '台東区' },
    { label: '千代田区', value: '千代田区' },
    { label: '中央区', value: '中央区' },
    { label: '豊島区', value: '豊島区' },
    { label: '中野区', value: '中野区' },
    { label: '練馬区', value: '練馬区' },
    { label: '文京区', value: '文京区' },
    { label: '港区', value: '港区' },
    { label: '目黒区', value: '目黒区' },
  ]);

  return (
    <View style={styles.container}>
      <DropDownPicker
        style={styles.dropDown}
        placeholder="区を選択してください"
        placeholderStyle={{ color: "grey" }}
        onChangeValue={(value) => { console.log(value) }}
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
        onPress={() => navigation.goBack()}>
        検索
      </Button>
    </View>
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
  }
});

export default Search;