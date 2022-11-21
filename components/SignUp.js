import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import React from "react";
import {auth} from "../firebase/firebase-setup";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function SignUp({ navigation }) {
  [email, setEmail] = useState("");
  [pwd, setPwd] = useState("");
  [confirmPwd, setConfirmPwd] = useState("");

  async function register() {
    console.log("register");
    if (pwd.length < 6) {
      Alert.alert("The password needs to be minimum 6 characters");
    }
    if (pwd != confirmPwd) {
      Alert.alert("password doesn't match");
    }
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, pwd);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <View style={styles.container}>
        <View style={styles.passowrdContainer}>
      <Text style={styles.text}>Email Address</Text>
      <TextInput
      style={styles.textInput}
        onChangeText={(newEmail) => {
            setEmail(newEmail);
        }}
        value={email}
      />
      <Text style={styles.text}>password</Text>
      <TextInput
      style={styles.textInput}
        onChangeText={(newPwd) => {
          setPwd(newPwd);
        }}
        value={pwd}
      />
      <Text style={styles.text}>Confirm password</Text>
      <TextInput
      style={styles.textInput}
        onChangeText={(pwd) => {
            setConfirmPwd(pwd);
        }}
        value={confirmPwd}
      />
      </View>
      <View style={styles.bottomContainer}>
      <Button title="Register" onPress={register}></Button>
      <Button
        title="Already register? Login"
        onPress={() => navigation.replace("Login")}
      ></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      justifyContent: "center",
    },
    passowrdContainer: {
      flex: 1,
      justifyContent: "center",
      margin:20
    },
    bottomContainer: {
      flex: 6,
      flexDirection:'row',
      justifyContent:'space-evenly'
    },
    scrollViewItems: {
      alignItems: "center",
    },
    text:{
        fontWeight:'bold',
        fontSize:20,
    },
    textInput:{
        borderWidth:1,
        borderColor:'black'
    }
  });

