import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Input, Button, Icon, Text, CheckBox } from '@rneui/themed';
import { COLORS } from '../../../Constants';

const features = [
  { icon: 'biotech', title: 'PREMIUM FACILITIES' },
  { icon: 'monitor-heart', title: 'LARGE LABORATORY' },
  { icon: 'file-present', title: 'DETAILED SPECIALIST' },
  { icon: 'vaccines', title: 'CHILDREN CARE CENTER' },
  { icon: 'medication', title: 'FINE INFRASTRUCTURE' },
  { icon: 'science', title: 'ANYTIME BLOOD BANK' }
];

const ContactUs = () => {
  const [selectedDiseases, setSelectedDiseases] = useState({});

  const toggleDisease = (disease) => {
    setSelectedDiseases(prevState => ({
      ...prevState,
      [disease]: !prevState[disease]
    }));
  };

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Get In Touch With US</Text>
      <View style={styles.rowContainer}>
        
        {/* Features Container */}
        <View style={styles.featuresContainer}>
          {features.map((item, index) => (
            <View key={index} style={styles.featureCard}>
              <Icon name={item.icon} type="material" size={50} color={COLORS.PRIMARY_DARK_EXTRA} />
              <Text style={styles.featureTitle}>{item.title}</Text>
              <Text>Lorem Ipsum is simply dummy text of the printing.</Text>
            </View>
          ))}
        </View>

        {/* Contact Card */}
        <Card containerStyle={styles.cardContainer}>
          <Card.Title style={styles.cardTitle}>Contact Us</Card.Title>
          <Card.Divider />
          <Input placeholder="Your Name" leftIcon={{ name: 'user', type: 'font-awesome' }} />
          <Input placeholder="Email Address" leftIcon={{ name: 'envelope', type: 'font-awesome' }} />
          <Input placeholder="Your Age" leftIcon={{ name: 'calendar', type: 'font-awesome' }} keyboardType="numeric" />

          <Text style={styles.label}>Select Conditions:</Text>
          {['Cardio', 'Heart', 'Diabetes', 'BP', 'Thyroid'].map((disease, index) => (
            <CheckBox
              key={index}
              title={disease}
              checked={selectedDiseases[disease] || false}
              onPress={() => toggleDisease(disease)}
              containerStyle={styles.checkboxContainer}
            />
          ))}

          <Button title="Request for a Call Back" containerStyle={styles.buttonContainer} />
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center', // Center the content vertically
    backgroundColor: '#ffffff',
    marginHorizontal: '3%',
    borderRadius: 25,
    elevation: 10,
    padding: '3%',
    alignItems: 'center',
    marginTop: '12%',
  },
  title: {
    fontSize: 30,
    color: '#333333',
    textAlign: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  featuresContainer: {
    width: '70%', // Adjust width for features container
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  featureCard: {
    alignItems: 'center',
    width: '45%', // Adjust width for feature cards
    margin: 10,
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    borderColor: COLORS.PRIMARY_DARK_EXTRA,
    borderWidth: 1
  },
  featureTitle: {
    marginVertical: 10,
    fontWeight: 'bold'
  },
  cardContainer: {
    width: '25%', // Set width for contact card
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5
  },
  cardTitle: {
    fontSize: 22,
    marginBottom: 15
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
    fontWeight: 'bold'
  },
  checkboxContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%'
  }
});

export { ContactUs };