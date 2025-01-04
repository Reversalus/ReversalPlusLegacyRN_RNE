import React, { useEffect, useRef, useState } from 'react';
import {
  ScrollView,
  Image,
    View
} from 'react-native';
import { Button, Card, SearchBar, Header, Text } from '@rneui/themed';
import { COLORS } from "../../../Constants";

// Define types for InfoItem props
interface InfoItemProps {
  iconUri: string;
  text: string;
}

// Component for displaying informational items with icons
const InfoItem: React.FC<InfoItemProps> = ({ iconUri, text }) => (
    <View style={styles.infoItem}>
      <Image source={{ uri: iconUri }} style={styles.icon} />
      <Text style={styles.infoText}>{text}</Text>
    </View>
);

// Define types for NavButton props
interface NavButtonProps {
  title: string;
  isActive: boolean;
  onPress: () => void;
}

// Button navigation component
const NavButton: React.FC<NavButtonProps> = ({ title, isActive, onPress }) => (
    <Button
        title={title}
        type="clear"
        titleStyle={isActive ? styles.activeNavItem : styles.navItem}
        onPress={onPress}
    />
);

// Define types for CustomHeader props
interface CustomHeaderProps {
  onNavigate: (index: number) => void;
  currentSection: number;
}

// Custom header component containing navigation and contact details
const CustomHeader: React.FC<CustomHeaderProps> = ({ onNavigate, currentSection }) => {
  const [search, setSearch] = useState<string>("");

  return (
      <View style={styles.stickyHeaderContainer}>
        {/* Top Bar */}
        <Header containerStyle={styles.topBar}

        centerComponent={
          <View style={styles.topHeader}>
            <Image
                source={{ uri: 'https://raw.githubusercontent.com/Reversalus/Assets/main/Images/logo/reversal_long_logo.png' }}
                style={styles.logo}
            />
            <View style={styles.contactInfo}>
              {renderContactInfo()}
            </View>
          </View>
        }
        />

        {/* Navigation Bar */}
        <Header containerStyle={styles.navBar}
        centerComponent={
          <View style={styles.navLinks}>
          {renderNavLinks(onNavigate, currentSection)}
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
        </View>}
        />

      </View>
  );

  function renderContactInfo() {
    const contactItems = [
      {
        iconUri: 'https://raw.githubusercontent.com/Reversalus/Assets/main/Images/logo/mail_new.png',
        text: '+91 800 123 456',
      },
      {
        iconUri: 'https://raw.githubusercontent.com/Reversalus/Assets/main/Images/logo/clock.png',
        text: 'info@Lifecare.com',
      },
      {
        iconUri: 'https://raw.githubusercontent.com/Reversalus/Assets/main/Images/logo/telephone.png',
        text: 'Daily: 7:00am - 8:00pm',
      }
    ];

    return contactItems.map((item, index) => (
        <InfoItem key={index} iconUri={item.iconUri} text={item.text} />
    ));
  }

  function renderNavLinks(onNavigate: (index: number) => void, currentSection: number) {
    const navItems = [
      { title: "Home", index: 0 },
      { title: "About us", index: 1 },
      { title: "Services", index: 2 },
    ];

    return navItems.map((link) => (
        <NavButton
            key={link.index}
            title={link.title}
            isActive={currentSection === link.index}
            onPress={() => onNavigate(link.index)}
        />
    ));
  }
};

// Define types for Section props
interface SectionProps {
  title: string;
  children: React.ReactNode;
}

// Component for each section of the page
const Section: React.FC<SectionProps> = ({ title, children }) => (
    <View style={styles.section}>
      <Text h4>{title}</Text>
      {children}
    </View>
);

// Define types for TestimonialCard props
interface TestimonialCardProps {
  title: string;
  text: string;
}

// Testimonial card component
const TestimonialCard: React.FC<TestimonialCardProps> = ({ title, text }) => (
    <Card>
      <Card.Title>{title}</Card.Title>
      <Card.Divider />
      <Text>{text}</Text>
    </Card>
);

// Main Home Page component
const HomePage: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<number>(0);
  const scrollViewRef = useRef<ScrollView | null>(null);
  const sections = [useRef<View | null>(null), useRef<View | null>(null), useRef<View | null>(null)];

  useEffect(() => {
    if (scrollViewRef.current && sections[currentSection].current) {
      sections[currentSection].current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentSection]);

  const handleNavigation = (index: number) => {
    setCurrentSection(index);
  };

  const handleScroll = (event: any) => {
    const { contentOffset, layoutMeasurement } = event.nativeEvent;
    const offsetY = contentOffset.y;
    const currentIndex = sections.findIndex(section => section.current && section.current.offsetTop <= offsetY + layoutMeasurement.height / 2);
    if (currentIndex !== -1) {
      setCurrentSection(currentIndex);
    }
  };

  return (
      <>
        <CustomHeader onNavigate={handleNavigation} currentSection={currentSection} />
        <ScrollView
            ref={scrollViewRef}
            onScroll={handleScroll}
            scrollEventThrottle={16}
        >
          {renderSections()}
        </ScrollView>
      </>
  );

  function renderSections() {
    return (
        <>
          <View ref={sections[0]}>
            <Section title="Slider Section">
              <Image
                  source={{ uri: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png' }}
                  style={styles.sliderImage}
                  resizeMode="contain"
              />
            </Section>
          </View>
          <View ref={sections[1]}>
            <Section title="Testimonials Section">
              <View style={styles.testimonialContainer}>
                {renderTestimonials()}
              </View>
            </Section>
          </View>
          <View ref={sections[2]}>
            <Section title="Contact Form Section">
              <Text>Please fill out the form below:</Text>
              <Button title="Submit" containerStyle={styles.contactButton} />
            </Section>
          </View>
        </>
    );
  }

  function renderTestimonials() {
    const testimonials = [
      { title: "John Doe", text: "This is a fantastic service! I highly recommend it to everyone." },
      { title: "Jane Smith", text: "Absolutely loved my experience! The team is very professional." },
    ];

    return testimonials.map((testimonial, index) => (
        <TestimonialCard key={index} title={testimonial.title} text={testimonial.text} />
    ));
  }
};

// Styles
const styles = {
  stickyHeaderContainer: {
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    backgroundColor: '#fff'
  },
  topBar: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
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
    height: 45
  },
  infoText: {
    fontSize: 18,
    color: COLORS.PRIMARY,
    fontWeight: '500',
  },
  navBar: {
    backgroundColor: COLORS.PRIMARY_DARK_EXTRA,
    paddingVertical: 0.2,
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
  activeNavItem: {
    color: COLORS.GREEN,
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
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    height: 800, // Consider making this dynamic if needed
  },
  testimonialContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  contactButton: {
    marginTop: 10,
  },
  sliderImage: {
    width: '100%',
    height: 300,
  },
};

export default HomePage;
