// CustomHeader.tsx

import React, { useState, useCallback } from "react";
import { Image, View, StyleSheet, Pressable } from "react-native";
import { Header, SearchBar, Text, Button } from "@rneui/themed";
import { COLORS } from "../../../Constants"; // Ensure your COLORS is correctly defined
import { CustomHeaderProps, InfoItemProps, NavButtonProps } from "./type";
import { GetStartedIntroModalWeb } from '../../Web';
import useResponsiveDimensions from "../../../Hooks/useResponsiveDimensions";

const CustomHeader: React.FC<CustomHeaderProps> = ({ onNavigate, currentSection }) => {
    const [search, setSearch] = useState<string>("");
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const { getResponsiveFontSize, getResponsiveWidth, getResponsiveHeight, getResponsiveDimension } = useResponsiveDimensions();

    const openModal = () => setModalVisible(true);
    const closeModal = () => setModalVisible(false);

    const styles = generateStyles({
        getResponsiveFontSize,
        getResponsiveWidth,
        getResponsiveHeight,
        getResponsiveDimension
    });

    const NavButton: React.FC<NavButtonProps> = ({ title, index, isActive }) => {
        const handlePress = useCallback(() => {
            onNavigate(index);
        }, [index, onNavigate]);

        return (
            <Pressable
                onPress={handlePress}
                onPressIn={() => setHoveredIndex(index)}
                onPressOut={() => setHoveredIndex(null)}
                style={({ pressed }) => [
                    styles.navButton,
                    isActive && styles.activeNavButton,
                    (hoveredIndex === index || pressed) && styles.hoveredNavButton,
                ]}
            >
                <Text style={styles.navText}>{title}</Text>
            </Pressable>
        );
    };

    const InfoItem: React.FC<InfoItemProps> = ({ iconUri, text }) => (
        <View style={styles.infoItem}>
             <View style={styles.infoImageContainer}>
            <Image source={{ uri: iconUri }} style={styles.icon} />
            </View>
            <Text style={styles.infoText}>{text}</Text>
        </View>
    );

    const renderContactInfo = useCallback(() => {
        const contactItems = [
            { iconUri: 'https://raw.githubusercontent.com/Reversalus/Assets/main/Images/icon/phone.png', text: '+91 800 123 456' },
            { iconUri: 'https://raw.githubusercontent.com/Reversalus/Assets/main/Images/icon/mail.png', text: 'info@Lifecare.com' },
            { iconUri: 'https://raw.githubusercontent.com/Reversalus/Assets/main/Images/icon/alarm.png', text: 'Daily: 7:00am - 8:00pm' },
        ];

        return contactItems.map((item, index) => (
            <InfoItem key={index} iconUri={item.iconUri} text={item.text} />
        ));
    }, []);

    const renderNavLinks = useCallback(() => {
        const navItems = [
            { title: "Home", index: 0 },
            { title: "About Us", index: 1 },
            { title: "Services", index: 2 },
            { title: "Testimonials", index: 3 },
            { title: "Contact Us", index: 4 },
        ];

        return navItems.map((link) => (
            <NavButton
                key={link.index}
                title={link.title}
                index={link.index}
                isActive={currentSection === link.index}
            />
        ));
    }, [currentSection]);

    return (
        <View style={styles.stickyHeaderContainer}>
            <View style={styles.topBar}>
                <View style={styles.contactInfo}>
                    <Image
                        source={{ uri: 'https://raw.githubusercontent.com/Reversalus/Assets/main/Images/logo/new_Logo.png' }}
                        style={styles.logo}
                    />
                    {renderContactInfo()}
                </View>
            </View>

            <View style={styles.navBar}>
                <View style={styles.navLinks}>
                    {renderNavLinks()}
                    <View style={styles.searchContainer}>
                        <SearchBar
                            placeholder="Search here..."
                            onChangeText={setSearch}
                            value={search}
                            containerStyle={styles.searchBar}
                            inputContainerStyle={styles.inputContainer}
                            inputStyle={styles.input}
                            searchIcon={{ type: 'font-awesome', name: 'search', color: COLORS.GREEN, size: getResponsiveDimension(20,10) }}
                            placeholderTextColor={COLORS.CHARCOAL_GRAY}
                        />
                    </View>
                    <Button
                        title="Get Started"
                        buttonStyle={styles.button}
                        titleStyle={styles.buttonTitle}
                        onPress={openModal}
                    />
                </View>
            </View>
            <GetStartedIntroModalWeb isVisible={isModalVisible} onClose={closeModal} />
        </View>
    );
};

