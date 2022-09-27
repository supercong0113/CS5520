import {
  TextInput,
  View,
  Text,
  Button,
  Modal,
  StyleSheet,
  Image,
} from "react-native";
import { useState } from "react";

export default function Input({ onAdd, modal, onCancel }) {
  const [text, setText] = useState("");
  return (
    <Modal visible={modal}>
      <View style={styles.container}>
        <Image
        source = {require('../assets/2617812.png')}
          // source={{
          //   uri: "https://cdn-icons-png.flaticon.com/512/2617/2617812.png",
          // }}
          style={styles.image}
        />
        <TextInput
        style = {styles.input}
          onChangeText={(newText) => {
            setText(newText);
          }}
          value={text}
          placeholder="Please type your input here."
        />
        <View style={styles.buttonContaner}>
        <View style={styles.button}>
        <Button title="Cancel" onPress={onCancel} />
        </View>
        <View style={styles.button}>
        <Button
          title="Confirm"
          onPress={() => {
            onAdd(text);
            setText("");
          }}
          disabled={text.length ? false: true}
        />
        </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#coc",
    alignItems: "center",
    justifyContent: "center",
  },
  input:{
    color: '#ff00ff',
    borderBottomWidth: 2,
    borderBottomColor: 'purple',
    margin:5,
  },
  button:{
    margin:5,
    width:'30%',
  },
  image:{
    width:100,
    height:100,
  },
  buttonContaner:{
    flexDirection:"row",
  }
});
