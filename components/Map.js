import { View, Text, StyleSheet } from "react-native";
import React from "react";
import MapView from "react-native-maps";

export default function Map({route}) {
    const mapPressed = (event) =>{
        console.log(event.nativeEvent);
    }
  return (
    <MapView
    onPress={mapPressed}
      sytle={styles.map}
      initialRegion={{
        latitude: route.params.initialLoaction? route.params.initialLocation.lat: 37.78835,
        longitude: route.params.initialLoaction? route.params.initialLoaction.long: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    />
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