// Styles
const generateStyles = ({
    getResponsiveFontSize,
    getResponsiveWidth,
    getResponsiveHeight,
    getResponsiveDimension }: any) => StyleSheet.create({
        stickyHeaderContainer: {
            position: 'sticky',
            top: 0,
            zIndex: 1000,
        },
        topBar: {
            backgroundColor: COLORS.WHITE,
            paddingVertical: getResponsiveDimension(10),
            borderBottomWidth: 1,
            borderBottomColor: '#ccc'
        },
        logo: {
            width: getResponsiveWidth(180, 150),
            height: getResponsiveHeight(50),
            marginRight: getResponsiveDimension(20),
            resizeMode: 'contain'
        },
        contactInfo: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            paddingHorizontal: getResponsiveDimension(10),
            flexWrap: 'wrap',
        },
        infoItem: {
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: getResponsiveDimension(10),
        },
        infoImageContainer: {
            backgroundColor: COLORS.PRIMARY_BLUE,
            padding: getResponsiveDimension(10),
            borderRadius: getResponsiveDimension(10),
            marginRight: getResponsiveDimension(10)
        },
        icon: {
            width: getResponsiveWidth(25,15),
            height: getResponsiveHeight(25,15),
            resizeMode: 'center',
            marginHorizontal: 5
        },
        infoText: {
            fontSize: getResponsiveFontSize(25, 8),
            color: COLORS.BLACK,
            fontFamily: 'AlegreyaSans-Regular'
        },
        navBar: {
            backgroundColor: COLORS.PRIMARY_BLUE,
            paddingVertical: 6,
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.2,
            shadowRadius: 6,
            elevation: 5
        },
        button: {
            backgroundColor: COLORS.PRIMARY,
            borderRadius: 25,
            paddingVertical: 10,
            paddingHorizontal: 15,
            marginLeft: getResponsiveDimension(10),
            height: getResponsiveDimension(35,30)
        },
        buttonTitle: {
            fontSize: getResponsiveFontSize(16,10),
        },
        navLinks: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            width: '100%',
            paddingHorizontal: getResponsiveDimension(10),
        },
        navButton: {
            marginHorizontal: getResponsiveDimension(5),
            padding: 10,
            borderRadius: 5,
        },
        navText: {
            color: COLORS.WHITE,
            fontSize: getResponsiveFontSize(16,10),
            fontWeight: 'bold',
        },
        activeNavButton: {
            borderBottomWidth: 2,
            borderTopWidth: 1,
            borderBottomColor: COLORS.BLACK,
            borderTopColor: COLORS.PRIMARY_LIGHT_EXTRA,
        },
        hoveredNavButton: {
            backgroundColor: COLORS.OCEAN_TEAL,
        },
        searchContainer: {
            width: getResponsiveDimension(200, 150),
            maxWidth: 300,
            marginHorizontal: getResponsiveDimension(10),
        },
        searchBar: {
            backgroundColor: 'transparent',
            borderBottomWidth: 0,
            borderTopWidth: 0,
        },
        inputContainer: {
            backgroundColor: COLORS.WHITE,
            borderRadius: 20,
            height: getResponsiveDimension(10),
            paddingStart: 5,
        },
        input: {
            fontSize: getResponsiveFontSize(14,10),
            color: COLORS.BLUE,
        },
    });

export { CustomHeader }