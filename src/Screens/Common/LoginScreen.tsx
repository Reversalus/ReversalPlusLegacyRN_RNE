import React, {useState, useMemo, useRef} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import {Input, Button, Text, Image} from '@rneui/themed';
import CommonHeader from '../../CommonComponents/CommonHeader';
import {COLORS, ImgUrl} from '../../Constants';
import {useFirebaseGoogleLogin} from '../../Hooks/useFirebaseGoogleLogin';
import {useDialog} from '../../CommonComponents/AlertDialogue';
import useResponsiveDimensions from '../../Hooks/useResponsiveDimensions';
import AsyncStorageUtils from '../../Utils/AsyncStorageUtils';
import CommonBS from '../../CommonComponents/CommonBS';
import CountryCodeList from '../../Constants/StaticDataObjects/CountryCodeList';

const LoginScreen = ({navigation}) => {
  const countries = useMemo(() => {
    return CountryCodeList;
  }, []);
  const [username, setUsername] = useState('');
  const [country, setCountry] = useState(countries[0]);
  const [showCountryCodeBottomSheet, setshowCountryCodeBottomSheet] =
    useState(false);
  const [isLoginPressed, setIsLoginPressed] = useState(false);
  const {showToast} = useDialog();
  const {
    getResponsiveDimension,
    getResponsiveHeight,
    getResponsiveWidth,
    isWeb,
  } = useResponsiveDimensions();
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const debounceRef = useRef(0);

  const {onGoogleButtonPress, isSignedIn, currentUser} = useFirebaseGoogleLogin(
    {
      onSignInSuccess: () =>
        showToast({
          message: 'Successfully Signin from Google',
          type: 'success',
        }),
    },
  );

  const styles = useMemo(
    () =>
      generateStyles({
        getResponsiveDimension,
        getResponsiveHeight,
        getResponsiveWidth,
        isWeb,
      }),
    [getResponsiveDimension, getResponsiveHeight, getResponsiveWidth, isWeb],
  );

  const handleOpenModal = () => setshowCountryCodeBottomSheet(true);
  const handleCloseModal = () => setshowCountryCodeBottomSheet(false);

  const renderCountryList = () =>
    countries.map(item => (
      <TouchableOpacity
        key={item.cca2}
        onPress={() => {
          setCountry(item);
          handleCloseModal();
        }}>
        <View style={styles.modalItem}>
          <Text style={styles.modalText}>
            {item.flag} {item.name} (+{item.callingCode[0]})
          </Text>
        </View>
      </TouchableOpacity>
    ));

  const shake = () => {
    shakeAnim.setValue(0);
    Animated.sequence([
      Animated.timing(shakeAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: -1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleLogin = async () => {
    const currentTime = Date.now();
    if (currentTime - debounceRef.current < 2000) return;
    debounceRef.current = currentTime;
    setIsLoginPressed(true);

    if (!username) {
      shake();
      showToast({
        message: 'Please enter Phone No. or Sign In with Google',
        type: 'failure',
      });
      return;
    }
    if (username.length < 10) {
      shake();
      showToast({
        message:
          'Phone no. length is <10 Please Valid Phone No. or Sign In with Google',
        type: 'failure',
      });
      return;
    }
    try {
      await AsyncStorageUtils.saveData(
        '@user_info',
        JSON.stringify({username}),
      );
      showToast({message: `Welcome, ${username}!`, type: 'success'});
      navigation.navigate('Dashboard');
    } catch (error) {
      showToast({message: 'Login failed. Please try again.', type: 'failure'});
    }
  };

  const handleGoogleLogin = () => {
    const currentTime = Date.now();
    if (currentTime - debounceRef.current < 2000) return;
    debounceRef.current = currentTime;
    onGoogleButtonPress();
  };

  const shakeInterpolate = shakeAnim.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [-10, 0, 10],
  });

  const animatedStyle = {
    transform: [{translateX: shakeInterpolate}],
  };

  return (
    <View style={styles.screen}>
      {!isWeb && (
        <CommonHeader
          backGroundColor={COLORS.WHITE}
          roundedIconBGColor={COLORS.PRIMARY_DARK}
          statusBarColor={COLORS.SHADE_WHITE}
        />
      )}
      <View style={isWeb ? styles.contentContainerWeb : styles.contentContainer}>
        <View style={styles.formContainer}>
          <Text h3 style={styles.title}>
            Lets Get Start!
          </Text>
          <Image
            source={{uri: ImgUrl.LOGIN_IMG}}
            style={styles.imgView}
            resizeMode="contain"
            accessible={true}
            accessibilityLabel="Reversal Logo"
          />
          <Text style={styles.discription}>
            Reversal Plus is a healthcare smart solution, thanks for choosing us
            as your Health Care Buddy
          </Text>
          <View style={styles.countryCodeContainer}>
            <TouchableOpacity
              onPress={handleOpenModal}
              style={styles.countrySelector}>
              <Text style={styles.flagText}>{country.flag}</Text>
              <Text style={styles.callingCodeText}>
                +{country.callingCode[0]}
              </Text>
            </TouchableOpacity>
            <Animated.View style={[styles.inputContainer, animatedStyle]}>
              <Input
                placeholder="Mobile No. XXXXXXXXXX"
                value={username}
                onChangeText={setUsername}
                inputStyle={{
                  color:
                    isLoginPressed && username.length < 10
                      ? COLORS.CRIMSRON_RED_PINK
                      : 'black',
                  fontWeight: 'bold',
                  fontSize: getResponsiveDimension(15, 12),
                }}
                placeholderTextColor={
                  isLoginPressed && !username
                    ? COLORS.CRIMSRON_RED_PINK
                    : 'gray'
                }
                keyboardType="phone-pad"
                maxLength={10}
              />
            </Animated.View>
          </View>
        </View>
        <View>
          <View style={styles.footerbutton}>
            <Button
              title="Get Start With OTP"
              onPress={handleLogin}
              buttonStyle={styles.button}
              titleStyle={styles.buttonTitle}
            />
            <Button
              title="Sign in with Google"
              onPress={handleGoogleLogin}
              buttonStyle={[styles.button, styles.googleButton]}
              titleStyle={styles.buttonTitle}
            />
          </View>
          <Text style={styles.termsText}>
            By continuing, I accept the
            <Text style={styles.linkText}> Terms of Service</Text> and
            <Text style={styles.linkText}> Privacy Policy</Text>.
          </Text>
        </View>
      </View>
      <CommonBS
        isVisible={showCountryCodeBottomSheet}
        onClose={handleCloseModal}
        children={renderCountryList()}
        showCrossIcon={true}
        onCrossIcon={handleCloseModal}
        headerText="Select Country"
        height={500}
      />
    </View>
  );
};

const generateStyles = ({
  getResponsiveDimension,
  getResponsiveHeight,
  getResponsiveWidth,
  isWeb,
}: any) =>
  StyleSheet.create({
    screen: {
      backgroundColor: COLORS.SHADE_WHITE,
      flex: 1,
    },
    contentContainerWeb: {
      backgroundColor: COLORS.WHITE,
      width: getResponsiveDimension(500,300),
      height: getResponsiveDimension(600,350),
      alignSelf: 'center',
      justifyContent: 'center',
      padding: getResponsiveDimension(20,10),
      marginTop: getResponsiveDimension(100)
    },
    contentContainer: {
      flex: 1,
      width: '95%',
      alignSelf: 'center',
      justifyContent: 'space-between',
      paddingBottom: getResponsiveDimension(20),
    },
    formContainer: {
      padding: getResponsiveDimension(15, 10),
      borderRadius: getResponsiveDimension(10),
      elevation: 5,
    },
    title: {
      color: COLORS.BLACK,
      fontWeight: 'bold',
      fontFamily: 'AlegreyaSans-Regular',
    },
    imgView: {
      width: getResponsiveWidth(180, 150),
      height: getResponsiveHeight(150, 100),
      marginStart: -35,
      resizeMode: 'stretch',
    },
    discription: {
      marginBottom: getResponsiveDimension(20),
      color: COLORS.BLACK,
      fontFamily: 'AlegreyaSans-Regular',
      fontSize: getResponsiveDimension(15, 10),
    },
    countryCodeContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    countrySelector: {
      flexDirection: 'row',
      backgroundColor: '#F5F5F5',
      alignSelf: 'center',
      padding: getResponsiveDimension(5),
    },
    flagText: {
      fontSize: getResponsiveDimension(20, 15),
      marginRight: getResponsiveDimension(5),
    },
    callingCodeText: {
      fontSize: getResponsiveDimension(16, 14),
      fontWeight: 'bold',
    },
    inputContainer: {
      flex: 1,
      marginTop: getResponsiveHeight(18),
    },
    footerbutton: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
    button: {
      borderRadius: getResponsiveDimension(10),
      backgroundColor: '#218B82',
      flexDirection: 'row',
      padding: getResponsiveDimension(12, 10),
    },
    googleButton: {
      backgroundColor: COLORS.CRIMSRON_RED_PINK,
    },
    buttonTitle: {
      fontSize: getResponsiveDimension(15, 10),
    },
    termsText: {
      marginTop: getResponsiveDimension(10),
      textAlign: 'center',
      color: 'gray',
      fontSize: getResponsiveDimension(10, 8),
    },
    linkText: {
      color: COLORS.PRIMARY_DARK,
      fontWeight: 'bold',
    },
    modalItem: {
      padding: getResponsiveDimension(10),
      marginBottom: getResponsiveDimension(5),
    },
    modalText: {
      fontSize: getResponsiveDimension(18),
    },
  });

export default LoginScreen;