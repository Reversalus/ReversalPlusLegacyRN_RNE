import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Animated } from 'react-native';
import { handleDeepLinkNavigation } from "../../Utils/NavigationUtils.ts";
import { DeepLinks } from "../../Constants/Deeplinks.ts";

// Social media links for the "Follow Us" section
const socialLinks = {
    whatsapp: 'https://wa.me/your-number', // replace with your number
    instagram: 'https://instagram.com/your-profile', // replace with your profile
    twitter: 'https://twitter.com/your-profile', // replace with your profile
    facebook: 'https://facebook.com/your-profile', // replace with your profile
};

const IntroScreenWeb = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [fadeAnim] = useState(new Animated.Value(0)); // Animation for fade effect

    // Data for Carousel slides
    const slides = [
        {
            title: 'What is Diabetes Reversal?',
            description: 'Diabetes reversal (remission) means achieving an HbA1c level less than 6.5% without medication.',
            icon: '🔬', // Icon for the slide
        },
        {
            title: 'Can Everyone Reverse Their Diabetes?',
            description: 'With focused effort and the right mindset, many can reduce or eliminate their need for diabetes medication.',
            icon: '💪', // Icon for the slide
        },
        {
            title: 'Fitterfly Reversal Test',
            description: 'Take the Fitterfly test to assess your chances of diabetes reversal based on health parameters.',
            icon: '📊', // Icon for the slide
        },
    ];

    // Auto-change slide every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 5000);

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    // Trigger animation when the slide changes
    const animateSlideChange = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start(() => {
            setTimeout(() => {
                setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
                fadeAnim.setValue(0); // Reset animation value
            }, 400);
        });
    };

    const handleGetStarted = () => {
        console.log('Navigating to login screen...');
        handleDeepLinkNavigation.navigate(DeepLinks.LOGIN);
    };

    // Open social media links
    const openSocialLink = (url: string) => {
        Linking.openURL(url);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>HealthCare Reversal</Text>
                <View style={styles.socialIcons}>
                    <TouchableOpacity onPress={() => openSocialLink(socialLinks.whatsapp)}>
                        <Text style={styles.icon}>📱</Text> {/* Replace with WhatsApp icon */}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => openSocialLink(socialLinks.instagram)}>
                        <Text style={styles.icon}>📷</Text> {/* Replace with Instagram icon */}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => openSocialLink(socialLinks.twitter)}>
                        <Text style={styles.icon}>🐦</Text> {/* Replace with Twitter icon */}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => openSocialLink(socialLinks.facebook)}>
                        <Text style={styles.icon}>📘</Text> {/* Replace with Facebook icon */}
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.carouselContainer}>
                <Text style={styles.carouselTitle}>Introduction to HealthCare Reversal</Text>

                {/* Animated Carousel with Card */}
                <Animated.View style={[styles.carouselCard, { opacity: fadeAnim }]}>
                    <Text style={styles.slideIcon}>{slides[currentSlide].icon}</Text>
                    <Text style={styles.slideTitle}>{slides[currentSlide].title}</Text>
                    <Text style={styles.slideDescription}>{slides[currentSlide].description}</Text>
                </Animated.View>

                {/* Carousel Controls */}
                <View style={styles.carouselControls}>
                    <TouchableOpacity
                        onPress={() => animateSlideChange()}
                        style={styles.carouselButton}>
                        <Text style={styles.carouselButtonText}>Next</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* More details about Diabetes Reversal */}
            <View style={styles.content}>
                <Text style={styles.sectionTitle}>What is Diabetes Reversal?</Text>
                <Text style={styles.sectionDescription}>
                    For a person with diabetes, diabetes reversal (scientifically known as diabetes remission) is defined as having their HbA1c less than 6.5% (i.e. in the prediabetes stage) without any medications and/or insulin for more than 6 months.
                </Text>

                <Text style={styles.sectionTitle}>Can Everyone Reverse Their Diabetes?</Text>
                <Text style={styles.sectionDescription}>
                    Whether you’ve been taking diabetes medicines for a while now or have just been diagnosed, reducing or avoiding medicines may be a goal which you’ve set for yourself.
                    Yes, it is possible with some focused efforts and the right mindset.
                    A better understanding of the science behind diabetes reversal coupled with personalized therapies and expert coaching can help achieve these goals.
                </Text>

                <Text style={styles.sectionDescription}>
                    This questionnaire has been designed by top doctors and experts to find what would be possible for you in terms of diabetes reversal. What’s more important is that you’ll be able to reduce the symptoms, the risk of complications, your medical costs and more.
                </Text>

                <Text style={styles.sectionTitle}>To know your chances of Diabetes Reversal, take the Fitterfly Reversal Test</Text>
                <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
                    <Text style={styles.buttonText}>CHECK NOW</Text>
                </TouchableOpacity>

                <Text style={styles.sectionTitle}>About the Fitterfly Reversal Test</Text>
                <Text style={styles.sectionDescription}>
                    Designed by the diabetes management experts at Fitterfly, the calculator assesses your chance of reversing diabetes by taking into consideration your age, gender, BMI, duration of diabetes, current medication, family history of diabetes and other health conditions. The higher the score is, the better your chances of reversal.
                </Text>

                {/* Placeholder for other conditions */}
                <Text style={styles.sectionTitle}>Reversal for Other Conditions</Text>
                <Text style={styles.sectionDescription}>
                    Besides diabetes, this platform offers solutions for reversal of various other chronic conditions including:
                </Text>
                <Text style={styles.sectionDescription}>- Thyroid Reversal</Text>
                <Text style={styles.sectionDescription}>- Blood Pressure (BP) Reversal</Text>
                <Text style={styles.sectionDescription}>- Cardiac Reversal</Text>
                <Text style={styles.sectionDescription}>- Super Reversal (General Wellness)</Text>

                {/* Get Started Button */}
                <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
                    <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        padding: 16,
    },
    header: {
        width: '100%',
        padding: 16,
        backgroundColor: '#007BFF',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    socialIcons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    icon: {
        fontSize: 24,
        marginHorizontal: 8,
        color: '#fff',
    },
    carouselContainer: {
        width: '100%',
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginVertical: 16,
        elevation: 5,
    },
    carouselTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#007BFF',
        marginBottom: 8,
        textAlign: 'center',
    },
    carouselCard: {
        alignItems: 'center',
        padding: 24,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 5,
        marginBottom: 16,
    },
    slideIcon: {
        fontSize: 48,
        marginBottom: 16,
    },
    slideTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#007BFF',
        marginBottom: 8,
    },
    slideDescription: {
        fontSize: 16,
        color: '#555',
        textAlign: 'center',
        lineHeight: 24,
    },
    carouselControls: {
        alignItems: 'center',
    },
    carouselButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        paddingHorizontal: 24,
        borderRadius: 4,
        marginTop: 16,
    },
    carouselButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    content: {
        width: '100%',
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginTop: 16,
        elevation: 5,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#007BFF',
        marginBottom: 8,
    },
    sectionDescription: {
        fontSize: 16,
        color: '#555',
        marginBottom: 16,
        lineHeight: 24,
    },
    button: {
        backgroundColor: '#007BFF',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 4,
        marginTop: 16,
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default IntroScreenWeb;