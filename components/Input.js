import { TextInput, View, Text, Button, Modal, StyleSheet} from 'react-native';
import {useState} from 'react';

export default function Input({onAdd, modal, onCancel}){
  const [text, setText] = useState("")
  return (
    <Modal visible={modal}>
      <View style={styles.container}>
        <TextInput
          onChangeText = {(newText) => {setText(newText)}}
          value = {text}
          placeholder = "Please type your input here."/>
        <Button title="Press me" onPress={() => {onAdd(text); setText("");}}/>
        <Button title="Cancel" onPress={onCancel}/>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});