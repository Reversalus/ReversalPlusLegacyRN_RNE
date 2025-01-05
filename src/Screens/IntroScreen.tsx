import React from 'react';
import { Platform } from 'react-native';
import IntroScreenApp from './App/IntroScreen/IntroScreenApp.tsx'; // Mobile intro screen
import IntroScreenWeb from './Web/IntroScreen/IntroScreenWeb.tsx'; // Web intro screen

const IntroScreen: React.FC = () => {
    if (Platform.OS === 'web') {
        return <IntroScreenWeb />;
    } else {
        return <IntroScreenApp />;
    }
};

export default IntroScreen;
