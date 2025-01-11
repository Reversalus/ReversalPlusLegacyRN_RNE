import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, Animated } from 'react-native';
import { Input, Button, Icon, Text, Image } from '@rneui/themed';
import CommonHeader from '../CommonComponents/CommonHeader';
import {ScaleSize, handleDeepLinkNavigation} from '../Utils';
import { COLORS, DeepLinks, ImgUrl } from '../Constants';
import Logo from '../../public/assets';

const LoginScreen = ({ navigation }: any) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setPasswordVisible] = useState(false);

    // Animated values
    const logoPosition = new Animated.Value(0);
    const formOpacity = new Animated.Value(0);

    useEffect(() => {
        Animated.sequence([
            Animated.timing(logoPosition, {
                toValue: -275,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(formOpacity, {
                toValue: 1,
                duration: 750,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const handleLogin = () => {
        if (!username || !password) {
            Alert.alert('Error', 'Please enter both username and password');
            return;
        }
        Alert.alert('Login Success', `Welcome, ${username}!`);

        handleDeepLinkNavigation.navigate(DeepLinks.DASHBOARD)
    };

    const handleSignup = () => navigation.navigate('Signup');
    const handleForgotPassword = () => navigation.navigate('ForgotPassword');

    return (
        <View style={styles.safeArea}>
            <CommonHeader
                backGroundColor={COLORS.SHADE_WHITE}
                roundedIconBGColor={COLORS.PRIMARY_DARK}
            />
            <View style={styles.container}>
                <Animated.View style={[styles.logoContainer, { transform: [{ translateY: logoPosition }] }]}> 
                    <Image
                        source={{ uri: ImgUrl.REVERSAL_LOGO }}
                        style={styles.logo}
                        PlaceholderContent={<Icon name="image" />}
                    />
                </Animated.View>

                <Animated.View style={[styles.formContainer, { opacity: formOpacity }]}> 
                    <Text h3 style={styles.header}>Login</Text>

                    <Input
                        placeholder="Username"
                        leftIcon={{ name: 'person', color: 'black' }} // Set icon color to black
                        value={username}
                        onChangeText={setUsername}
                        inputStyle={styles.inputText} // Ensure text is black
                        placeholderTextColor="rgba(0, 0, 0, 0.5)" // Faded black placeholder text
                    />

                    <Input
                        placeholder="Password"
                        secureTextEntry={!isPasswordVisible}
                        leftIcon={{ name: 'lock', color: 'black' }} // Set icon color to black
                        rightIcon={{
                            name: isPasswordVisible ? 'visibility' : 'visibility-off',
                            color: 'black',
                            onPress: () => setPasswordVisible(!isPasswordVisible)
                        }}
                        value={password}
                        onChangeText={setPassword}
                        inputStyle={styles.inputText} // Ensure text is black
                        placeholderTextColor="rgba(0, 0, 0, 0.5)" // Faded black placeholder text
                    />

                    <Button
                        title="Login"
                        onPress={handleLogin}
                        buttonStyle={styles.button}
                        titleStyle={styles.buttonText} // Make button text bold
                    />

                    <View style={styles.footer}>
                        <Button
                            title="Forgot Password?"
                            type="clear"
                            titleStyle={styles.footerText}
                            onPress={handleForgotPassword}
                        />

                        <Button
                            title="Don't have an account? Sign Up"
                            type="clear"
                            titleStyle={styles.footerText}
                            onPress={handleSignup}
                        />
                    </View>
                </Animated.View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.SHADE_WHITE,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        // 3D effect: shadow for iOS, elevation for Android
        shadowColor: '#000',  // Shadow color for iOS
        shadowOffset: { width: 0, height: 4 },  // Shadow position for iOS
        shadowOpacity: 0.1,  // Shadow opacity for iOS
        shadowRadius: 5,  // Shadow radius for iOS
        elevation: 5,  // Elevation for Android
    },
    logo: {
        width: ScaleSize(150),
        height: ScaleSize(150),
        resizeMode: 'contain',
    },
    formContainer: {
        width: '85%',
        backgroundColor: COLORS.WHITE,
        borderRadius: ScaleSize(10),
        padding: ScaleSize(20),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        // marginTop: ScaleSize(-270),
        marginTop: ScaleSize(-200),
    },
    header: {
        textAlign: 'center',
        marginBottom: ScaleSize(30),
        color: COLORS.BLACK,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: COLORS.PRIMARY_DARK,
        borderRadius: ScaleSize(10),
        marginTop: ScaleSize(10),
    },
    buttonText: {
        fontWeight: 'bold', // Bold text for the button
    },
    inputText: {
        fontSize: ScaleSize(16),
        color: COLORS.BLACK,
    },
    footer: {
        marginTop: ScaleSize(20),
        alignItems: 'center',
    },
    footerText: {
        color: COLORS.PRIMARY_DARK,
        fontSize: ScaleSize(14),
    },
});

export default LoginScreen;
