/**
 * @format
 */

 import {AppRegistry} from 'react-native';
 import App from './App';
 import {name as appName} from './app.json';
 
 global.context = 'http://192.168.0.100:8001';
 
 AppRegistry.registerComponent(appName, () => App);
 