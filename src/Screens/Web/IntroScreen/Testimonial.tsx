import React, { useState } from 'react';
import { View, Dimensions, StyleSheet, Alert, FlatList } from 'react-native';
import { Card, Text, Image, Icon } from '@rneui/themed';
import { COLORS } from '../../../Constants';

interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
  image?: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Datta Shinde',
    text: 'Fitterfly is a very user-friendly team. The app is very easy to use. The complete team comprising of my personal coach, the nutrition coach, or be it my physician coach has been very motivating and positive about handling to reverse my diabetic condition...',
    rating: 5,
    image: 'https://media.istockphoto.com/id/1135381173/photo/portrait-of-a-young-man-outdoors-smiling.jpg?s=612x612&w=0&k=20&c=J8DKGHI8o-oj8cY1CCNpFY2V9OmVVbJuKSO2DdbMvRg=',
  },
  {
    id: '2',
    name: 'Sneha Roongta',
    text: 'I reduced my HbA1c levels from 8.8% to 5.7% in 3 months. Fitterfly has completely transformed my life. I now feel like the happiest person in the world...',
    rating: 5,
    image: 'https://media.istockphoto.com/id/1135381120/photo/portrait-of-a-young-woman-outdoors-smiling.jpg?s=612x612&w=0&k=20&c=T5dukPD1r-o0BFqeqlIap7xzw07icucetwKaEC2Ms5M=',
  },
  {
    id: '3',
    name: 'Shristy Singh',
    text: 'My journey with Fitterfly was more amazing than I had hoped for. I lost 5.6 kg in three months which is way more than I was able to achieve with any other plans before...',
    rating: 5,
    image: 'https://media.istockphoto.com/id/1060638228/photo/portrait-of-a-beautiful-hispanic-woman.jpg?s=612x612&w=0&k=20&c=rFRd8ENRqaePkZfc2gzwHEEm391zxlMESTdO1T9aLho=',
  },
  {
    id: '4',
    name: 'Monica Arora',
    text: 'I reduced my weight by 11 kgs. I would never like to leave Fitterfly as the support has been incredible...',
    rating: 5,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKwZ2jdQdldYVMno2WwvVPMiuOxRYr1r1Y1h3MihZsTgtYjgfEL7b0MVqFlFw1N-y_wxE&usqp=CAU',
  },
  {
    id: '5',
    name: 'Nitin Sharma',
    text: 'A nice and effective program curated by the Fitterfly team. I have achieved good results and reduced my diabetes medication. The Meal diary and insights are very helpful...',
    rating: 5,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOFvXZ54iAkVFWDfNLWOoiFCj-UED9Ni7pLkgOIWqOHpaNwjUP45jtKXDJ_5j2rORTzuM&usqp=CAU',
  },
  {
    id: '6',
    name: 'Dharmender Tewari',
    text: '58 ki age mein bhi young mehsoos karta hoon. It has changed my perspective towards fitness completely...',
    rating: 5,
    image: 'https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ=',
  },
];

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => {
  const handleReadMore = () => {
    Alert.alert('Full Testimonial', testimonial.text, [{ text: 'Close', style: 'cancel' }]);
  };

  const charLimit = 100;

  return (
    <Card containerStyle={styles.card}>
      {testimonial.image && (
        <View style={styles.headerImageContainer}>
          <Image
            source={{ uri: testimonial.image }}
            containerStyle={styles.headerImage}
            resizeMode="cover"
          />
        </View>
      )}
      <View style={styles.contentContainer}>
        <Icon name="format-quote" type="material" color="#ccc" size={30} style={styles.quoteIcon} />
        <Text style={styles.text}>
          {testimonial.text.length > charLimit
            ? `${testimonial.text.substring(0, charLimit)}... `
            : testimonial.text}
          {testimonial.text.length > charLimit && (
            <Text style={styles.readMoreButton} onPress={handleReadMore}>
              Read More
            </Text>
          )}
        </Text>
        <Icon name="format-quote" type="material" color="#ccc" size={30} style={[styles.quoteIcon, styles.quoteIconRight]} />
      </View>
      <View style={styles.footerContainer}>
        <Text style={styles.name}>{testimonial.name}</Text>
        <View style={styles.ratingContainer}>
          {[...Array(testimonial.rating)].map((_, index) => (
            <Icon key={index} name="star" type="material" color="#FFD700" size={18} />
          ))}
        </View>
      </View>
    </Card>
  );
};

const Testimonial: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text h3 style={styles.heading}>
        Feels too good to be true?
      </Text>
      <Text style={styles.subheading}>
        Here are some real-life stories of our members!
      </Text>
      <FlatList
        data={testimonials}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TestimonialCard testimonial={item} />}
        numColumns={3}
        contentContainerStyle={styles.listContainer}
      />
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
    marginTop: '10%',
  },
  heading: {
    textAlign: 'center',
    marginBottom: 10,
  },
  subheading: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  listContainer: {
    justifyContent: 'center',
  },
  card: {
    borderRadius: 16,
    padding: 15,
    margin: 10,
    flex: 1,
    maxWidth: (Dimensions.get('window').width - 60) / 3, // Ensures 3 cards per row
    elevation: 4,
    backgroundColor: `${COLORS.PRIMARY_LIGHT_EXTRA}40`, // Reverted to baby blue shade
    borderColor: COLORS.PRIMARY,
    borderWidth:1
  },
  headerImageContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  headerImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  contentContainer: {
    alignItems: 'center',
    paddingHorizontal: 10,
    position: 'relative',
  },
  quoteIcon: {
    position: 'absolute',
    top: -10,
    left: 10,
  },
  quoteIconRight: {
    right: 10,
    left: 'auto',
  },
  text: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  readMoreButton: {
    fontSize: 14,
    color: COLORS.PRIMARY_DARK_EXTRA,
    textDecorationLine: 'underline',
  },
  footerContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
  },
});

export {Testimonial};
