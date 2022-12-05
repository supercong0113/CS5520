import { View, Text, Button, FlatList } from "react-native";
import React, { useEffect } from "react";
import Home from "./components/Home";
import GoalDetails from "./components/GoalDetails";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase/firebase-setup";
import Profile from "./components/Profile";
import Map from "./components/Map";
const Stack = createNativeStackNavigator();
function rightButton() {
  return <Button title="urgent" onPress={rightButtonPressed} />;
}

function rightButtonPressed() {
  console.log("urgent!!!");
}

// const AppStack = (
//   <>
//     <Stack.Screen
//       name="Home"
//       component={Home}
//       options = {({navigation}) => {
//         return{
//           title:'All My Goals',
//           headerRight: () => {return <Button title="Profile" onPress={navigation.navigate("Profile")}></Button>}
//         }
//       }}
//       />
//     <Stack.Screen
//       name="GoalDetails"
//       component={GoalDetails}
//       options={({ route, navigation }) => {
//         return {
//           title: route.params.goalObject.text,
//           headerRight: rightButton,
//         };
//       }}
//     />
//     <Stack.Screen name="Profile" component={Profile} />
//   </>
// );

export default function App() {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUserAuthenticated(true);
      } else {
        setIsUserAuthenticated(false);
      }
    });
  });
  
  const AuthStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#995099" },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen name="Login" component={Login} />

        <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Navigator>
    );
  };

  const AppStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#995099" },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={({ navigation }) => {
            return {
              title: "All Goals",
              headerRight: () => {
                return (
                  <Button
                    title="Profile"
                    onPress={() => navigation.navigate("Profile")}
                  />
                );
              },
            };
          }}
        />
        <Stack.Screen
          name="GoalDetails"
          component={GoalDetails}
          options={({ route, navigation }) => {
            return {
              title: route.params.goalObject.text,
              headerRight: rightButton,
            };
          }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={({ navigation }) => {
            return {
              headerRight: () => {
                return <Button title="Logout" onPress={() => signOut(auth)} />;
              },
            };
          }}
        />
        <Stack.Screen
        name="Map"
        component={Map}/>
      </Stack.Navigator>
    );
  };
  

  
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       setIsUserAuthenticated(true);
  //     } else {
  //       setIsUserAuthenticated(false);
  //     }
  //   });
  // }, []);
  return (
    <NavigationContainer>
      {isUserAuthenticated ? AppStack() : AuthStack()}
    </NavigationContainer>
  );
}
