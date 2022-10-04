import React, { useState, useEffect, useContext } from "react";
import { Camera } from "expo-camera";
import {
  Button,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import Environment from "../config/environments";
import { AuthenticatedUserContext } from "../providers";
import axios from "axios";
import { ENDPOINT } from "../endpoint";

const CameraComponent = ({ route, navigation }) => {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [camera, setCamera] = useState(null);
  const [picture, setPicture] = useState();
  const [string, setString] = useState();
  const [approve, setApprove] = useState(null);
  const { user, setUser } = useContext(AuthenticatedUserContext);

  useEffect(() => {
    console.log("approve: ", approve);
    if (approve !== null) {
      navigation.navigate("Approval", {
        approval: approve,
      });
    }
  }, [approve]);

  useEffect(() => {
    if (string) {
      checkReceipt();
    }
  }, [string]);

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const takePicture = async () => {
    if (camera) {
      const image = await camera.takePictureAsync({
        base64: true,
      });
      console.log("写真撮ったよ");
      // console.log("image.uri::::::", image.uri);
      setPicture(image.uri);
      sendCloudVision(image.base64);
    }
  };

  const sendCloudVision = async (image) => {
    const body = JSON.stringify({
      requests: [
        {
          features: [{ type: "TEXT_DETECTION", maxResults: 1 }],
          image: {
            content: image,
          },
        },
      ],
    });
    const response = await fetch(
      "https://vision.googleapis.com/v1/images:annotate?key=" +
        Environment["GOOGLE_CLOUD_VISION_API_KEY"],
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: body,
      }
    );
    const resJson = await response.json();

    setString(resJson.responses[0].textAnnotations[0].description);
  };

  function checkReceipt() {
    const { clinicName: hospName } = route.params;

    const keyWords = [
      "婦人科",
      "発行日",
      "初診",
      "再診",
      "患者",
      "区分",
      "保険",
      "領収書",
      "診療明細書",
      "投薬",
      "受診科",
      "負担額",
    ];
    let count = 0;
    for (const keyWord of keyWords) {
      if (string.includes(keyWord)) {
        console.log(keyWord);
        count++;
      }
    }

    if (string.includes(hospName) && count >= keyWords.length * 0.2) {
      (async () => {
        try {
          await axios.post(`${ENDPOINT}/approved`, {
            clinic_name: hospName,
            uid: user.uid,
            photo_uri: picture,
          });
        } catch (err) {
          console.error("Error posing into approved clinics", err);
        }
      })();
      setApprove(true);
    } else {
      setApprove(false);
    }
    // navigation.navigate("Approval", {
    //   approval: approve,
    // });
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {!picture ? (
          <Camera
            style={{ flex: 1 }}
            ref={(ref) => {
              // console.log("ref:::::", ref);
              // console.log("picture:::::", picture);
              setCamera(ref);
            }}
          />
        ) : (
          <Image source={{ uri: picture }} style={{ flex: 1 }} />
        )}
      </View>

      <View
        style={{
          // width: 300,
          height: 60,
          justifyContent: "space-evenly",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          onPress={() => takePicture()}
          style={{
            width: 40,
            height: 40,
            borderRadius: 50,
            borderWidth: 5,
            borderColor: "black",
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default CameraComponent;

// const styles = StyleSheet.create({});
