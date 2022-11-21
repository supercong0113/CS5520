import { View, Text, FlatList, Button, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { async } from "@firebase/util";
import { storage } from "../firebase/firebase-setup";
import { getDownloadURL, ref } from "firebase/storage";

export default function GoalDetails({ route, navigation }) {
  const [users, setUsers] = useState([]);
  const [imageURL, setImageURL] = useState("");
  const goal = route.params.goalObject;
  useEffect(() => {
    const DownloadURL = async () => {
      try {
        if (goal.uri) {
          const reference = ref(storage, goal.uri);
          const downloadImageURL = await getDownloadURL(reference);
          setImageURL(downloadImageURL);
        }
      } catch (err) {
        console.log(err);
      }
    };
    DownloadURL();
  });
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!response.ok) {
          throw new Error("The fetch request failed");
        }
        const data = await response.json();
        console.log(data);
        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);
  const addUser = async function () {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ name: "Sicong" }),
        }
      );
      if (!response.ok) {
        throw new Error("post fetch failed");
      }
      const data = await response.json();
      console.log(data);
      setUsers((preveUsers) => [...preveUsers, data]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View>
      <Text>
        You are viewing details of {route.params.goalObject.text} goal
      </Text>
      <Image source={{ uri: imageURL }} style={{ height: 100, width: 100 }} />
      <Button title="Add User" onPress={addUser}></Button>
      <FlatList
        data={users}
        renderItem={({ item }) => {
          return <Text>{item.name}</Text>;
        }}
      />
    </View>
  );
}
