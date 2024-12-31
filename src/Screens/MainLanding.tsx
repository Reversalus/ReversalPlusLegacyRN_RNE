import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { handleDeepLinkNavigation } from '../Utils/NavigationUtils.ts';
import {DeepLinks} from "../Constants/Deeplinks.ts";

const MainLanding = ({ navigation }: { navigation: any }) => {
    const handleGoToDashboard = () => {
        // Navigate to DashboardScreen using its deep link
        handleDeepLinkNavigation.replace(DeepLinks.INTRO);
    };

    return (
        <View style={styles.container}>
            <Text>Dashboard Screen</Text>
            <Button title="Go to Dashboard" onPress={handleGoToDashboard} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default MainLanding;
