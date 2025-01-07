import React, { useState, useCallback } from "react";
import { Image, View, StyleSheet, Dimensions, Pressable } from "react-native";
import { Header, SearchBar, Text, Button, Icon } from "@rneui/themed";
import { COLORS } from "../../../Constants";
import { CustomHeaderProps, InfoItemProps, NavButtonProps } from "./type.ts";
import { GetStartedIntroModalWeb } from '../../Web';
// Get device dimensions
const { width: SCREEN_WIDTH } = Dimensions.get("window");

// CustomHeader Component
const CustomHeader: React.FC<CustomHeaderProps> = ({ onNavigate, currentSection }) => {
    const [search, setSearch] = useState<string>("");
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const [isModalVisible, setModalVisible] = useState(false);

    const openModal = () => setModalVisible(true);
    const closeModal = () => setModalVisible(false);

    // Navigation Button Component
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

    // Info Item Component to display contact information
    const InfoItem: React.FC<InfoItemProps> = ({ iconUri, text }) => (
        <View style={styles.infoItem}>
            <Image source={{ uri: iconUri }} style={styles.icon} />
            <Text style={styles.infoText}>{text}</Text>
        </View>
    );

    // Renders the contact information items
    const renderContactInfo = useCallback(() => {
        const contactItems = [
            { iconUri: 'https://raw.githubusercontent.com/Reversalus/Assets/main/Images/logo/mail_new.png', text: '+91 800 123 456' },
            { iconUri: 'https://raw.githubusercontent.com/Reversalus/Assets/main/Images/logo/clock.png', text: 'info@Lifecare.com' },
            { iconUri: 'https://raw.githubusercontent.com/Reversalus/Assets/main/Images/logo/telephone.png', text: 'Daily: 7:00am - 8:00pm' },
        ];

        return contactItems.map((item, index) => (
            <InfoItem key={index} iconUri={item.iconUri} text={item.text} />
        ));
    }, []);

    // Renders the navigation links
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
            {/* Top Bar with Logo and Contact Information */}
            <Header containerStyle={styles.topBar}
                centerComponent={
                    <View style={styles.contactInfo}>
                        <Image
                            source={{ uri: 'https://raw.githubusercontent.com/Reversalus/Assets/main/Images/logo/reversal_long_logo.png' }}
                            style={styles.logo}
                        />
                        {renderContactInfo()}
                    </View>
                }
            />

            {/* Navigation Bar with Links and Search Bar */}
            <Header containerStyle={styles.navBar}
                centerComponent={
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
                                searchIcon={{ type: 'font-awesome', name: 'search', color: COLORS.GREEN, size: 20 }}
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
                }
            />
            <GetStartedIntroModalWeb isVisible={isModalVisible} onClose={closeModal} />
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    stickyHeaderContainer: {
        position: 'sticky',
        top: 0,
        zIndex: 1000,
    },
    topBar: {
        backgroundColor: COLORS.WHITE,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    logo: {
        width: SCREEN_WIDTH > 768 ? 300 : 150,
        height: 50,
        resizeMode: 'contain',
        marginBottom: 10,
    },
    contactInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'center', // Center items when wrapping
        width: '120%', // Ensure it adapts to the available space
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: SCREEN_WIDTH > 768 ? 15 : 5, // Adjust spacing for larger screens
        marginVertical: 5,
    },
    icon: {
        marginHorizontal: 5,
        width: SCREEN_WIDTH > 768 ? 40 : 25, // Adjust size for larger screens
        height: SCREEN_WIDTH > 768 ? 40 : 25,
    },
    infoText: {
        fontSize: SCREEN_WIDTH > 768 ? 18 : 12, // Adjust font size based on screen width
        color: COLORS.PRIMARY,
        fontWeight: '500',
    },
    navBar: {
        backgroundColor: COLORS.PRIMARY_DARK_EXTRA,
        paddingVertical: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
    },
    button: {
        backgroundColor: COLORS.PINK_DARK,
        borderRadius: 25,
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    buttonTitle: {
        fontSize: 16
    },
    navLinks: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        flex: 1
    },
    navButton: {
        marginHorizontal: 10,
        padding: 10,
        borderRadius: 5, // Optional, for better visuals
    },
    navText: {
        color: COLORS.WHITE,
        fontSize: SCREEN_WIDTH > 768 ? 18 : 14,
        fontWeight: 'bold',
    },
    activeNavButton: {
        borderBottomWidth: 5,
        borderBottomColor: COLORS.OCEAN_TEAL,
    },
    hoveredNavButton: {
        backgroundColor: COLORS.OCEAN_TEAL, // Change to your desired hover color
    },
    searchContainer: {
        width: 200,
        maxWidth: '100%',
        marginHorizontal: 10,
    },
    searchBar: {
        backgroundColor: 'transparent',
        borderTopWidth: 0,
        borderBottomWidth: 0,
        flex: 1,
    },
    inputContainer: {
        backgroundColor: COLORS.WHITE,
        borderRadius: 20,
        height: 40,
        paddingHorizontal: 10,
    },
    input: {
        fontSize: SCREEN_WIDTH > 768 ? 16 : 14,
        color: COLORS.BLUE,
    },
});

export { CustomHeader };