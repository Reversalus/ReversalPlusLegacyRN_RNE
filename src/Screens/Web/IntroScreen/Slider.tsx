import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, ImageBackground, TouchableOpacity } from 'react-native';
import { Text, Button } from '@rneui/themed';
import Icon from 'react-native-vector-icons/FontAwesome';
import LottieView from 'lottie-react-native';
import { COLORS, ImgUrl, LottieUrl } from '../../../Constants';

const { width } = Dimensions.get('window');

const sentences = [
  "Welcome to Reversal+",
  "Fuck off",
  "We care about your health",
];

const icons = ['ambulance', 'clock-o', 'hospital-o'];
const titles = ['Experts Connect', 'Reversal Plans', 'Smart Monitoring'];
const subtitles = [
  'Dignissimos ducimus qui blanditiis sentium volta tum delentii atque corios.',
  'Daibties          Grade 1, Grade 2\nCardio           Stage 1, Stage 2\nThyroid          Stage 1, Stage 2',
  'Dignissimos ducimus qui blanditiis sentium volta tum delentii atque corios.',
];

const Slider = () => {
  const [displayText, setDisplayText] = useState("");
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isImageBackgroundEnabled, setIsImageBackgroundEnabled] = useState(true); // Default to image background

  const typeSpeed = 100;
  const deleteSpeed = 70;
  const holdTime = 800;

  useEffect(() => {
    const currentSentence = sentences[sentenceIndex];

    let timeout: any;
    
    if (!isDeleting) {
      if (charIndex < currentSentence.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentSentence.slice(0, charIndex + 1));
          setCharIndex((prev) => prev + 1);
        }, typeSpeed);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), holdTime);
      }
    } else {
      if (charIndex > 0) {
        timeout = setTimeout(() => {
          setDisplayText(currentSentence.slice(0, charIndex - 1));
          setCharIndex((prev) => prev - 1);
        }, deleteSpeed);
      } else {
        setIsDeleting(false);
        setSentenceIndex((prev) => (prev + 1) % sentences.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, sentenceIndex]);

  const renderBackground = () => {
    if (isImageBackgroundEnabled) {
      return (
        <ImageBackground
          source={{ uri: ImgUrl.BG_3 }}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          <View style={styles.overlay} />
          <Text style={styles.typingText}>{`${displayText}｜`}</Text>

          <Button
            title="Get Started"
            buttonStyle={styles.button}
            titleStyle={styles.buttonTitle}
            onPress={() => alert("Learn More clicked!")}
            icon={<Icon name="arrow-right" size={20} color="white" style={styles.buttonIcon} />}
            iconPosition="right"
          />
        </ImageBackground>
      );
    } else {
      return (
        <LottieView
          source={{ uri: LottieUrl.HEALTH_CARE }}
          autoPlay
          loop
          style={styles.lottieAnimation}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {renderBackground()}
      </View>

      <View style={styles.infoContainer}>
        {icons.map((iconName, index) => (
          <View key={index} style={[styles.card[index], styles.cardColors[index]]}>
            <Icon name={iconName} size={40} color="white" />
            <Text h4 style={styles.cardTitle}>
              {titles[index]}
            </Text>
            <Text style={styles.cardText}>
              {subtitles[index]}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  header: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative',
  },
  typingText: {
    fontSize: 40,
    color: COLORS.WHITE,
    textAlign: 'center',
    backgroundColor: `${COLORS.PINK_DARK}88`, // Semi-transparent background for text
    padding: 10,
    borderRadius: 10,
    position: 'absolute',
    top: '15%',
  },
  lottieAnimation: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  },
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: `${COLORS.WHITE}88`, // Pink semi-transparent overlay
  },
  button: {
    backgroundColor: COLORS.PINK_DARK,
    borderRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginTop: 250,
  },
  buttonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonIcon: {
    marginLeft: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: '55%',
    alignSelf: 'center',
  },
  card: [{
    width: 300,
    height: 300,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    elevation: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  {
    width: 300,
    height: 330,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    elevation: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  {
    width: 300,
    height: 300,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    elevation: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  }
  ],

  cardColors: [
    { backgroundColor: COLORS.PRIMARY },
    { backgroundColor: COLORS.PRIMARY_DARK_EXTRA },
    { backgroundColor: COLORS.PRIMARY },
  ],
  cardTitle: {
    color: 'white',
  },
  cardText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
  },
});

export { Slider };