import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  SafeAreaView,
  ScrollView,
  FlatList,
} from "react-native";
import Header from "./Header";
import Input from "./Input";
import { useState } from "react";
import GoalItem from "./GoalItem";

export default function Home({navigation}) {
  function onDelete(deletedKey) {
    setGoals(goals.filter((goal) => goal.key != deletedKey));
  }
  function itemPressed(goal) {
    console.log("item pressed.");
    navigation.navigate("GoalDetails",{goalObject:goal});

  }
  const [goals, setGoals] = useState([]);
  const onTextAdd = function (newText) {
    const newGoal = { text: newText, key: Math.random() };
    setGoals((goals) => {
      return [...goals, newGoal];
    });
    console.log(goals);
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
        <FlatList
          data={goals}
          renderItem={({ item }) => {
            //object destructure or you can use obj and obj.item.key and obj.item.text
            return <GoalItem goal={item} onDelete={onDelete} onitemPress={itemPressed}/>;
          }}
          contentContainerStyle={styles.scrollViewItems}
        ></FlatList>
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
  topContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomContainer: {
    flex: 4,
    backgroundColor: "pink",
  },
  scrollViewItems: {
    alignItems: "center",
  },
});
