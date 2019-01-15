import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator
} from 'react-native';
import { SubmittedMemes } from '../components/SubmittedMemes';
import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Memes',
    headerStyle: {
      shadowColor: '#000000',
      shadowOffset: {height: 1},
      shadowOpacity: .2,
      shadowRadius: 1
    }
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <SubmittedMemes />
      </ScrollView>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
};
