import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './App';

// Import the fonts
import Ionicons from 'react-native-vector-icons/Fonts/Ionicons.ttf';
import MaterialIcons from 'react-native-vector-icons/Fonts/MaterialIcons.ttf';
import FontAwesome from 'react-native-vector-icons/Fonts/FontAwesome.ttf';

// Define font styles for each font
const IoniconsStyles = `@font-face {
  src: url(${Ionicons});
  font-family: Ionicons;
}`;

const MaterialIconsStyles = `@font-face {
  src: url(${MaterialIcons});
  font-family: MaterialIcons;
}`;

const FontAwesomeStyles = `@font-face {
  src: url(${FontAwesome});
  font-family: FontAwesome;
}`;

// Function to append styles to the document head
const appendStyles = (styles) => {
  const style = document.createElement('style');
  style.type = 'text/css';

  if (style.styleSheet) {
    style.styleSheet.cssText = styles;
  } else {
    style.appendChild(document.createTextNode(styles));
  }

  document.head.appendChild(style);
};

// Append each font's styles to the document head
appendStyles(IoniconsStyles);
appendStyles(MaterialIconsStyles);
appendStyles(FontAwesomeStyles);

// Enable hot module replacement (HMR)
if (module.hot) {
  module.hot.accept();
}

// Register and run the application
AppRegistry.registerComponent(appName, () => App);
AppRegistry.runApplication(appName, {
  initialProps: {},
  rootTag: document.getElementById('app-root'),
});
