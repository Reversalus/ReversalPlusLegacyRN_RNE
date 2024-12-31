import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import Swiper from 'react-native-swiper';
import { Button, Text, Icon } from '@rneui/themed';
import LottieView from 'lottie-react-native';
import { handleDeepLinkNavigation } from '../../Utils/NavigationUtils.ts';
import { DeepLinks } from '../../Constants/Deeplinks.ts';
import { COLORS } from '../../Constants/StylingConstant';
import ScaleSize from '../../Utils/GenericUtils.ts';
import assest from '../../Constants/GetImageAndLottie.ts';
import CommonHeader from '../../CommonComponents/CommonHeader.tsx';

const { width } = Dimensions.get('window');

const IntroScreenApp = () => {
    const [activePage, setActivePage] = useState(0);

    const pages = [
        {
            title: 'Your Health, Our Priority',
            description: 'We put your well-being first with expert advice and personalized care.',
            animation: assest.LottieUrl.PREVENTIVE_HEALTH_CARE,
        },
        {
            title: 'Track Your Health Journey',
            description: 'Monitor your progress and achieve your wellness goals with ease.',
            animation: assest.LottieUrl.ANALYSIS_DIGITAL_MARKETING,
        },
        {
            title: 'Expert Care Anytime, Anywhere',
            description: 'Get advice from certified professionals without stepping outside your door.',
            animation: assest.LottieUrl.BUSINESS_TEAM,
        },
        {
            title: 'Get Medicines by Experts Recommendation',
            description: 'Get Medicine from certified professionals without stepping outside your door.',
            animation: assest.LottieUrl.ONLINE_DELIVERY_SERVICE_1,
        }
    ];

    const handleNavigation = (link: any) => {
        try {
            handleDeepLinkNavigation.replace(link);
        } catch (error) {
            console.error('Error handling navigation: ', error);
        }
    };

    const renderPagination = () => (
        <View style={styles.paginationContainer}>
            {activePage !== 0 ? (
                <Button
                    title="Previous"
                    type="outline"
                    icon={<Icon name="arrow-back" type="material" size={18} color={COLORS.BLUE} />}
                    iconPosition="left"
                    onPress={() => setActivePage((prev) => Math.max(prev - 1, 0))}
                    buttonStyle={styles.paginationButton}
                    titleStyle={styles.previousButtonText}
                />
            ) : (
                <View style={styles.spacer} />
            )}
            {activePage === pages.length - 1 ? (
                <Button
                    title="Get Started"
                    onPress={() => handleNavigation(DeepLinks.LOGIN)}
                    buttonStyle={styles.getStartedButton}
                    titleStyle={styles.buttonText}
                />
            ) : (
                <Button
                    title="Go Next"
                    icon={<Icon name="arrow-forward" type="material" size={15} color="white" />}
                    iconPosition="right"
                    onPress={() => setActivePage((prev) => Math.min(prev + 1, pages.length - 1))}
                    buttonStyle={styles.nextButton}
                    titleStyle={styles.buttonText}
                />
            )}
        </View>
    );

    return (
        <View style={styles.safeArea}>
            <CommonHeader
                rightText="Skip"
                onRightPress={() => handleNavigation(DeepLinks.LOGIN)}
            />
            <Swiper
                loop={false}
                showsPagination
                onIndexChanged={setActivePage}
                index={activePage}
                autoplay={true}
                autoplayTimeout={5000}
            >
                {pages.map((page, index) => (
                    <View key={index} style={styles.slide}>
                        <View style={styles.contentContainer}>
                            <LottieView
                                source={{ uri: page.animation }}
                                autoPlay
                                loop
                                style={styles.lottieAnimation}
                            />
                            <View style={styles.pagerTextView}>
                                <Text style={[styles.title, { fontSize: ScaleSize(24) }]}>{page.title}</Text>
                                <Text style={[styles.description, { fontSize: ScaleSize(16) }]}>{page.description}</Text>
                            </View>
                        </View>
                    </View>
                ))}
            </Swiper>
            {renderPagination()}
        </View>
    );
};

// -------------Styles------------------------------------------------------------------------------------------------

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    slide: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: ScaleSize(20),
    },
    contentContainer: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flex: 0.75,
    },
    lottieAnimation: {
        width: width * 0.8,
        height: width * 0.8,
    },
    title: {
        fontSize: ScaleSize(24),
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: ScaleSize(20),
    },
    description: {
        fontSize: ScaleSize(16),
        color: 'gray',
        textAlign: 'center',
        marginTop: ScaleSize(10),
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: ScaleSize(20),
        paddingVertical: ScaleSize(15),
    },
    pagerTextView: {},
    spacer: {
        flex: 1,
    },
    paginationButton: {
        borderWidth: 1,
        borderColor: COLORS.PRIMARY_BLUE,
        borderRadius: ScaleSize(20),
        paddingHorizontal: ScaleSize(15),
        paddingVertical: ScaleSize(8),
    },
    getStartedButton: {
        backgroundColor: COLORS.PRIMARY_BLUE,
        borderRadius: ScaleSize(20),
        paddingHorizontal: ScaleSize(12),
        paddingVertical: ScaleSize(8),
    },
    nextButton: {
        backgroundColor: COLORS.PRIMARY_BLUE,
        borderRadius: ScaleSize(20),
        paddingHorizontal: ScaleSize(12),
        paddingVertical: ScaleSize(8),
    },
    buttonText: {
        fontSize: ScaleSize(14),
        fontWeight: '600',
        margin: ScaleSize(2),
    },
    previousButtonText: {
        fontSize: ScaleSize(12),
        fontWeight: '600',
        margin: ScaleSize(2),
        color: COLORS.PRIMARY_BLUE,
    },
    icon: {
        marginHorizontal: ScaleSize(5),
    },
});

export default IntroScreenApp;
