import { TextInput, View, Text, Button} from 'react-native';
import {useState} from 'react';
export default function Input(props){
  const [text, setText] = useState("")
  return (
      <View>
      <TextInput
          onChangeText = {(newText) => {setText(newText)}}
          value = {text}
          placeholder = "Please type your input here."/>
          <Button title="Press me" onPress={() => {props.onAdd(text); setText("");}}/>
          </View>
  );
}
