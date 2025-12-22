import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './package.json';

AppRegistry.registerComponent(appName, () => App);

// For web
if (typeof document !== 'undefined') {
  const {StyleSheet} = require('react-native');
  const rootTag = document.getElementById('root');
  AppRegistry.runApplication(appName, {
    rootTag,
    initialProps: {},
  });
}

