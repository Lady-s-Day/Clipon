import axios from "axios";
import Checkbox from "expo-checkbox";
import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../config";
import { CheckedContext } from "../providers/CheckedProvider";
import { ENDPOINT } from "../endpoint";

const CheckBox = () => {
  const { isChecked, setChecked } = useContext(CheckedContext);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data: response } = await axios.get(`${ENDPOINT}/types`);
        const typesArr = ["女医"];
        for (const type of response) {
          typesArr.push(type.type);
        }
        setTypes(typesArr);
      } catch (err) {
        console.error("Error getting treatment types", err);
      }
    })();
  }, []);

  useEffect(() => {
    if (types) {
      const checkedObj = {};
      for (const type of types) {
        checkedObj[type] = false;
      }
      setChecked(checkedObj);
    }
  }, [types]);

  const handleCheck = (type) => {
    const copyChecked = {
      ...isChecked,
    };
    copyChecked[type] = !copyChecked[type];
    setChecked(copyChecked);
  };

  return (
    <>
      {types.map((type, i) => {
        return (
          <View style={styles.section} key={i}>
            <Checkbox
              style={styles.checkbox}
              value={isChecked[type]}
              onValueChange={() => handleCheck(type)}
              color={isChecked ? Colors.red : undefined}
            />
            <Text style={styles.paragraph}>{type}</Text>
          </View>
        );
      })}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 32,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    margin: 8,
  },
});

export default CheckBox;
