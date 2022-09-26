import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import Header from './components/Header';
import Input from './components/Input';
import {useState} from 'react';

export default function App() {

    const onTextAdd = function (newText) {console.log(newText); setModalVisible(false);}
    const onCancel = function () {setModalVisible(false)}
    const name = "My App"
    const [modalVisible, setModalVisible] = useState(false)
    

  return (
    <View style={styles.container}>
     <Header appName = {name}/>
     <Button title="Add a Goal" onPress={() => setModalVisible(true)}/>
     <Input onAdd = {onTextAdd} modal={modalVisible} onCancel = {onCancel}/>
      <StatusBar style="auto" />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


