import { Dimensions, Platform } from 'react-native';

// Get screen dimensions based on platform
const { width, height } = Platform.OS === 'web' ? { width: window.innerWidth, height: window.innerHeight } : Dimensions.get('window');

// Base screen width (e.g., iPhone 6 with width 375px) - you can customize this
const baseWidth = 375; // You can change this based on the base device you want
const baseHeight = 667; // You can also set a base height for better scaling
const scaleWidth = width / baseWidth; // Calculate scale factor for width
const scaleHeight = height / baseHeight; // Calculate scale factor for height

// Final scale factor is based on width scaling, but you can adjust based on height too
const scale = Math.min(scaleWidth, scaleHeight);

// This method will scale the value based on screen size.
const ScaleSize = (size: number) => {
    return size * scale; // Scale value dynamically based on the screen size
};

export default ScaleSize;
