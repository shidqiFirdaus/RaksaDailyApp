import {Dimensions, StyleSheet} from 
'react-native';
import { color } from 'react-native-reanimated';

//autoresize gambar
const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width * 9 / 16);
const imageWidth = dimensions.width;

const logoWidth   = Math.round(dimensions.width * 9 / 16);
const logoHeight  = dimensions.height * 9 / 16;

export default StyleSheet.create({
  header_logo: {
    width: logoWidth,
    height: logoHeight
  },

  header_background: {
    backgroundColor: 'white',
  },
  
})