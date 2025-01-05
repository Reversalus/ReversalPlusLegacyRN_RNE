import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, View, StyleSheet, Dimensions } from 'react-native';
import { Button, Card, Text, Divider } from '@rneui/themed';
import { CustomHeader } from "./CustomHeader.tsx";
import { SectionProps } from "./type.ts";
import { Slider } from './Slider.tsx';
import {AboutUs} from './AboutUs.tsx';
import {Services} from './Services.tsx'
import {Testimonial} from './Testimonial.tsx'
import { ContactUs } from './ContactUs.tsx';
import { Footer } from './Footer.tsx';
// Get window height and width using Dimensions API
const { height: windowHeight, width: windowWidth } = Dimensions.get('window');

// Section Component
const Section: React.FC<SectionProps> = ({ title, children }) => (
  <View style={[styles.section, { height: windowHeight * 0.75 }]}>
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
  const sections = [useRef<View | null>(null), useRef<View | null>(null), useRef<View | null>(null), useRef<View | null>(null), useRef<View | null>(null)];

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

  function renderSections() {
    return (
      <>
        <View ref={sections[0]}>
          <Section title="">
            <Slider />
          </Section>
        </View>
        <View ref={sections[1]}>
          <Section title="">
            <View style={styles.testimonialContainer}>
              <AboutUs/>
            </View>
          </Section>
        </View>
        <View ref={sections[2]}>
          <Section title="">
            <Services />
          </Section>
        </View>
        <View ref={sections[3]}>
          <Section title="">
            <Testimonial />
          </Section>
        </View>
        <View ref={sections[4]}>
          <Section title="">
            <ContactUs />
          </Section>
        </View>
        <View ref={sections[5]}>
          <Section title="">
            <Footer />
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
  
  return (
    <>
      <CustomHeader onNavigate={handleNavigation} currentSection={currentSection} />
      <ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {renderSections()}
      </ScrollView>
    </>
  );
};

// Styles
const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  section: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  testimonialContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  contactButton: {
    marginTop: 10,
  },
  divider: {
    height: 1,
    marginVertical: 15,
    backgroundColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5, // For Android shadow
    borderRadius: 10, // Optional, to give rounded corners for the divider
  },
});

export default HomePage;
