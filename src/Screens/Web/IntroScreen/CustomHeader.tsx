import React, { useState } from "react";
import { Image, View, StyleSheet } from "react-native";
import { Header, SearchBar, Button, Text } from "@rneui/themed";
import { COLORS } from "../../../Constants";
import { CustomHeaderProps, InfoItemProps, NavButtonProps } from "./type.ts";

/**
 * CustomHeader Component
 * This component comprises a sticky header with navigation and contact information sections.
 * @param {CustomHeaderProps} props - The properties for the custom header.
 */
const CustomHeader: React.FC<CustomHeaderProps> = ({ onNavigate, currentSection }) => {
    const [search, setSearch] = useState<string>("");

    // Navigation Button Component
    const NavButton: React.FC<NavButtonProps> = ({ title, isActive, onPress }) => (
        <Button
            title={title}
            type="clear"
            titleStyle={isActive ? styles.activeNavItem : styles.navItem}
            onPress={onPress}
        />
    );

    // Info Item Component to display contact information with icons
    const InfoItem: React.FC<InfoItemProps> = ({ iconUri, text }) => (
        <View style={styles.infoItem}>
            <Image source={{ uri: iconUri }} style={styles.icon} />
            <Text style={styles.infoText}>{text}</Text>
        </View>
    );

    // Renders the contact information items
    const renderContactInfo = () => {
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
    };

    // Renders the navigation links
    const renderNavLinks = () => {
        const navItems = [
            { title: "Home", index: 0 },
            { title: "About Us", index: 1 },
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
    };

    return (
        <View style={styles.stickyHeaderContainer}>
            {/* Top Bar with Logo and Contact Information */}
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

            {/* Navigation Bar with Links and Search Bar */}
            <Header containerStyle={styles.navBar}
                    centerComponent={
                        <View style={styles.navLinks}>
                            {renderNavLinks()}
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

// Styles
const styles = StyleSheet.create({
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
    }
});

export { CustomHeader };
