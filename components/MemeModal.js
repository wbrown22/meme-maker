import { takeSnapshotAsync } from 'expo';
import React from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  CameraRoll,
  Alert
} from 'react-native';
import { Button } from 'react-native-elements';
import uuid from 'react-native-uuid';
import firebase from 'firebase';
import { storage } from '../config/fireConfig';

let {height, width} = Dimensions.get('window');

export class MemeModal extends React.Component {

   constructor(props) {
     super(props);
     this.state = {
       topText: "",
       bottomText: ""
     };
   }

   render() {
     return (
       <Modal visible={ this.props.display } animationType="slide" style={ styles.modalStyle }>

           {/* Container View */}
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>

            {/* Close button View */}
            <View style={ styles.buttonStyle }>
              <Button title="Close X" buttonStyle={{marginRight: 5, backgroundColor: 'white'}} titleStyle={{color: 'black'}} onPress={() => {this.props.close(); this.setState({topText: "", bottomText: ""})}}/>
            </View>

            {/* Text input View */}
            <View style={ styles.topTextStyle }>
              <TextInput
                style={ styles.input }
                returnKeyType="done"
                placeholder="top text"
                onChangeText={(text) => this.setState({ topText: text })}
              />

              <TextInput
                style={ styles.input }
                returnKeyType="done"
                placeholder="bottom text"
                onChangeText={(text) => this.setState({ bottomText: text })}
              />
            </View>

            {/* Meme image View */}
            <View style={ styles.containerStyle } ref={(r) => this.memeView = r}>
              <Image style={{ height: width * .95, width: width * .95 }} source={{ uri: this.props.image }} />

              <Text style={[ styles.imageText, { top: 5 } ]}>
                { this.state.topText }
              </Text>

              <Text style={[styles.imageText, { bottom: 5 }]}>
                { this.state.bottomText }
              </Text>
            </View>

            {/* Save and Upload button View */}
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Button
                onPress={ this._onSaySave }
                buttonStyle={{ backgroundColor: "#1E90FF" }}
                title="Save Meme"
              />

              <Button
                onPress={this._onSayUpload}
                buttonStyle ={{ backgroundColor: "#1E90FF", marginLeft: 10 }}
                title="Upload Meme"
              />
            </View>

          {/* End container View */}
          </View>

      </Modal>
    );
  }

//saves meme to cameraRoll
  _onSaySave = async () => {
    const uri = await takeSnapshotAsync(this.memeView);
    await CameraRoll.saveToCameraRoll(uri)
      .then(() => {
        Alert.alert("Image has been saved");
      });
  }

//begins upload of created meme and stores reference to location for later use
  _onSayUpload = async() => {
    const memeUpload = await takeSnapshotAsync(this.memeView);
      this.uploadImageAsync(memeUpload)
        .then((snapshot) => {
            var ref = firebase.database().ref().child('Memes');
            var ref = ref.push({
              uri: snapshot,
              votes: 0
            })
            .catch((error) => {console.log(error)});
          Alert.alert("Upload Successful!");
        })
        .catch((error) => {
          Alert.alert(error);
        });
  }

//formats and actually uploads created meme to database
  uploadImageAsync = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        //console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
    const ref = storage
      .ref()
      .child("Memes/" + uuid.v4());
      const snapshot = await ref.put(blob);

      blob.close();

      return await snapshot.ref.getDownloadURL();
    }
}

const styles = {
  modalStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle: {
    width: width,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingTop: 30,
  },
  containerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    height: width * .955,
    width: width * .955,
    borderWidth: 1
  },
  textStyle: {
    textAlign: 'center'
  },
  topTextStyle: {
    margin: 5,
    padding: 10,
    width: width
  },
  input: {
    alignItems: 'stretch',
    marginLeft: width * .05,
    marginRight: width * .05,
    borderColor: '#000000',
    borderWidth: .8,
    borderRadius: 5,
    backgroundColor: "#fff",
    marginTop: 8,
    paddingLeft: 5,
    height: 30
  },
  imageText: {
    position: 'absolute',
    left: 5, right: 5, padding: 5,
    fontSize: 20,
    fontWeight: '900',
    textAlign: 'center',
    textShadowColor: '#000000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
    color: 'white',
    backgroundColor: 'transparent',
  },
  button: {
    margin: 5,
    padding: 5,
    width: 45,
    textAlign: 'center',
    backgroundColor: 'grey',
  },
};
