import React, { useEffect, useRef, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import { Button, Card, SearchBar, Header } from '@rneui/themed';
import { COLORS } from "../../../Constants";

const InfoItem = ({ iconUri, text }) => (
    <View style={styles.infoItem}>
      <Image source={{ uri: iconUri }} style={styles.icon} />
      <Text style={styles.infoText}>{text}</Text>
    </View>
);

const NavButton = ({ title, onPress }) => (
    <Button
        title={title}
        type="clear"
        titleStyle={styles.navItem}
        onPress={onPress}
        color="#fff"
    />
);

const CustomHeader = ({ scrollToSection, sliderRef, testimonialRef, contactRef }) => {
  const [search, setSearch] = useState("");

  return (
      <View style={styles.stickyHeaderContainer}>
        {/* Top Bar */}
        <Header
            containerStyle={styles.topBar}
            centerComponent={
              <View style={styles.topHeader}>
                <Image
                    source={{
                      uri: 'https://raw.githubusercontent.com/Reversalus/Assets/main/Images/logo/reversal_long_logo.png',
                    }}
                    style={styles.logo}
                />
                <View style={styles.contactInfo}>
                  {[
                    {
                      iconUri: 'https://raw.githubusercontent.com/Reversalus/Assets/main/Images/logo/mail.png',
                      text: '+91 800 123 456',
                    },
                    {
                      iconUri: 'https://raw.githubusercontent.com/Reversalus/Assets/main/Images/logo/stopwatch.png',
                      text: 'info@Lifecare.com',
                    },
                    {
                      iconUri: 'https://raw.githubusercontent.com/Reversalus/Assets/main/Images/logo/viber.png',
                      text: 'Daily: 7:00am - 8:00pm',
                    },
                  ].map((item, index) => (
                      <InfoItem key={index} iconUri={item.iconUri} text={item.text} />
                  ))}
                </View>
              </View>
            }
        />

        {/* Navigation Bar */}
        <Header
            containerStyle={styles.navBar}
            centerComponent={
              <View style={styles.navLinks}>
                {[
                  { title: "Home", action: () => {
                      window.location.reload()
                    },
                    },
                  { title: "About us", ref: testimonialRef },
                  { title: "Services", ref: contactRef },
                ].map((link, index) => (
                    <NavButton
                        key={index}
                        title={link.title}
                        onPress={link.action || (() => scrollToSection(link.ref))}
                    />
                ))}
                <SearchBar
                    placeholder="Search here..."
                    onChangeText={setSearch}
                    value={search}
                    containerStyle={styles.searchBar}
                    inputContainerStyle={styles.inputContainer}
                    inputStyle={styles.input}
                    searchIcon={{ type: 'font-awesome', name: 'search', color: COLORS.GREEN, size: 20 }}
                    placeholderTextColor={COLORS.CHARCOAL_GRAY}
                />
              </View>
            }
        />
      </View>
  );
};

const Section = ({ title, children }) => (
    <View style={styles.section}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
);

const TestimonialCard = ({ title, text }) => (
    <Card>
      <Card.Title>{title}</Card.Title>
      <Card.Divider />
      <Text>{text}</Text>
    </Card>
);

const HomePage = () => {
  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const sliderRef = useRef(null);
  const testimonialRef = useRef(null);
  const contactRef = useRef(null);

  // Ensure the page starts at the top on initial load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
      <>
        <CustomHeader
            scrollToSection={scrollToSection}
            sliderRef={sliderRef}
            testimonialRef={testimonialRef}
            contactRef={contactRef}
        />

        <ScrollView>
          <View ref={sliderRef}>
            <Section title="Slider Section">
              <Image
                  source={{ uri: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png' }}
                  style={styles.sliderImage}
                  resizeMode="contain"
              />
            </Section>
          </View>
          <View ref={testimonialRef}>
            <Section title="Testimonials Section">
              <View style={styles.testimonialContainer}>
                {[
                  { title: "John Doe", text: "This is a fantastic service! I highly recommend it to everyone." },
                  { title: "Jane Smith", text: "Absolutely loved my experience! The team is very professional." },
                ].map((testimonial, index) => (
                    <TestimonialCard key={index} title={testimonial.title} text={testimonial.text} />
                ))}
              </View>
            </Section>
          </View>
          <View ref={contactRef}>
            <Section title="Contact Form Section">
              <Text>Please fill out the form below:</Text>
              <Button title="Submit" containerStyle={styles.contactButton} />
            </Section>
          </View>
        </ScrollView>
      </>
  );
};

const styles = StyleSheet.create({
  container: { width: '100%' },
  stickyHeaderContainer: {
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    backgroundColor: '#fff',
  },
  topBar: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  topHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 20,
  },
  logo: {
    width: 300,
    height: 50,
    resizeMode: 'contain',
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  icon: {
    marginHorizontal: 10,
    width: 45,
    height: 45,
  },
  infoText: {
    fontSize: 18,
    color: COLORS.PRIMARY,
    fontWeight: '500',
  },
  navBar: {
    backgroundColor: COLORS.PRIMARY_DARK_EXTRA,
    paddingVertical: 10,
  },
  navLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  navItem: {
    color: COLORS.WHITE,
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchBar: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    marginLeft: 30,
  },
  inputContainer: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 20,
    height: 40,
    paddingHorizontal: 10,
  },
  input: {
    fontSize: 16,
    color: COLORS.BLUE,
  },
  section: {
    padding: 20,
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  sliderImage: {
    width: '100%',
    height: 300,
  },
  testimonialContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  contactButton: {
    marginTop: 10,
  },
});

export default HomePage;
