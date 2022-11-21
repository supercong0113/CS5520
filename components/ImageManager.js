import { View, Button, Image, Text } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";

export default function ImageManager({imageHandler}) {
  const [permissionInfo, requestPermission] =
    ImagePicker.useCameraPermissions();
  const [imageUri, SetImageUri] = useState("");
  const verifyPermission = async () => {
    if (permissionInfo.granted) {
      return true;
    }
    const requestPermissionResponse = await requestPermission();
    return requestPermissionResponse.granted;
  };
  const takeImageHandler = async () => {
    try {
      const hasPermission = await verifyPermission();
      if (!hasPermission) {
        return;
      }
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
      });

      // if (!result.cancelled){
      //   SetImageUri(result.assets[0].uri);
      // }
      SetImageUri(result.uri);
      imageHandler(result.uri);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View>
      <Button title="Take an Image" onPress={takeImageHandler}></Button>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={{height:100, width:100}}/>
      ) : (
        <Text>no Image yet</Text>
      )}
    </View>
  );
}
