// Exporting assets
import {Platform} from 'react-native';

const Logo = {
    logo: Platform.OS === 'web' ? '/assets/reversal_logo' : require('./reversal_logo.png'),
};
export default Logo;
