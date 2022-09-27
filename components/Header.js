import { StyleSheet, Text, View } from "react-native";

export default function Header(props) {
  return (
    <View>
      <Text> Welcome to {props.appName}</Text>
    </View>
  );
}


