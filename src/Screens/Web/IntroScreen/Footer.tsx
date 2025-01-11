// Footer.tsx
import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../../../Constants';
import useResponsiveDimensions from '../../../Hooks/useResponsiveDimensions';

const Footer: React.FC = () => {
  const {
    getResponsiveFontSize,
    getResponsiveWidth,
    getResponsiveHeight
  } = useResponsiveDimensions();

  const styles = generateStyles({
    getResponsiveFontSize,
    getResponsiveWidth,
    getResponsiveHeight
  });

  return (
    <View style={styles.footer}>
      <View style={styles.sectionContainer}>
        {/* Logo and description */}
        <View style={styles.brandSection}>
          <Text style={styles.brand}>REVERSAL PLUS</Text>
          <Text style={styles.description}>
            Locavore pork belly scen ester pine est chill wave microdosing pop uple itarian cliche artisan.
          </Text>
        </View>

        {/* Contact information */}
        <View style={styles.contactSection}>
          <Text style={styles.sectionTitle}>CONTACT US</Text>
          <Text style={styles.contactText}>PO Box 16122 Collins Street West Victoria 8007 Australia</Text>
          <Text style={styles.contactText}>info@gmail.com</Text>
          <Text style={styles.contactText}>(+1) 800 123 456</Text>
        </View>

        {/* Subscription section */}
        <View style={styles.subscribeSection}>
          <Text style={styles.sectionTitle}>SUBSCRIBE</Text>
          <Text style={styles.subscribeText}>
            Get healthy news, tips, and solutions to your problems from our experts.
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.emailInput}
              placeholder="Email address"
              placeholderTextColor="#bbb"
            />
            <TouchableOpacity style={styles.subscribeButton}>
              <Icon name="paper-plane" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Footer bottom */}
      <View style={styles.bottomSectionContainer}>
        <View style={styles.bottomSection}>
        <Text style={styles.copyright}>© 2025 Reversal Plus. All Rights Reserved.</Text>
        <View style={styles.socialIcons}>
          <TouchableOpacity>
            <Icon name="pinterest" size={20} color="#fff" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="youtube" size={20} color="#fff" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="google-plus" size={20} color="#fff" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="twitter" size={20} color="#fff" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="facebook" size={20} color="#fff" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="rss" size={20} color="#fff" style={styles.icon} />
          </TouchableOpacity>
        </View>
        </View>
      </View>
    </View>
  );
};

const generateStyles = ({ getResponsiveFontSize, getResponsiveWidth, getResponsiveHeight }: any) =>
  StyleSheet.create({
    footer: {
      backgroundColor:  COLORS.WHITE,
      borderTopWidth: 1,
      borderTopColor: '#ddd'
    },
    sectionContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: getResponsiveHeight(20),
      paddingVertical: getResponsiveHeight(20),
      paddingHorizontal: getResponsiveWidth(15),
      alignSelf: 'center',
      width: '90%',
    },
    brandSection: {
      flex: 1,
      padding: 5
    },
    brand: {
      fontSize: getResponsiveFontSize(14,12),
      fontWeight: 'bold',
      color: COLORS.PRIMARY_DARK,
      marginBottom: getResponsiveHeight(10),
    },
    description: {
      color: '#666',
      fontSize: getResponsiveFontSize(12,8),
    },
    contactSection: {
      flex: 1,
      padding: 5
    },
    sectionTitle: {
      fontSize: getResponsiveFontSize(14,12),
      fontWeight: 'bold',
      color: COLORS.PRIMARY_DARK,
      marginBottom: getResponsiveHeight(10),
    },
    contactText: {
      color: '#666',
      fontSize: getResponsiveFontSize(12,8),
      marginBottom: getResponsiveHeight(5),
    },
    subscribeSection: {
      flex: 1,
      padding: 5
    },
    subscribeText: {
      color: '#666',
      fontSize: getResponsiveFontSize(12,8),
      marginBottom: getResponsiveHeight(10),
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 5,
      overflow: 'hidden',
    },
    emailInput: {
      flex: 1,
      padding: getResponsiveHeight(8),
      fontSize: getResponsiveFontSize(12, 10),
    },
    subscribeButton: {
      backgroundColor: COLORS.PRIMARY_DARK,
      padding: getResponsiveHeight(8),
      alignItems: 'center',
      justifyContent: 'center',
    },
    bottomSection: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderTopWidth: 1,
      borderTopColor: '#ddd',
      padding: getResponsiveHeight(20,20),
      width: '90%',
      alignSelf: 'center'
    },
    bottomSectionContainer: {
      backgroundColor: COLORS.PRIMARY_BLUE,
    },
    copyright: {
      color: COLORS.WHITE,
      fontSize: getResponsiveFontSize(20,15),
      fontFamily: 'AlegreyaSans-Regular'
    },
    socialIcons: {
      flexDirection: 'row',
    },
    icon: {
      marginHorizontal: getResponsiveWidth(5),
    },
  });

export { Footer };
