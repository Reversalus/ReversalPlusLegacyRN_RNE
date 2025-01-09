// Footer.tsx
import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../../../Constants';
import useResponsiveDimensions from '../../../Hooks/useResponsiveDimensions';

const Footer: React.FC = () => {
  const { getResponsiveFontSize, getResponsiveDimension, getResponsiveWidth, getResponsiveHeight, isPortrait } = useResponsiveDimensions();

  const styles = generateStyles({
    getResponsiveFontSize,
    getResponsiveDimension,
    getResponsiveWidth,
    getResponsiveHeight,
    isPortrait
  });
  
  return (

    !isPortrait && 
    (<View style={styles.footer}>
      <Text style={styles.brand}>ReversalPlus</Text>
      
      <View style={styles.links}>
        <TouchableOpacity onPress={() => Linking.openURL('https://example.com/about')}>
          <Text style={styles.link}>About Us</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('https://example.com/services')}>
          <Text style={styles.link}>Services</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('https://example.com/contact')}>
          <Text style={styles.link}>Contact</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.socialMedia}>
        <TouchableOpacity onPress={() => Linking.openURL('https://facebook.com')}>
          <Icon name="facebook" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('https://twitter.com')}>
          <Icon name="twitter" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('https://instagram.com')}>
          <Icon name="instagram" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <Text style={styles.copyright}>© 2023 MyBrand. All rights reserved.</Text>
    </View>)
  );
};

const generateStyles = ({getResponsiveFontSize,
  getResponsiveDimension,
  getResponsiveWidth,
  getResponsiveHeight,
  isPortrait}:any) => StyleSheet.create({
  footer: {
    alignItems: 'center',
    bottom: 0,
    alignSelf: 'flex-end', // Center the content vertically
    backgroundColor: COLORS.PRIMARY_DARK_EXTRA,
    marginTop: isPortrait? '300%' :'40%',
    padding: '2%',
    flex: 1,
    width: '100%',
  },
  brand: {
    fontSize: getResponsiveFontSize(24,18),
    color: '#fff',
    marginBottom: 10,
  },
  links: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  link: {
    color: '#fff',
    marginHorizontal: 15,
  },
  socialMedia: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  copyright: {
    color: '#fff',
    fontSize: getResponsiveFontSize(12,10),
    textAlign: 'center',
    marginTop: 10,
  },
});

export {Footer};