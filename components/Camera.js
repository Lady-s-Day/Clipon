import React, { useState, useEffect } from "react";
import { Camera } from "expo-camera";
import {
  Button,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";

const CameraComponent = () => {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [camera, setCamera] = useState(null);
  const [picture, setPicture] = useState();

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

  // const takePicture = async () => {
  //   if (this.cameraRef) {
  //     // 撮影
  //     let photo = await this.cameraRef.current.takePictureAsync({
  //       base64: true,
  //     });
  //   }
  // };

  const takePicture = async () => {
    if (camera) {
      const image = await camera.takePictureAsync();
      console.log("写真撮ったよ");
      // console.log("image.uri::::::", image.uri);
      setPicture(image.uri);
    }
  };

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
