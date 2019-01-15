import React from 'react';
import {
  Text,
  View,
  Dimensions,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { ImagePicker, Permissions } from 'expo';
import { Button } from 'react-native-elements';
import { MemeModal } from './MemeModal';

Permissions.askAsync(Permissions.CAMERA_ROLL);
var {width, height} = Dimensions.get('window');

export class Selector extends React.Component {
  constructor() {
    super();
    this.state = {
      images: [],
      selectedImage: "",
      loading: true,
      displayModal: false
    };
  }

//get all meme templates from meme image API
  getData = () => {
    return fetch('https://api.imgflip.com/get_memes', {})
        .then(response => response.json())
        .then(response => response.data);
  }

//display meme creation modal
  displayModal = (image) => {
    this.setState({displayModal: true, selectedImage: image});
  }

//close meme creation modal
  closeModal = () => {
    this.setState({displayModal: false});
  }

//render image components for each meme template in object state
  getTemplates = () => {
    return this.state.images.map((image, index) => {
        return(
            <View
              key={ index }
              style = {[ styles.imageViewStyle, index % 3 == 0? { paddingLeft: 0 } : { paddingLeft: 3 } ]}
            >
              <TouchableOpacity onPress={ () => this.displayModal(image.url) } style={ styles.imageStyle }>
                <Image style={ styles.imageStyle }
                  source={{ uri: image.url }}
                />
              </TouchableOpacity>
            </View>
          );
      })
  }

//import meme template from cameraRoll and display meme creation modal
  _importImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
    });

    if(!result.cancelled) {
      this.setState({ selectedImage: result.uri, displayModal: true });
    }
  }

//place all meme templates from meme image API into object state upon loading
  componentWillMount() {
    this.getData().then((data) => this.setState({ images: data.memes }));
  }

  render() {
      return (
        <View style={ styles.containerStyle } >

          <Button
            title="Import Image"
            onPress={ this._importImage }
            buttonStyle={ styles.buttonStyle }
          />

          <View style={ styles.listStyle } >
            {this.getTemplates()}
            <MemeModal
              display={ this.state.displayModal }
              close={ this.closeModal }
              image={ this.state.selectedImage }
            />
          </View>

        </View>
      );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    marginTop: 5,
    shadowColor: '#000000',
    shadowOpacity: .2,
    shadowOffset: { height: 2 },
    shadowRadius: 2
  },
  imageViewStyle: {
    width: (width)/3,
    height: (width)/3,
    marginBottom: 3
  },
  imageStyle: {
    flex: 1,
    width: undefined,
    height: undefined
  },
  listStyle: {
    marginTop: 15,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  buttonStyle: {
    backgroundColor: "#1E90FF",
    marginLeft: 20,
    marginRight: 20
  }
});
