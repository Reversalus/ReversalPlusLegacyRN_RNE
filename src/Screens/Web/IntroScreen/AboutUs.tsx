import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { Button } from '@rneui/themed';
import LottieView from 'lottie-react-native';
import { COLORS, ImgUrl, LottieUrl } from '../../../Constants';

const AboutUs = () => {
  return (
    <View style={styles.container}>
      {/* Logo Section */}
      <View style={styles.logoContainer}>
        <Image
          source={{ uri: ImgUrl.REVERSAL_LOGO }}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>The Specialist Reversal</Text>
      </View>

      {/* Content Section */}
      <View style={styles.contentContainer}>
        <View style={styles.textSection}>
          <Text style={styles.subtitle}>WHAT WE DO</Text>
          <Text style={styles.heading}>Smart Reversal Plan</Text>
          <Text style={styles.description}>
            Quisque eget nisl id nulla sagittis auctor quis id. Aliquam quis vehicula enim, non aliquam risus. Sed a tellus quis mi rhoncus dignissim.
          </Text>
          <Text style={styles.description}>
            Integer rutrum ligula eu dignissim laoreet. Pellentesque venenatis nibh sed tellus faucibus bibendum. Sed fermentum est vitae rhoncus molestie.
          </Text>
          <Button
            title="Get Your Reversal Plan!"
            buttonStyle={styles.button}
            titleStyle={styles.buttonTitle}
          />
        </View>

        {/* Lottie Animation Section */}
        <View style={styles.lottieSection}>
          <LottieView
            source={{ uri: LottieUrl.CREATIVE_TEAM }}
            autoPlay
            loop
            style={styles.lottie}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    margin: '3%',
    borderRadius: 25,
    elevation: 10,
    padding: '4%'
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    margin: '2%'
  },
  textSection: {
    flex: 1,
    width: '40%',
    height: '100%',
    backgroundColor: `${COLORS.PRIMARY_LIGHT_EXTRA}40`,
    padding: 20,
    borderRadius: 20,
    elevation: 8,
    shadowColor: COLORS.PRIMARY_DARK_EXTRA,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    justifyContent: 'space-between',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_DARK_EXTRA,
    marginBottom: 5,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.PRIMARY,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 24,
    marginBottom: 10,
  },
  button: {
    backgroundColor: COLORS.PRIMARY_DARK_EXTRA,
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  lottieSection: {
    flex: 1,
    width: '40%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: `${COLORS.PRIMARY_LIGHT_EXTRA}40`,
    elevation: 8,
    shadowColor: COLORS.PRIMARY_DARK_EXTRA,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    borderRadius: 25,
    marginLeft: 10,
  },
  lottie: {
    width: '90%',
    height: undefined,
    aspectRatio: 1,
  },
});

export { AboutUs };
