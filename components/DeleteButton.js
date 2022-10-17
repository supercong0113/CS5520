import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function DeleteButton({ onDelete }) {
  return (
    <Pressable onPress={onDelete}>
      <View style={styles.button}>
        <Ionicons name="trash" size={24} color="black" />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    fontSize: 22,
    justifyContent: "center",
  },
});
