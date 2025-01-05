import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { COLORS } from '../../../Constants';
import { color } from '@rneui/base';
import {Icon} from '@rneui/themed';

const Services = () => {
  const services = [
    { heading: 'Diabetic Reversal Plan', description: 'Quisque eget nisl id nulla sagittis auctor quis id.' },
    { heading: 'Cardio Reversal Plan', description: 'Curabitur lobortis ligula sed magna dictum porta.' },
    { heading: 'Weight Reversal', description: 'Quisque velit nisi eget lacinia venenatis.' },
    { heading: 'Diet Counseling', description: 'Pellentesque in ipsum id orci porta dapibus.' },
    { heading: 'Lifestyle Coaching', description: 'Sed porttitor lectus nibh.' },
  ];

  const steps = [
    { step: 'Step 1', heading: 'Fill Your Basic Details', description: 'Quisque eget nisl id nulla sagittis auctor quis id.' , iconName: 'edit-document'},
    { step: 'Step 2', heading: 'Upload Your Health Record', description: 'Curabitur lobortis ligula sed magna dictum porta.', iconName: 'attach-file' },
    { step: 'Step 3', heading: 'Select Your Suitable Plan', description: 'Quisque velit nisi eget lacinia venenatis.', iconName: 'monitor-heart' }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Our Expert Services</Text>
      </View>

      {/* Consolidate into one ScrollView */}
      <View
        style={styles.contentContainer}
      >
        {services.map((service, index) => (
          <View key={index} style={styles.textSection}>
            <Text style={styles.heading}>{service.heading}</Text>
            <Text style={styles.description}>{service.description}</Text>
          </View>
        ))}
      </View>


      <View style={styles.titleContainer}>
        <Text style={styles.title}>Get Start Your Reversal Journey In Just 3 Steps</Text>
      </View>


      <View
        style={styles.contentContainer}
      >
        {steps.map((steps, index) => (
          <View key={index} style={styles.stepsSection}>
          <Text style={[{...styles.subtitle},{color: 'black'}]}>{steps.step}</Text>
          <Icon name= {steps.iconName} type="material" size={50} color={COLORS.BLUE} />
          <Text style={[{...styles.heading},{color: 'black'}]}>{steps.heading}</Text>
          <Text style={styles.description}>{steps.description}</Text>
          </View>
        ))}
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    marginHorizontal: '3%',
    borderRadius: 25,
    elevation: 10,
    padding: '3%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '5%',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom:20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
  },
  contentContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  subtitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_DARK_EXTRA,
    marginBottom: 5,
  },

  stepsSection: {
    width: '20%', // Consistent width for all cards
    height: 300,
    backgroundColor: `${COLORS.BABY_BLUE}50`,
    padding: 15,
    borderRadius: 20,
    elevation: 8,
    shadowColor: COLORS.PINK_DARK,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexWrap: 'wrap',
    margin: '0.5%',
    borderWidth:1,
    borderColor: COLORS.BABY_BLUE
  },
  textSection: {
    width: 250, // Consistent width for all cards
    height: 150,
    backgroundColor: `${COLORS.PRIMARY_LIGHT_EXTRA}40`,
    padding: 20,
    borderRadius: 20,
    elevation: 8,
    shadowColor: COLORS.PRIMARY_DARK_EXTRA,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    marginHorizontal: 5, // Space between cards
    justifyContent: 'center',
    alignItems: 'center', // Center align content within the card
    marginBottom: 50
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.PRIMARY,
    marginBottom: 5,
    textAlign: 'center', // Center heading inside the card
  },
  description: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    textAlign: 'center',
  },
});

export { Services };