import { View, Text, Button } from "react-native";
import React, { useState } from "react";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";

export default function LocationManager() {
  const navigation = useNavigation();
  const [permissionResponse, requestPermission] =
    Location.useForegroundPermissions();
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const locationPickerHandler = () => {
    navigation.navigate("Map", {initalLocation:location});
  };

  const verifyPermission = async () => {
    if (permissionResponse.granted) {
      return true;
    }
    const requestPermissionResponse = await requestPermission();
    return requestPermissionResponse.granted;
  };
  const locateUserHandler = async () => {
    try {
      const hasPermission = await verifyPermission();
      if (!hasPermission) {
        return;
      }
      const currentPostion = await Location.getCurrentPositionAsync();
      setLocation({
        lat: currentPostion.coords.latitude,
        long: currentPostion.coords.longitude,
      });
      const address = await Location.reverseGeocodeAsync({
        latitude: currentPostion.coords.latitude,
        longitude: currentPostion.coords.longitude,
      });
      console.log(address);
      setAddress(address);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View>
      <Button title="Locate me!" onPress={locateUserHandler}></Button>
      <Button
        title="let me pick on the map"
        onPress={locationPickerHandler}
      ></Button>
      <Text>{location && location.lat}</Text>
      <Text>{location && location.long}</Text>
      <Text>{address && address[0].city}</Text>
    </View>
  );
}
