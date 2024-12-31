// Exporting assets
import {Platform} from 'react-native';

const images = {
    logo: Platform.OS === 'web' ? '/assets/reversal_logo' : require('./reversal_logo.png'),
};
export default images;
