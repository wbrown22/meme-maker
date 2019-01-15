import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { Selector } from '../components/Selector';

export default class LinksScreen extends React.Component {

  //styling the react-navigation 'create' screen
  static navigationOptions = {
    title: 'Create',
    headerStyle: {
      shadowColor: '#000000',
      shadowOffset: {height: 1},
      shadowOpacity: .2,
      shadowRadius: 1
    }
  };

  render() {
    return (
      <ScrollView style={ styles.container }>
        <Selector />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
