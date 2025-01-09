import { useState, useEffect } from 'react';
import { Dimensions, Platform, PixelRatio, ScaledSize } from 'react-native';

// Base screen sizes
const BASE_MOBILE_WIDTH = 375; // iPhone 11 width
const BASE_MOBILE_HEIGHT = 812; // iPhone 11 height
const BASE_WEB_WIDTH = 1440; // Typical desktop width (MacBook Pro 15)
const BASE_WEB_HEIGHT = 900; // Typical desktop height

interface ScreenSize {
  width: number;
  height: number;
}

interface ResponsiveDimensions {
  screenSize: ScreenSize;
  isWeb: boolean;
  isPortrait: boolean,
  getResponsiveWidth: (size: number, minSize?: number) => number;
  getResponsiveHeight: (size: number, minSize?: number) => number;
  getResponsiveFontSize: (fontSize: number, minSize?: number) => number;
  getResponsiveDimension: (spacing: number, minSize?: number) => number;
  getResponsivePercentage: (percentage: number, dimension: 'width' | 'height') => number;
}

const useResponsiveDimensions = (): ResponsiveDimensions => {
  const [screenSize, setScreenSize] = useState<ScreenSize>(() => Dimensions.get('window')); // Initialize with current dimensions
  const isWeb = Platform.OS === 'web';

  useEffect(() => {
    // Handler to update screen size on dimension change
    const handleDimensionChange = ({ window }: { window: ScaledSize }) => {
      setScreenSize(window);
    };

    if (isWeb) {
      // For web, listen to the window resize event
      const updateScreenSize = () => {
        setScreenSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };
      window.addEventListener('resize', updateScreenSize);

      // Cleanup listener on unmount
      return () => window.removeEventListener('resize', updateScreenSize);
    } else {
      // For mobile, listen to Dimension changes
      const subscription = Dimensions.addEventListener('change', handleDimensionChange);

      // Cleanup listener on unmount
      return () => subscription?.remove();
    }
  }, [isWeb]);

  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = screenSize;

  // Choose base dimensions based on the platform
  const BASE_WIDTH = isWeb ? BASE_WEB_WIDTH : BASE_MOBILE_WIDTH;
  const BASE_HEIGHT = isWeb ? BASE_WEB_HEIGHT : BASE_MOBILE_HEIGHT;

  // Calculate scale factors
  const widthScale = SCREEN_WIDTH / BASE_WIDTH;
  const heightScale = SCREEN_HEIGHT / BASE_HEIGHT;
  const scaleFactor = Math.min(widthScale, heightScale); // Use the smaller factor for scaling

  /**
   * Utility Functions for Scaling
   */

  // Scale width
  const getResponsiveWidth = (size: number, minSize?: number): number => Math.max(size * widthScale, minSize ?? 0);

  // Scale height
  const getResponsiveHeight = (size: number, minSize?: number): number => Math.max(size * heightScale, minSize ?? 0);

  // Scale font size
  const getResponsiveFontSize = (fontSize: number, minSize?: number): number =>
    Math.max(Math.round(fontSize * scaleFactor * PixelRatio.getFontScale()), minSize ?? 0);

  // Scale spacing (margin, padding, etc.)
  const getResponsiveDimension = (spacing: number, minSize?: number): number =>
    Math.max(Math.round(spacing * scaleFactor), minSize ?? 0);

  /**
   * Optional: Return dimensions in percentages (for web responsiveness)
   */
  const getResponsivePercentage = (percentage: number, dimension: 'width' | 'height') => {
    const dimensionValue = dimension === 'width' ? SCREEN_WIDTH : SCREEN_HEIGHT;
    return (percentage / 100) * dimensionValue;
  };

  const isPortrait = SCREEN_HEIGHT > SCREEN_WIDTH; // Check if the device is in portrait mode

  return {
    screenSize, // Current dimensions
    isWeb,
    isPortrait,
    getResponsiveWidth,
    getResponsiveHeight,
    getResponsiveFontSize,
    getResponsiveDimension,
    getResponsivePercentage,
  };
};

export default useResponsiveDimensions;
