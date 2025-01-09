import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Input, Button, Icon, Text, CheckBox } from '@rneui/themed';
import { COLORS } from '../../../Constants';
import { Footer } from './Footer';
import useResponsiveDimensions from '../../../Hooks/useResponsiveDimensions';

const features = [
  { icon: 'biotech', title: 'PREMIUM FACILITIES', subtitle: 'Lorem Ipsum is simply dummy text of the printing.' },
  { icon: 'monitor-heart', title: 'LARGE LABORATORY', subtitle: 'Lorem Ipsum is simply dummy text of the printing.'  },
  { icon: 'file-present', title: 'DETAILED SPECIALIST', subtitle: 'Lorem Ipsum is simply dummy text of the printing.'  },
  { icon: 'vaccines', title: 'CHILDREN CARE CENTER', subtitle: 'Lorem Ipsum is simply dummy text of the printing.'  },
  { icon: 'medication', title: 'FINE INFRASTRUCTURE', subtitle: 'Lorem Ipsum is simply dummy text of the printing.'  },
  { icon: 'science', title: 'ANYTIME BLOOD BANK', subtitle: 'Lorem Ipsum is simply dummy text of the printing.' }
];

const ContactUs = () => {
  const { getResponsiveFontSize, getResponsiveDimension, getResponsiveWidth, getResponsiveHeight, isPortrait } = useResponsiveDimensions();

  const styles = generateStyles({
    getResponsiveFontSize,
    getResponsiveDimension,
    getResponsiveWidth,
    getResponsiveHeight,
    isPortrait
  });
  
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
          <View style={styles.featuresRow}>
            {features.slice(0, 2).map((item, index) => (
              <View key={index} style={styles.featureCard}>
                <Icon name={item.icon} type="material" size={getResponsiveDimension(50, 30)} color={COLORS.PRIMARY_DARK_EXTRA} />
                <Text style={styles.featureTitle}>{item.title}</Text>
                <Text style={styles.featureSubTitle}>{item.subtitle}</Text>
              </View>
            ))}
          </View>
          <View style={styles.featuresRow}>
            {features.slice(2,4).map((item, index) => (
              <View key={index} style={styles.featureCard}>
                <Icon name={item.icon} type="material" size={getResponsiveDimension(50, 30)} color={COLORS.PRIMARY_DARK_EXTRA} />
                <Text style={styles.featureTitle}>{item.title}</Text>
                <Text style={styles.featureSubTitle}>{item.subtitle}</Text>
              </View>
            ))}
          </View>

          <View style={styles.featuresRow}>
            {features.slice(4).map((item, index) => (
              <View key={index} style={styles.featureCard}>
                <Icon name={item.icon} type="material" size={getResponsiveDimension(50, 30)} color={COLORS.PRIMARY_DARK_EXTRA} />
                <Text style={styles.featureTitle}>{item.title}</Text>
                <Text style={styles.featureSubTitle}>{item.subtitle}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Contact Card */}
        <Card containerStyle={styles.cardContainer}>
          <Card.Title style={styles.cardTitle}>Contact Us</Card.Title>
          <Card.Divider />
          <Input placeholder="Your Name" leftIcon={{ name: 'user', type: 'font-awesome' }} />
          <Input placeholder="Phone Number" leftIcon={{ name: 'phone', type: 'font-awesome' }} />
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

const generateStyles = ({ getResponsiveDimension, getResponsiveFontSize, getResponsiveWidth, getResponsiveHeight, isPortrait }: any) => StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    marginTop: isPortrait ? getResponsiveDimension(370, 370) : getResponsiveDimension(260, 260),
    borderRadius: getResponsiveDimension(25),
    elevation: 10,
    height: isPortrait ? getResponsiveHeight(1500) : getResponsiveHeight(800),
    padding: getResponsiveDimension(20, 20),
    width: '96%',
    alignSelf: 'center'
  },
  title: {
    fontSize: getResponsiveFontSize(30, 20),
    color: COLORS.BLACK,
    textAlign: 'center',
  },
  rowContainer: {
    flexDirection: isPortrait ? 'column' : 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
  },
  featuresContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    flex: 1,
    marginRight: 10, // Space between features and contact card
  },
  featuresRow: {
    flexDirection: 'row', // Always show in row
    justifyContent: 'space-between',
    marginBottom: 10, // Spacing between rows
  },
  featureCard: {
    alignItems: 'center',
    width: isPortrait? getResponsiveWidth(570) : getResponsiveWidth(400), // Set width to take up half the space
    height: getResponsiveHeight(160,120),
    margin: getResponsiveDimension(20), // Adjust spacing between cards
    padding: getResponsiveDimension(20, 15),
    borderRadius: getResponsiveDimension(10, 5),
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    borderColor: COLORS.PRIMARY_DARK_EXTRA,
    borderWidth: 1,
  },
  featureTitle: {
    marginVertical: getResponsiveDimension(10,6),
    fontWeight: 'bold',
    fontSize: getResponsiveFontSize(20,12),
    textAlign: 'center'
  },
  featureSubTitle: {
    fontSize: getResponsiveFontSize(18,10),
    textAlign: 'center'
  },
  cardContainer: {
    width: isPortrait? getResponsiveWidth(1100): getResponsiveWidth(400), // Set width for contact card
    borderRadius: getResponsiveWidth(10, 8),
    padding: getResponsiveDimension(10, 10),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    height: getResponsiveHeight(700)
  },
  cardTitle: {
    fontSize: getResponsiveFontSize(22, 10),
    marginBottom: 15,
  },
  label: {
    fontSize: getResponsiveDimension(16, 12),
    marginVertical: getResponsiveDimension(10),
    fontWeight: 'bold',
  },
  checkboxContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    fontSize: 1
  },
  buttonContainer: {
    marginTop: getResponsiveDimension(20,15),
    width: '100%',
  },
});

export { ContactUs };