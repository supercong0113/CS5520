import { StyleSheet, Text, View } from 'react-native';

export default function Header(props){

  return (
      <View>
        <Text> {props.appName}</Text>
      </View>
  );
}
