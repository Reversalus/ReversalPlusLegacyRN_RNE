import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { Button } from '@rneui/themed';
import LottieView from 'lottie-react-native';
import { COLORS, ImgUrl, LottieUrl } from '../../../Constants';
import useResponsiveDimensions from '../../../Hooks/useResponsiveDimensions';

const AboutUs = () => {
  const { 
    getResponsiveDimension, 
    getResponsiveFontSize, 
    getResponsiveHeight, 
    getResponsiveWidth, 
    isPortrait 
  } = useResponsiveDimensions();

  // Memoized styles for better performance
  const styles = useMemo(
    () =>
      generateStyles({
        getResponsiveFontSize,
        getResponsiveDimension,
        getResponsiveHeight,
        getResponsiveWidth,
        isPortrait,
      }),
    [getResponsiveFontSize, getResponsiveDimension, getResponsiveHeight, getResponsiveWidth, isPortrait]
  );

  return (
    <View style={styles.container} accessible={true} accessibilityLabel="About Us section">
      {/* Logo Section */}
      <View style={styles.logoContainer}>
        <Image
          source={{ uri: ImgUrl.REVERSAL_LOGO }}
          style={styles.logo}
          resizeMode="contain"
          accessible={true}
          accessibilityLabel="Reversal Logo"
        />
        <Text style={styles.title} accessible={true} accessibilityLabel="The Specialist Reversal">
          The Specialist Reversal
        </Text>
      </View>

      {/* Content Section */}
      <View style={styles.contentContainer}>
        {isPortrait ? (
          <>
            <View style={styles.lottieSection}>
              <LottieView
                source={{ uri: LottieUrl.CREATIVE_TEAM }}
                autoPlay
                loop
                style={styles.lottie}
                onError={() => console.log('Animation failed to load.')}
                accessible={true}
                accessibilityLabel="Creative team animation"
              />
            </View>
            <View style={styles.textSection}>
              <Text style={styles.subtitle} accessible={true} accessibilityLabel="What we do">
                WHAT WE DO
              </Text>
              <Text style={styles.heading} accessible={true} accessibilityLabel="Smart Reversal Plan">
                Smart Reversal Plan
              </Text>
              <Text style={styles.description}>
                Quisque eget nisl id nulla sagittis auctor quis id. Aliquam quis vehicula enim, non aliquam risus. Sed a
                tellus quis mi rhoncus dignissim.
              </Text>
              <Text style={styles.description}>
                Integer rutrum ligula eu dignissim laoreet. Pellentesque venenatis nibh sed tellus faucibus bibendum.
                Sed fermentum est vitae rhoncus molestie.
              </Text>
              <Button
                title="Get Your Reversal Plan!"
                buttonStyle={styles.button}
                titleStyle={styles.buttonTitle}
                accessible={true}
                accessibilityLabel="Button to get your reversal plan"
              />
            </View>
          </>
        ) : (
          <>
            <View style={styles.textSection}>
              <Text style={styles.subtitle} accessible={true} accessibilityLabel="What we do">
                WHAT WE DO
              </Text>
              <Text style={styles.heading} accessible={true} accessibilityLabel="Smart Reversal Plan">
                Smart Reversal Plan
              </Text>
              <Text style={styles.description}>
                Quisque eget nisl id nulla sagittis auctor quis id. Aliquam quis vehicula enim, non aliquam risus. Sed a
                tellus quis mi rhoncus dignissim.
              </Text>
              <Text style={styles.description}>
                Integer rutrum ligula eu dignissim laoreet. Pellentesque venenatis nibh sed tellus faucibus bibendum.
                Sed fermentum est vitae rhoncus molestie.
              </Text>
              <Button
                title="Get Your Reversal Plan!"
                buttonStyle={styles.button}
                titleStyle={styles.buttonTitle}
                accessible={true}
                accessibilityLabel="Button to get your reversal plan"
              />
            </View>
            <View style={styles.lottieSection}>
              <LottieView
                source={{ uri: LottieUrl.CREATIVE_TEAM }}
                autoPlay
                loop
                style={styles.lottie}
                onError={() => console.log('Animation failed to load.')}
                accessible={true}
                accessibilityLabel="Creative team animation"
              />
            </View>
          </>
        )}
      </View>
    </View>
  );
};

const generateStyles = ({ 
  getResponsiveFontSize, 
  getResponsiveDimension, 
  getResponsiveHeight, 
  getResponsiveWidth, 
  isPortrait 
}: any) => StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    borderRadius: getResponsiveDimension(25),
    elevation: 10,
    width: '96%',
    height: getResponsiveHeight(620),
    padding: getResponsiveDimension(40, 20),
    alignSelf: 'center'
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: getResponsiveDimension(20),
  },
  logo: {
    width: getResponsiveDimension(100, 50),
    height: getResponsiveDimension(100, 50),
  },
  title: {
    fontSize: getResponsiveFontSize(24, 18),
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
  },
  contentContainer: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexWrap: 'wrap',
    margin: getResponsiveDimension(2),
    flexDirection: isPortrait ? 'column' : 'row',
  },
  textSection: {
    width: getResponsiveWidth(600, 250),
    height: isPortrait ? getResponsiveHeight(250) : getResponsiveHeight(500),
    backgroundColor: `${COLORS.PRIMARY_BLUE}20`,
    padding: getResponsiveDimension(20, 10),
    borderRadius: getResponsiveDimension(20),
    elevation: 8,
    shadowColor: COLORS.PRIMARY_DARK_EXTRA,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    justifyContent: 'space-between',
    marginTop: isPortrait && getResponsiveDimension(20,10)
  },
  subtitle: {
    fontSize: getResponsiveFontSize(14, 10),
    fontWeight: 'bold',
    color: COLORS.PRIMARY_DARK_EXTRA,
    marginBottom: getResponsiveDimension(5),
  },
  heading: {
    fontSize: getResponsiveFontSize(22, 18),
    fontWeight: 'bold',
    color: COLORS.PRIMARY,
    marginBottom: getResponsiveDimension(10),
  },
  description: {
    fontSize: getResponsiveFontSize(16, 10),
    color: '#666666',
    lineHeight: getResponsiveDimension(24, 14),
    marginBottom: getResponsiveDimension(10),
  },
  button: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: getResponsiveDimension(25),
    paddingHorizontal: getResponsiveDimension(20),
    paddingVertical: getResponsiveDimension(10),
    width: getResponsiveWidth(200, 100),
  },
  buttonTitle: {
    fontSize: getResponsiveFontSize(16, 12),
    fontWeight: 'bold',
  },
  lottieSection: {
    width: getResponsiveWidth(600, 250),
    height: isPortrait ? getResponsiveHeight(250) : getResponsiveHeight(500),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: `${COLORS.PRIMARY_BLUE}20`,
    elevation: 8,
    shadowColor: COLORS.PRIMARY_DARK_EXTRA,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    borderRadius: getResponsiveDimension(25),
    marginLeft: getResponsiveDimension(10),
  },
  lottie: {
    width: '90%',
    height: '100%',
    aspectRatio: 1,
  },
});

export { AboutUs };
