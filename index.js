/**
 * @format
 */

import {AppRegistry} from 'react-native';
//import Navegacao from './src/navegacao';
import App from './src/navigation/App';
//import App from './src/App';
import {name as appName} from './app.json';

//AppRegistry.registerComponent(appName, () => Navegacao);
AppRegistry.registerComponent(appName, () => App);
