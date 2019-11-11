/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import firebase from 'react-native-firebase';

var firebaseConfig = {
  apiKey: 'AIzaSyAxoDt6LmKAHdaA_M9OZ7gxijymg73A12w',
  authDomain: 'pawtastic-2cf4b.firebaseapp.com',
  databaseURL: 'https://pawtastic-2cf4b.firebaseio.com',
  projectId: 'pawtastic-2cf4b',
  storageBucket: 'pawtastic-2cf4b.appspot.com',
  messagingSenderId: '693490490546',
  appId: '1:693490490546:web:6eabbfe0afc928f2317dab',
  measurementId: 'G-Q8Y4ZX96H2',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

AppRegistry.registerComponent(appName, () => App);
