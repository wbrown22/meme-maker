import React from 'react'
import {
  Image,
  View,
  Text,
  ActivityIndicator,
  Dimensions,
  StyleSheet
} from 'react-native';
import firebase from 'firebase';
import { storage } from '../config/fireConfig';

const rootRef = firebase.database().ref();
const memeRef = rootRef.child('Memes');
const { width, height } = Dimensions.get('window');

export class SubmittedMemes extends React.Component {

  constructor() {
    super();
    this.state = {
      memes: [],
      loading: true
    };
  }

//store all memes from database to object state upon loading
  componentWillMount() {
    memeRef.on('value',(snapshot) => {
      const memes = [];
      snapshot.forEach((memeObject) => {
        memes.push({
          key: memeObject.key,
          memeImage: memeObject.toJSON().uri
        });
      });
      this.setState({ memes: memes, loading: false });
    });
  }

//render the images components for each meme contained in object state
  _renderMemes = () => {
    var final_memes = this.state.memes.map((image, index) => {
        return (
          <View key={ index } style ={ styles.imageViewStyle }>
            <Image style={ styles.imageStyle }
              source={{uri: image.memeImage}}
            />
          </View>
        );
      });
    return final_memes;
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={ styles.listStyle }>
          <ActivityIndicator size="large" />
        </View>
      );
    } else {
      return (
        <View style={ styles.listStyle }>
          {this._renderMemes()}
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  imageViewStyle: {
    width: width * .9,
    height: width * .9,
    marginBottom: 10,
    padding: 5,
    margin: 5,
    backgroundColor: 'grey',
  },
  imageStyle: {
    flex: 1,
    width: undefined,
    height: undefined
  },
  listStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
