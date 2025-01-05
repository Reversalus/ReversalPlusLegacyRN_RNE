/**
 * @file App.tsx
 *
 * This is the main entry point of the application, responsible for setting up navigation
 * across different screens and handling deep links for both React Native (Android/iOS)
 * and React Native Web. This file integrates the navigation configuration and manages
 * the initial deep link navigation process.
 *
 * Key Features:
 * - Sets up React Navigation with a stack navigator and deep link support.
 * - Handles deep link navigation via `Linking` for mobile platforms and browser history
 *   on the web.
 * - Clears browser history on initial load to prevent stale or incorrect navigation history.
 * - Listens to changes in the browser's back/forward buttons and adjusts screen navigation accordingly.
 *
 * Dependencies:
 * - React Navigation: for managing screen navigation.
 * - `Linking`: React Native's API to handle deep links.
 * - `Platform`: React Native's API to detect platform-specific behavior (iOS, Android, Web).
 *
 * Screens:
 * - IntroScreen
 * - LoginScreen
 * - MainLanding (Dashboard)
 *
 * @author [Your Name]
 * @version 1.0.0
 */

import React, { useRef, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Linking, Platform } from 'react-native';
import { setNavigationRef, handleDeepLinkNavigation } from './src/Utils/NavigationUtils';
import IntroScreen from './src/Screens/IntroScreen';
import LoginScreen from './src/Screens/LoginScreen';
import MainLanding from "./src/Screens/MainLanding";

// Create a Stack Navigator to manage the app's screens.
const Stack = createStackNavigator();

// Linking configuration to handle deep links for both mobile and web
const linkingConfig = {
    prefixes: ['reversalplus://', 'http://localhost:8080'],
    config: {
        screens: {
            Intro: 'intro',
            Login: 'login',
            Dashboard: 'dashboard'
        },
    },
};

/**
 * App component serves as the main entry point for the application.
 * It sets up navigation, handles deep link routing, and listens to browser history events.
 */
const App = () => {
    const navigationRef = useRef<any>(null);
    const [isNavigationReady, setIsNavigationReady] = useState(false);  // New state to track navigation readiness

    useEffect(() => {
        // Set the navigation reference for deep link handling
        setNavigationRef(navigationRef.current);

        // Clear browser history on first load to avoid stale history states in web
        if (Platform.OS === 'web') {
            window.history.replaceState({}, ''); // Replaces the current history entry
        }

        // Handle the initial deep link (either from a mobile deep link or the browser)
        const handleInitialDeepLink = async () => {
            const url = Platform.OS === 'web' ? window.location.href : await Linking.getInitialURL();
            if (url && isNavigationReady) {
                handleDeepLinkNavigation.navigate(url);
            }
        };

        // Handle the initial deep link (i.e., when the app is launched directly from a link)
        handleInitialDeepLink();

        // Set up a listener for deep link events when the URL changes (back/forward navigation in web)
        const listener = Linking.addEventListener('url', (event) => {
            if (event.url && isNavigationReady) {
                handleDeepLinkNavigation.navigate(event.url);
            }
        });

        // Handle browser back/forward navigation for Web (only for web)
        if (Platform.OS === 'web') {
            const handlePopState = (event: PopStateEvent) => {
                if (event.state && isNavigationReady) {
                    const { url } = event.state;
                    handleDeepLinkNavigation.push(url);  // Navigate based on the current history state
                }
            };
            window.addEventListener('popstate', handlePopState);

            return () => {
                window.removeEventListener('popstate', handlePopState);
                listener.remove();
            };
        } else {
            return () => {
                listener.remove();
            };
        }
    }, [isNavigationReady]);

    function onNavigationReady() {
        setIsNavigationReady(true);
    }

    return (
        <NavigationContainer
            ref={navigationRef}
            linking={linkingConfig}
            onReady={onNavigationReady} // Mark navigation as ready when the container is ready
        >
            <Stack.Navigator initialRouteName="intro" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="intro" component={IntroScreen} />
                <Stack.Screen name="login" component={LoginScreen} />
                <Stack.Screen name="dashboard" component={MainLanding} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
