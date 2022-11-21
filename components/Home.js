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
import { useState, useEffect } from "react";
import GoalItem from "./GoalItem";
import { writeToDB, deleteFromDB } from "../firebase/firestore";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth, firestore, storage } from "../firebase/firebase-setup";
import { uploadBytes, ref } from "firebase/storage";

export default function Home({ navigation }) {
  const [goals, setGoals] = useState([]);
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(firestore, "Goals"),
        where("user", "==", auth.currentUser.uid)
      ),
      (querySnapshot) => {
        if (querySnapshot.empty) {
          setGoals([]);
          return;
        }

        setGoals(
          querySnapshot.docs.map((snapDoc) => {
            let data = snapDoc.data();
            data = { ...data, key: snapDoc.id };
            return data;
          })
        );
      }
    );
    return unsubscribe;
  }, []);

  async function onDelete(deletedKey) {
    // setGoals(goals.filter((goal) => goal.key != deletedKey));
    await deleteFromDB(deletedKey);
  }
  function itemPressed(goal) {
    console.log("item pressed.");
    navigation.navigate("GoalDetails", { goalObject: goal });
  }
  const getImage = async (uri) => {
    try {
      const response = await fetch(uri);
      if (!response.ok) {
        throw new Error("image fetch request failed");
      }
      const blob = await response.blob();
      return blob;
    } catch (err) {
      console.log(err);
    }
  };
  const onTextAdd = async function (newObj) {
    const uri = newObj.uri;
    try {
      if (uri) {
        const imageBlob = await getImage(uri);
        const imageName = uri.substring(uri.lastIndexOf("/") + 1);
        const imageRef = await ref(storage, `images/${imageName}`);
        const uploadResult = await uploadBytes(imageRef, imageBlob);
        newObj.uri = uploadResult.metadata.fullPath;
       
      }
      await writeToDB(newObj);
    } catch (err) {
      console.log(err);
    }
    console.log(newObj);
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
            return (
              <GoalItem
                goal={item}
                onDelete={onDelete}
                onitemPress={itemPressed}
              />
            );
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
