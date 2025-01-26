import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Header, Icon, Text, Button } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../Constants/StylingConstant';
import { ScaleSize } from '../Utils/GenericUtils';

interface CommonHeaderProps {
    title?: string; // Nullable
    leftText?: string; // Nullable
    rightIcon?: string; // Nullable
    rightText?: string; // Nullable
    onRightPress?: () => void; // Nullable
    backGroundColor?: string;
    roundedIconBGColor?: string;
    statusBarColor?: string
}

const CommonHeader: React.FC<CommonHeaderProps> = ({
    title = '',
    leftText,
    rightIcon,
    rightText,
    onRightPress,
    backGroundColor,
    roundedIconBGColor,
    statusBarColor
}) => {
    const navigation = useNavigation();

    return (
        <Header
            leftComponent={
                leftText ? (
                    <Button
                        type="clear"
                        title={leftText}
                        onPress={() => navigation.goBack()}
                    />
                ) : (
                    <Icon
                        name="arrow-back"
                        type="material"
                        color="white"
                        onPress={() => navigation.goBack()}
                        containerStyle={{
                            ...styles.roundedIcon,
                            backgroundColor: roundedIconBGColor ?? COLORS.PRIMARY_BLUE,
                        }}
                    />
                )
            }
            centerComponent={
                <View style={styles.centerView}>
                    <Text style={styles.title}>{title}</Text>
                </View>
            }
            rightComponent={
                rightIcon ? (
                    <Icon
                        name={rightIcon}
                        type="material"
                        color={COLORS.PRIMARY_BLUE}
                        onPress={onRightPress}
                        containerStyle={styles.iconContainer}
                    />
                ) : rightText ? (
                    <Button
                        type="clear"
                        title={rightText}
                        onPress={onRightPress}
                    />
                ) : null
            }
            containerStyle={{
                ...styles.header, // Spread existing styles
                backgroundColor: backGroundColor ?? COLORS.WHITE, // Conditionally set background color
            }}
            placement="center" // Keeps everything centered
            statusBarProps={{
                animated: true,
                backgroundColor: statusBarColor ?? COLORS.WHITE,
                barStyle: "dark-content", // Or use dark-content based on your theme
                showHideTransition: "fade",
                hidden: false,
            }}
        />
    );
};

const styles = StyleSheet.create({
    header: {
        justifyContent: 'center', // Center all components
        flexDirection: 'row', // Align items horizontally
        alignItems: 'center', // Vertically align the header content
    },
    roundedIcon: {
        borderRadius: ScaleSize(25), // Makes it rounded
        padding: ScaleSize(10), // Adjust the padding for the icon
        elevation: ScaleSize(5), // Elevation for Android
        shadowColor: '#000', // Shadow color for iOS
        shadowOffset: { width: 0, height: 2 }, // Shadow offset
        shadowOpacity: ScaleSize(0.2), // Shadow opacity
        shadowRadius: ScaleSize(3), // Shadow radius
    },
    iconContainer: {
        marginHorizontal: ScaleSize(10),
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        color: COLORS.BLACK,
        fontSize: ScaleSize(18),
        fontWeight: 'bold',
        textAlign: 'center',
    },
    centerView: {
        flex: 1, // Ensure the center content is taking up the available space
        alignItems: 'center', // Center the text horizontally,
        justifyContent: 'center',
    },
});

export default CommonHeader;
