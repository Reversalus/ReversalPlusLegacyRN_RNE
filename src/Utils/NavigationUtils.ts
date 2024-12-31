/**
 * @file NavigationUtils.ts
 *
 * This file contains utility functions for handling deep links and navigation
 * within the React Native app. It supports both mobile (Android/iOS) and web platforms.
 * The utilities enable navigation based on deep links, including navigating to specific
 * screens, handling custom parameters, and updating browser history for React Native Web.
 *
 * Key Features:
 * - Provides methods to parse deep link URLs (e.g., `reversalplus://ScreenName=login&Params={}`).
 * - Allows navigation with `push`, `replace`, or `navigate` methods.
 * - Supports browser history management for web, allowing navigation via forward/backward buttons.
 * - Handles error cases, including invalid URLs or missing screen names, to ensure the app doesn’t crash.
 *
 * Dependencies:
 * - `Linking`: React Native's API for handling deep links (for both mobile and web).
 * - `Platform`: React Native's API to differentiate behavior for Android, iOS, and Web.
 *
 * @author [Your Name]
 * @version 1.0.0
 */

import { Linking, Platform } from 'react-native';
import { NavigationContainerRef } from '@react-navigation/native';

let navigationRef: NavigationContainerRef<any> | null = null;

/**
 * Sets the navigation reference for the app.
 * This function is called during the initial app load to reference the navigation container.
 * It allows for deep link handling to work correctly.
 *
 * @param ref - The reference to the NavigationContainer component
 */
export const setNavigationRef = (ref: NavigationContainerRef<any>) => {
    navigationRef = ref;
};

/**
 * Parses a deep link URL into a screen name and parameters.
 * The URL format is expected to be:
 *   reversalplus://ScreenName=screen&Params={"key":"value"}.
 *
 * This function splits the URL and extracts the screen name and associated parameters.
 * If the URL is invalid or the screen name is missing, it returns null.
 *
 * @param url - The deep link URL to be parsed
 * @returns { screenName: string | null, params: any } - Parsed screen name and parameters, or null if invalid
 */
const parseDeepLink = (url: string) => {
    if (!url) {
        console.error('Received empty URL');
        return null;
    }

    try {
        const [scheme, rest] = url.split('://');
        if (!rest) {
            throw new Error('Invalid deep link format');
        }

        const [screenPart, paramPart] = rest.split('&Params=');
        const screenNameMatch = screenPart.match(/ScreenName=([^&]+)/);
        const screenName = screenNameMatch ? screenNameMatch[1] : null;
        const params = paramPart ? JSON.parse(decodeURIComponent(paramPart)) : {};

        if (!screenName) {
            throw new Error('Screen name is missing in the deep link');
        }

        return { screenName, params };
    } catch (error) {
        console.error('Error parsing deep link:', error);
        return null;
    }
};

/**
 * Navigates to a screen based on the deep link URL and the navigation method.
 * The method can be one of 'push', 'replace', or 'navigate'.
 * - 'push' adds a new screen to the navigation stack.
 * - 'replace' resets the navigation state with a new screen.
 * - 'navigate' simply navigates to the target screen.
 *
 * This function handles browser history (for web) and navigation (for mobile).
 * It ensures the URL is parsed and navigated accordingly, and the browser history is updated
 * when running on the web platform.
 *
 * @param url - The deep link URL to navigate to
 * @param params - Optional parameters to pass to the screen
 * @param method - The navigation method: 'push', 'replace', or 'navigate' (default: 'navigate')
 */
const navigateToScreen = (url: string, params?: any, method: 'push' | 'replace' | 'navigate' = 'navigate') => {
    if (!navigationRef) {
        console.warn('Navigation reference is not set.');
        return;
    }

    if (!url) {
        console.error('Navigation URL is empty or undefined.');
        return;
    }

    const parsed = parseDeepLink(url);
    if (!parsed || !parsed.screenName) {
        console.error('Invalid deep link:', url);
        return;
    }

    const { screenName, params: deepLinkParams } = parsed;
    const finalParams = { ...deepLinkParams, ...params };

    if (Platform.OS === 'web') {
        const path = `/${screenName}`;
        try {
            if (method === 'replace') {
                window.history.replaceState({ url: path }, '', path);  // Update history on replace
            } else if (method === 'push') {
                window.history.pushState({ url: path }, '', path);     // Update history on push
            }
        } catch (error) {
            console.error('Error updating browser history:', error);
        }
    }

    // Navigate based on method
    if (method === 'push' || method === 'navigate') {
        navigationRef.navigate(screenName, finalParams);
    } else if (method === 'replace') {
        navigationRef.reset({
            index: 0,
            routes: [{ name: screenName, params: finalParams }],
        });
    }
};

// Exposed API for deep link navigation
const handleDeepLinkNavigation = {
    push: (url: string, params?: any) => navigateToScreen(url, params, 'push'),
    replace: (url: string, params?: any) => navigateToScreen(url, params, 'replace'),
    navigate: (url: string, params?: any) => navigateToScreen(url, params, 'navigate'),
};

export { handleDeepLinkNavigation };
