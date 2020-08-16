import React from 'react';
import { View,StyleSheet } from 'react-native';
import CardGame from './Components/CardGame'
import { ScrollView } from 'react-native-gesture-handler';


export default function App() {
  return (
    <View>
      <ScrollView>
      <CardGame></CardGame>
      </ScrollView>
    </View>
  );
}
