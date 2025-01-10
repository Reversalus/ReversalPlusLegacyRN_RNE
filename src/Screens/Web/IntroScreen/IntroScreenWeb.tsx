import React, { useRef, useState } from 'react';
import { ScrollView, View, StyleSheet, Dimensions, Platform } from 'react-native';
import { Text } from '@rneui/themed';
import { CustomHeader } from './CustomHeader.tsx';
import { SectionProps } from './type.tsx';
import { Slider } from './Slider.tsx';
import { AboutUs } from './AboutUs.tsx';
import { Services } from './Services.tsx';
import { Testimonial } from './Testimonial.tsx';
import { ContactUs } from './ContactUs.tsx';
import { Footer } from './Footer.tsx';
import useResponsiveDimensions from '../../../Hooks/useResponsiveDimensions.ts';

// Get window height using Dimensions API
const { height: windowHeight } = Dimensions.get('window');


// Main Home Page component
const HomePage: React.FC = () => {
  const scrollViewRef = useRef<ScrollView | null>(null);
  const { getResponsiveHeight, isPortrait } = useResponsiveDimensions();

  const sections = [
    useRef<View | null>(null),
    useRef<View | null>(null),
    useRef<View | null>(null),
    useRef<View | null>(null),
    useRef<View | null>(null),
    useRef<View | null>(null),
  ];

  const [headerHeight, setHeaderHeight] = useState(0);

  const handleNavigation = (index: number) => {
    if (scrollViewRef.current && sections[index].current) {
      if (Platform.OS === 'web') {
        // Get the position of the section element
        const rect = sections[index].current.getBoundingClientRect();
        // Get the scroll position of the ScrollView relative to the document
        const scrollPosition = window.scrollY || window.pageYOffset;
        // Calculate the target scroll position with the offset (e.g., 100 pixels)
        const targetScrollPosition = rect.top + scrollPosition - (isPortrait ? getResponsiveHeight(180, 175) : getResponsiveHeight(140)); // Adjust the offset as needed

        // Scroll to the calculated position
        window.scrollTo({
          top: targetScrollPosition,
          behavior: 'smooth',
        });
      } else {
        // Measure the layout to get the Y position of the section for mobile
        sections[index].current.measureLayout(
          scrollViewRef.current,
          (x, y) => {
            // Scroll to the Y position of the section adjusted for the header height
            scrollViewRef.current.scrollTo({ y: y - headerHeight, animated: true });
          },
          () => {
            console.warn('Failed to measure layout for section:', index);
          }
        );
      }
    }
  };

  function renderSections() {
    return (
      <>
        <View ref={sections[0]}>
          <View style={styles.section1}>
            <Slider />
          </View>
        </View>
        <View ref={sections[1]}>
          <View style={styles.section2}>

            <AboutUs />
          </View>
        </View>
        <View ref={sections[2]}>
          <View style={styles.section3}>


            <Services />
          </View>
        </View>
        <View ref={sections[3]}>
          <View style={styles.section4}>


            <Testimonial />
          </View>
        </View>
        <View ref={sections[4]}>
          <View style={styles.section5}>


            <ContactUs />
          </View>
        </View>
        <View ref={sections[5]}>
          <View style={styles.section}>


            <Footer />
          </View>
        </View>
      </>
    );
  }

  return (
    <View style={styles.container}>
      <CustomHeader
        onNavigate={handleNavigation}
        onLayout={(event) => {
          setHeaderHeight(event.nativeEvent.layout.height); // Set header height dynamically
        }}
      />
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={{ paddingTop: headerHeight }} // Adjust padding to avoid overlap with header
      >
        {renderSections()}
      </ScrollView>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1, // Make sure ScrollView expands to fit contents
    flexWrap: 'wrap'
  },
  section1: {
    minHeight: windowHeight, // Ensure each section takes at least the full height of the window
    marginVertical: 10, // Space between sections
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  section2: {
    minHeight: windowHeight-100, // Ensure each section takes at least the full height of the window
    marginVertical: 10, // Space between sections
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  section3: {
    minHeight: windowHeight-100, // Ensure each section takes at least the full height of the window
    marginVertical: 10, // Space between sections
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  section4: {
    minHeight: windowHeight-100, // Ensure each section takes at least the full height of the window
    marginVertical: 10, // Space between sections
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  section5: {
    minHeight: windowHeight, // Ensure each section takes at least the full height of the window
    marginVertical: 10, // Space between sections
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});

export default HomePage;