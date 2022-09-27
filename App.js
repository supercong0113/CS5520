import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, Button, SafeAreaView } from "react-native";
import Header from "./components/Header";
import Input from "./components/Input";
import { useState } from "react";

export default function App() {
  const onTextAdd = function (newText) {
    console.log(newText);
    setModalVisible(false);
  };
  const onCancel = function () {
    setModalVisible(false);
  };
  const name = "My App";
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
      <Header appName={name} />
      <Button title="Add a Goal" onPress={() => setModalVisible(true)} />
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>You typed...</Text>
        </View>
      </View>
      <Input onAdd={onTextAdd} modal={modalVisible} onCancel={onCancel} />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    justifyContent: "center",
  },
  topContainer:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomContainer:{
    flex: 4,
    backgroundColor: "pink",
    alignItems: "center",
  },
  textContainer: {
    backgroundColor: "#aaa",
    borderRadius: 5,
    color:'blue'
  },
});
