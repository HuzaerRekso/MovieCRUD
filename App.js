/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {MovieList} from './components/MovieList';
import Parse from 'parse/react-native.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Initializing the SDK.
Parse.setAsyncStorage(AsyncStorage);
//You need to copy BOTH the the Application ID and the Javascript Key from: Dashboard->App Settings->Security & Keys
Parse.initialize(
  '4K2rMq5M8QAayk2JGrBhxnBOIrmY7pFBtiM4704m',
  'rZoXafKxOQlB1urOcuDfGbX4mneMv89z5mgXLg9S',
);
Parse.serverURL = 'https://parseapi.back4app.com/';

const App = () => {
  return <MovieList />;
};

export default App;
