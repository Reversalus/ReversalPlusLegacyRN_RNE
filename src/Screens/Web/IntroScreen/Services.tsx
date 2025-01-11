import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../../Constants';
import { Icon } from '@rneui/themed';
import useResponsiveDimensions from "../../../Hooks/useResponsiveDimensions";

const Services = () => {
  const { getResponsiveFontSize, getResponsiveDimension, getResponsiveWidth, getResponsiveHeight, isPortrait } = useResponsiveDimensions();

  const styles = generateStyles({
    getResponsiveFontSize,
    getResponsiveDimension,
    getResponsiveWidth,
    getResponsiveHeight,
    isPortrait
  });

  const services = [
    { heading: 'Diabetic Reversal Plan', description: 'Quisque eget nisl id nulla' },
    { heading: 'Cardio Reversal Plan', description: 'Curabitur lobortis ligula' },
    { heading: 'Weight Reversal', description: 'Quisque velit nisi eget' },
    { heading: 'Diet Counseling', description: 'Pellentesque in ipsum id ' },
    { heading: 'Thyroid Reversal', description: 'Sed porttitor lectus nibh.' },
    { heading: 'Lifestyle Coaching', description: 'Sed porttitor lectus nibh.' },
  ];

  const steps = [
    { step: 'Step 1', heading: 'Fill Your Basic Details', description: 'Quisque eget nisl id nulla sagittis auctor quis id.', iconName: 'edit-document' },
    { step: 'Step 2', heading: 'Upload Your Health Record', description: 'Curabitur lobortis ligula sed magna dictum porta.', iconName: 'attach-file' },
    { step: 'Step 3', heading: 'Select Your Suitable Plan', description: 'Quisque velit nisi eget lacinia venenatis.', iconName: 'monitor-heart' }
  ];

  // Split services into two halves for layout
  const halfIndex = Math.ceil(services.length / 2);
  const firstHalfServices = services.slice(0, halfIndex);
  const secondHalfServices = services.slice(halfIndex);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Our Expert Services</Text>
      </View>

      <View style={styles.servicesContainer}>
        {/* Only one ScrollView for both halves */}
        <View
          style={styles.scrollViewContainer}
        >
          {/* First Half */}
          <View style={styles.column}>
            {firstHalfServices.map((service, index) => (
              <View key={index} style={styles.textSection}>
                <Text style={styles.heading}>{service.heading}</Text>
                <Text style={styles.description}>{service.description}</Text>
              </View>
            ))}
          </View>

          {/* Second Half */}
          <View style={styles.column}>
            {secondHalfServices.map((service, index) => (
              <View key={index} style={styles.textSection}>
                <Text style={styles.heading}>{service.heading}</Text>
                <Text style={styles.description}>{service.description}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Get Start Your Reversal Journey In Just 3 Steps</Text>
      </View>

      <View style={styles.contentContainer}>
        {steps.map((step, index) => (
          <View key={index} style={styles.stepsSection}>
            <Text style={[{ ...styles.subtitle }, { color: 'black' }]}>{step.step}</Text>
            <Icon name={step.iconName} type="material" size={getResponsiveDimension(50,20)} color={COLORS.BLUE} />
            <Text style={[{ ...styles.heading }, { color: 'black' }]}>{step.heading}</Text>
            <Text style={styles.description}>{step.description}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const generateStyles = ({ getResponsiveDimension, getResponsiveFontSize, getResponsiveWidth, getResponsiveHeight, isPortrait }: any) => StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    borderRadius: getResponsiveDimension(25),
    elevation: 10,
    padding: getResponsiveDimension(30,20),
    width: '96%',
    alignSelf: 'center',
    marginTop: getResponsiveDimension(30,20)
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: getResponsiveDimension(20, 10)
  },
  title: {
    fontSize: getResponsiveFontSize(24, 20),
    fontWeight: 'bold',
    color: COLORS.BLACK,
    textAlign: 'center',
  },
  servicesContainer: {
    width: '100%',
  },
  scrollViewContainer: {
    flex: 1,
    flexDirection: isPortrait ? 'row' : 'column', // Change direction depending on orientation,
    alignItems:'center'
  },
  column: {
    flex: 1,
    flexDirection: isPortrait ? 'column' : 'row', // Change direction depending on orientation
    alignItems: 'center',
  },
  contentContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subtitle: {
    fontSize: getResponsiveFontSize(14, 10),
    fontWeight: 'bold',
    color: COLORS.PRIMARY_DARK_EXTRA,
    marginBottom: 5,
  },
  stepsSection: {
    width: '30%', // Consistent width for all cards
    height: getResponsiveHeight(200),
    backgroundColor: `${COLORS.BABY_BLUE}50`,
    padding: 15,
    borderRadius: 20,
    elevation: 8,
    shadowColor: COLORS.PINK_DARK,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    margin: '0.5%',
    borderWidth: 1,
    borderColor: COLORS.BABY_BLUE
  },
  textSection: {
    width: getResponsiveWidth(250, 120), // Adjust width based on portrait/landscape
    height: getResponsiveHeight(100, 50),
    backgroundColor: `${COLORS.PRIMARY_LIGHT_EXTRA}40`,
    padding: getResponsiveDimension(20, 20),
    borderRadius: getResponsiveDimension(20,10),
    elevation: 8,
    shadowColor: COLORS.PRIMARY_DARK_EXTRA,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    margin: '1%', // Space between cards
    justifyContent: 'center',
    alignItems: 'center', // Center align content within the card
    marginBottom: getResponsiveDimension(50, 20)
  },
  heading: {
    fontSize: getResponsiveFontSize(20, 10),
    fontWeight: 'bold',
    color: COLORS.PRIMARY_BLUE,
    marginBottom: 5,
    textAlign: 'center', // Center heading inside the card
  },
  description: {
    fontSize: getResponsiveFontSize(14, 8),
    lineHeight: getResponsiveDimension(20,10),
    color: COLORS.PRIMARY_DARK,
    textAlign: 'center',
  },
});

export { Services };