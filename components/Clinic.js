import { useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { Card, Icon } from "@rneui/themed";

function Clinic() {
  const [reviews, setReviews] = useState([
    { name: "aaa", department: "bbb", inside: "ccc", details: "ddd" },
    { name: "aaa", department: "bbb", inside: "ccc", details: "ddd" },
    { name: "aaa", department: "bbb", inside: "ccc", details: "ddd" }
  ])


  return (
    <View>
      <View style={{ position: "relative", alignItems: "center", marginTop: 10 }}>
        <Image
          style={{ width: "100%", height: 100 }}
          resizeMode="contain"
          source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ8Tf1Fa2Zlf-oyBCoxt7eVGdeC-kepuNIlA&usqp=CAU" }}
        />
        <Text>Clinic Title</Text>
        <Icon
          raised
          name="favorite"
          color='#f50'
          onPress={() => console.log('favorite!')} />
      </View>
      <ScrollView>
        {/* review area */}
        {reviews.length && reviews.map((review, index) => {
          return (
            <Card key={index}>
              <Text>名前：</Text>
              <Text>診療科目：</Text>
              <Text>院内の様子：</Text>
              <Text>診察：</Text>
            </Card>
          )
        })}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default Clinic;