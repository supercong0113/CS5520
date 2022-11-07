import { StyleSheet, Text, View, Dimensions, Platform, useWindowDimensions } from "react-native";
const windowWidth = Dimensions.get('window').width;
const sindowHeight = Dimensions.get('window').height;

export default function Header(props) {
  const { width, height } = useWindowDimensions();
  const paddingVerticalDyn = height < 415 ? 0 : 10; //landscape: 0 padding
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}> Welcome to {props.appName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent:'center',
    width:350,
    maxWidth:'90%',
  },
  headerText:{
    color:'rebeccapurple',
    fontWeight:'bold',
    borderStyle:'dotted',
    borderColor:'slateblue',
    textAlign:'center',
    //borderWidth:2,
    // borderWidth: Platform.OS === 'android' ? 4: 0,
    borderWidth: Platform.select({ios:0, android:4}),
    fontSize: windowWidth < 380 ? 20: 26,
    paddingHorizontal: windowWidth < 380 ? 10: 20,
    paddingVertical:10,
    borderRadius:5,
  }
});
