import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import { useState } from 'react'
import React from 'react'
import {auth} from "../firebase/firebase-setup";
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Login({navigation}) {
    [email, setEmail] = useState("");
    [pwd, setPwd] = useState("");
    async function login(){
        console.log("login");
        try{
            await signInWithEmailAndPassword(auth, email, pwd);
        }catch(err){
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
        </View>
        <View style={styles.passowrdContainer}>
        <Text style={styles.text}>password</Text>
        <TextInput
        style={styles.textInput}
         onChangeText = {(newPwd) =>{
            setPwd(newPwd);
         }}
         value={pwd}
         />
         </View>
         <View style={styles.bottomContainer}>
        <Button title='Login' onPress={login}></Button>
        <Button title='New User? Create an account' onPress={()=> navigation.replace("SignUp")}></Button>
        </View>
    </View>
  )
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

