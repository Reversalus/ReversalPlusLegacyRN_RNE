import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';

const IntroScreenWeb = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.topBar}>
          <View style={styles.leftLinks}>
            <Text style={styles.link}>About</Text>
            <Text style={styles.link}>Doctors</Text>
            <Text style={styles.link}>Contact</Text>
            <Text style={styles.link}>FAQ</Text>
          </View>
          <View style={styles.rightContacts}>
            <Text style={styles.contact}>
              <Text style={styles.icon}>📞</Text> +880 1234 56789
            </Text>
            <Text style={styles.contact}>
              <Text style={styles.icon}>📧</Text> support@yourmail.com
            </Text>
          </View>
        </View>
        <View style={styles.headerInner}>
          <Image source={{ uri: 'img/logo.png' }} style={styles.logo} />
          <View style={styles.nav}>
            <Text style={styles.navItem}>Home</Text>
            <Text style={styles.navItem}>Doctors</Text>
            <Text style={styles.navItem}>Services</Text>
            <Text style={styles.navItem}>Contact Us</Text>
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Book Appointment</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Slider */}
      <View style={styles.slider}>
        <Image source={{ uri: 'img/slider2.jpg' }} style={styles.sliderImage} />
        <View style={styles.sliderText}>
          <Text style={styles.sliderTitle}>
            We Provide <Text style={styles.highlight}>Medical</Text> Services That You Can <Text style={styles.highlight}>Trust!</Text>
          </Text>
          <Text style={styles.sliderDescription}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed nisl pellentesque, faucibus libero eu, gravida quam.
          </Text>
          <View style={styles.sliderButtons}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Get Appointment</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonSecondary}>
              <Text style={styles.buttonSecondaryText}>Learn More</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Features Section */}
      <View style={styles.featuresSection}>
        <Text style={styles.sectionTitle}>We Are Always Ready to Help You & Your Family</Text>
        <View style={styles.features}>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>🚑</Text>
            <Text style={styles.featureTitle}>Emergency Help</Text>
            <Text style={styles.featureDescription}>
              Lorem ipsum sit, consectetur adipiscing elit. Maecenas mi quam vulputate.
            </Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>💊</Text>
            <Text style={styles.featureTitle}>Enriched Pharmacy</Text>
            <Text style={styles.featureDescription}>
              Lorem ipsum sit, consectetur adipiscing elit. Maecenas mi quam vulputate.
            </Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>🩺</Text>
            <Text style={styles.featureTitle}>Medical Treatment</Text>
            <Text style={styles.featureDescription}>
              Lorem ipsum sit, consectetur adipiscing elit. Maecenas mi quam vulputate.
            </Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          © Copyright 2018 | All Rights Reserved by{' '}
          <Text style={styles.footerLink}>wpthemesgrid.com</Text>
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftLinks: {
    flexDirection: 'row',
  },
  link: {
    marginHorizontal: 5,
    color: '#007bff',
  },
  rightContacts: {
    flexDirection: 'row',
  },
  contact: {
    marginHorizontal: 5,
  },
  icon: {
    marginRight: 5,
  },
  headerInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    width: 100,
    height: 50,
  },
  nav: {
    flexDirection: 'row',
  },
  navItem: {
    marginHorizontal: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
  },
  slider: {
    position: 'relative',
  },
  sliderImage: {
    width: '100%',
    height: 200,
  },
  sliderText: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  sliderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  highlight: {
    color: '#007bff',
  },
  featuresSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    textAlign: 'center',
  },
  features: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  feature: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  featureIcon: {
    fontSize: 40,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    backgroundColor: '#333',
    padding: 10,
  },
  footerText: {
    color: '#fff',
    textAlign: 'center',
  },
  footerLink: {
    color: '#007bff',
  },
});

export default IntroScreenWeb;
