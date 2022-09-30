import { useState } from "react";
import { View, ScrollView } from "react-native";
import ClinicCard from "./ClinicCard";

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
    <View>
      <ScrollView>
        <ClinicCard clinics={clinics} />
      </ScrollView>
    </View>
  );
}

export default SaveList;
