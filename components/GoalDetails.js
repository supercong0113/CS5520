import { View, Text } from 'react-native'
import React from 'react'

export default function GoalDetails({route, navigation}) {
    // navigation.setOptions()
  return (
    <View>
      <Text>You are viewing details of {route.params.goalObject.text} goal</Text>
    </View>
  )
}