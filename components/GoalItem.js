import { View, Text, StyleSheet, Button, Pressable } from "react-native";
import React from "react";
import DeleteButton from "./DeleteButton";
export default function GoalItem({ goal, onDelete, onitemPress }) {
  function deletePressed (){
   onDelete(goal.key);
  }
  return (
    
      <View style={styles.textContainer}>
        <Pressable
      onPress={onitemPress}
      style={({pressed}) => {
        if (pressed) return styles.pressedItem;
      }}
    >
        <Text>{goal.text}</Text>
        {/* <Button
          title="X"
          onPress={() => {
            onDelete(goal.key);
          }}
          color="black"
        /> */}
        </Pressable>
        <DeleteButton onDelete={deletePressed}/>
      </View>
    
  );
}
const styles = StyleSheet.create({
  textContainer: {
    backgroundColor: "#aaa",
    borderRadius: 5,
    padding:5,
    color: "blue",
    margin: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 12,
  },
  pressedItem: {
    backgroundColor: "#222",
    opacity: 0.5,
  },
});
