import { View, Text, StyleSheet, Button, Pressable } from "react-native";
import React from "react";

export default function GoalItem({goal, onDelete, onitemPress}) {
    
  return (
    <Pressable onPress={onitemPress}>
    <View style={styles.textContainer}>
      <Text>{goal.text}</Text>
      <Button title="X" onPress={()=>{onDelete(goal.key)}} color='black'/>
    </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
    textContainer: {
        backgroundColor: "#aaa",
        borderRadius: 5,
        color: "blue",
        padding: 30,
        margin: 30,
        flexDirection:'row',
        alignItems:'center',
    },
      text: {
        fontSize: 12,
      },
})