import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyD07otl_YS34wk3c61RkX1FfvUax9PQXgc",
  authDomain: "meme-maker-beb34.firebaseapp.com",
  databaseURL: "https://meme-maker-beb34.firebaseio.com",
  projectId: "meme-maker-beb34",
  storageBucket: "meme-maker-beb34.appspot.com",
  messagingSenderId: "763440172978"
};

 firebase.initializeApp(config);

 export const storage = firebase.storage();
