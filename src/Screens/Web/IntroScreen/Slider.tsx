import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { Text, Button } from '@rneui/themed';
import Icon from 'react-native-vector-icons/FontAwesome';
import LottieView from 'lottie-react-native';
import { COLORS, ImgUrl, LottieUrl } from '../../../Constants';
import { GetStartedIntroModalWeb } from '../../Web';
import useResponsiveDimensions from "../../../Hooks/useResponsiveDimensions";

const sentences = [
  "Welcome to Reversal+",
  "We care about your health",
  "Plan Your LifeStyle With us"
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
  const [isModalVisible, setModalVisible] = useState(false);
  
  const { getResponsiveFontSize, getResponsiveDimension, getResponsiveHeight, isPortrait } = useResponsiveDimensions();

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const typeSpeed = 100;
  const deleteSpeed = 70;
  const holdTime = 800;

  const styles = generateStyles({
    getResponsiveFontSize,
    getResponsiveDimension,
    getResponsiveHeight,
    isPortrait
  });

  useEffect(() => {
    const currentSentence = sentences[sentenceIndex];

    let timeout;

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

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: ImgUrl.BG_3 }}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay} />

        <View style={styles.header}>
          <Text style={styles.typingText}>{`${displayText}｜`}</Text>
          <Button
            title="Get Started"
            buttonStyle={styles.button}
            titleStyle={styles.buttonTitle}
            onPress={openModal}
            icon={<Icon name="arrow-right" size={20} color="white" style={styles.buttonIcon} />}
            iconPosition="right"
          />
        </View>

        <View style={styles.infoContainer}>
          {icons.map((iconName, index) => (
            <View key={index} style={[styles.card, styles.cardColors[index], index === 1 ? styles.middleCard : null]}>
              <Icon name={iconName} size={getResponsiveDimension(40, 25)} color="white" />
              <Text style={styles.cardTitle}>
                {titles[index]}
              </Text>
              <Text style={styles.cardText}>
                {subtitles[index]}
              </Text>
            </View>
          ))}
        </View>
      </ImageBackground>
      <GetStartedIntroModalWeb isVisible={isModalVisible} onClose={closeModal} />
    </View>
  );
};

const generateStyles = ({ getResponsiveDimension, getResponsiveFontSize, getResponsiveHeight, isPortrait }: any) => StyleSheet.create({
  container: {
    width: '100%',
    height: getResponsiveHeight(800),
    backgroundColor: COLORS.WHITE,
    marginTop: isPortrait? 80:0,
  },
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: `${COLORS.WHITE}88`, // Semi-transparent overlay
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1, // Ensure header is above overlay
  },
  typingText: {
    fontSize: getResponsiveFontSize(40, 30),
    color: COLORS.WHITE,
    textAlign: 'center',
    backgroundColor: `${COLORS.PINK_DARK}88`, // Semi-transparent background for text
    padding: getResponsiveDimension(10, 5),
    borderRadius: 10,
    marginBottom: getResponsiveDimension(10, 5),
  },
  button: {
    backgroundColor: COLORS.PINK_DARK,
    borderRadius: 30,
    paddingVertical: getResponsiveDimension(15,10),
    paddingHorizontal: getResponsiveDimension(20,15),
    marginTop: getResponsiveDimension(55, 15), 
  },
  buttonTitle: {
    fontSize: getResponsiveFontSize(18, 16),
    fontWeight: 'bold',
  },
  buttonIcon: {
    marginLeft: getResponsiveDimension(10, 5),
  },
  infoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Allow wrapping to next line for smaller screens
    justifyContent: 'space-evenly', // Space evenly between cards
    paddingVertical: getResponsiveDimension(20),
    paddingHorizontal: getResponsiveDimension(10),
    zIndex: 1, // Ensure cards are above overlay
  },
  card: {
    width: getResponsiveDimension(275,100), // Adjust size as required
    height: getResponsiveDimension(300, 200),
    padding: getResponsiveDimension(20),
    alignItems: 'center',
    justifyContent: 'space-evenly',
    elevation: 5,
    shadowColor: COLORS.PINK_DARK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  middleCard: {
    width: getResponsiveDimension(300,100), // Slightly larger width
    height: getResponsiveDimension(325, 225), // Slightly larger height
  },
  cardColors: [
    { backgroundColor: COLORS.PRIMARY },
    { backgroundColor: COLORS.PRIMARY_DARK_EXTRA },
    { backgroundColor: COLORS.PRIMARY },
  ],
  cardTitle: {
    color: 'white',
    fontSize: getResponsiveFontSize(20, 14),
    textAlign: 'center',
  },
  cardText: {
    color: 'white',
    textAlign: 'center',
    fontSize: getResponsiveFontSize(16, 10),
  },
});

export { Slider };