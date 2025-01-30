import React, {useState, useMemo, useRef} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import {Input, Button, Text, BottomSheet, Image} from '@rneui/themed';
import CommonHeader from '../../CommonComponents/CommonHeader';
import {COLORS, ImgUrl} from '../../Constants';
import {useFirebaseGoogleLogin} from '../../Hooks/useFirebaseGoogleLogin';
import {useDialog} from '../../CommonComponents/AlertDialogue';
import useResponsiveDimensions from '../../Hooks/useResponsiveDimensions';
import AsyncStorageUtils from '../../Utils/AsyncStorageUtils';

const countries = [
  {cca2: 'IN', callingCode: ['91'], flag: '🇮🇳', name: 'India'},
  {cca2: 'AF', callingCode: ['93'], flag: '🇦🇫', name: 'Afghanistan'},
  {cca2: 'AL', callingCode: ['355'], flag: '🇦🇱', name: 'Albania'},
  {cca2: 'DZ', callingCode: ['213'], flag: '🇩🇿', name: 'Algeria'},
  {cca2: 'AS', callingCode: ['1'], flag: '🇦🇸', name: 'American Samoa'},
  {cca2: 'AD', callingCode: ['376'], flag: '🇦🇩', name: 'Andorra'},
  {cca2: 'AO', callingCode: ['244'], flag: '🇦🇴', name: 'Angola'},
  {cca2: 'AI', callingCode: ['1'], flag: '🇦🇮', name: 'Anguilla'},
  {cca2: 'AG', callingCode: ['1'], flag: '🇦🇬', name: 'Antigua and Barbuda'},
  {cca2: 'AR', callingCode: ['54'], flag: '🇦🇷', name: 'Argentina'},
  {cca2: 'AM', callingCode: ['374'], flag: '🇦🇲', name: 'Armenia'},
  {cca2: 'AU', callingCode: ['61'], flag: '🇦🇺', name: 'Australia'},
  {cca2: 'AT', callingCode: ['43'], flag: '🇦🇹', name: 'Austria'},
  {cca2: 'AZ', callingCode: ['994'], flag: '🇦🇿', name: 'Azerbaijan'},
  {cca2: 'BH', callingCode: ['973'], flag: '🇧🇭', name: 'Bahrain'},
  {cca2: 'BD', callingCode: ['880'], flag: '🇧🇩', name: 'Bangladesh'},
  {cca2: 'BY', callingCode: ['375'], flag: '🇧🇾', name: 'Belarus'},
  {cca2: 'BE', callingCode: ['32'], flag: '🇧🇪', name: 'Belgium'},
  {cca2: 'BZ', callingCode: ['501'], flag: '🇧🇿', name: 'Belize'},
  {cca2: 'BJ', callingCode: ['229'], flag: '🇧🇯', name: 'Benin'},
  {cca2: 'BT', callingCode: ['975'], flag: '🇧🇹', name: 'Bhutan'},
  {cca2: 'BO', callingCode: ['591'], flag: '🇧🇴', name: 'Bolivia'},
  {
    cca2: 'BA',
    callingCode: ['387'],
    flag: '🇧🇦',
    name: 'Bosnia and Herzegovina',
  },
  {cca2: 'BW', callingCode: ['267'], flag: '🇧🇼', name: 'Botswana'},
  {cca2: 'BR', callingCode: ['55'], flag: '🇧🇷', name: 'Brazil'},
  {cca2: 'BN', callingCode: ['673'], flag: '🇧🇳', name: 'Brunei'},
  {cca2: 'BG', callingCode: ['359'], flag: '🇧🇬', name: 'Bulgaria'},
  {cca2: 'KH', callingCode: ['855'], flag: '🇰🇭', name: 'Cambodia'},
  {cca2: 'CM', callingCode: ['237'], flag: '🇨🇲', name: 'Cameroon'},
  {cca2: 'CA', callingCode: ['1'], flag: '🇨🇦', name: 'Canada'},
  {cca2: 'CN', callingCode: ['86'], flag: '🇨🇳', name: 'China'},
  {cca2: 'CO', callingCode: ['57'], flag: '🇨🇴', name: 'Colombia'},
  {cca2: 'CU', callingCode: ['53'], flag: '🇨🇺', name: 'Cuba'},
  {cca2: 'DK', callingCode: ['45'], flag: '🇩🇰', name: 'Denmark'},
  {cca2: 'EG', callingCode: ['20'], flag: '🇪🇬', name: 'Egypt'},
  {cca2: 'FR', callingCode: ['33'], flag: '🇫🇷', name: 'France'},
  {cca2: 'DE', callingCode: ['49'], flag: '🇩🇪', name: 'Germany'},
  {cca2: 'GR', callingCode: ['30'], flag: '🇬🇷', name: 'Greece'},
  {cca2: 'HK', callingCode: ['852'], flag: '🇭🇰', name: 'Hong Kong'},
  {cca2: 'ID', callingCode: ['62'], flag: '🇮🇩', name: 'Indonesia'},
  {cca2: 'IR', callingCode: ['98'], flag: '🇮🇷', name: 'Iran'},
  {cca2: 'IQ', callingCode: ['964'], flag: '🇮🇶', name: 'Iraq'},
  {cca2: 'IE', callingCode: ['353'], flag: '🇮🇪', name: 'Ireland'},
  {cca2: 'IT', callingCode: ['39'], flag: '🇮🇹', name: 'Italy'},
  {cca2: 'JP', callingCode: ['81'], flag: '🇯🇵', name: 'Japan'},
  {cca2: 'KR', callingCode: ['82'], flag: '🇰🇷', name: 'South Korea'},
  {cca2: 'MY', callingCode: ['60'], flag: '🇲🇾', name: 'Malaysia'},
  {cca2: 'MX', callingCode: ['52'], flag: '🇲🇽', name: 'Mexico'},
  {cca2: 'NL', callingCode: ['31'], flag: '🇳🇱', name: 'Netherlands'},
  {cca2: 'NZ', callingCode: ['64'], flag: '🇳🇿', name: 'New Zealand'},
  {cca2: 'NG', callingCode: ['234'], flag: '🇳🇬', name: 'Nigeria'},
  {cca2: 'PK', callingCode: ['92'], flag: '🇵🇰', name: 'Pakistan'},
  {cca2: 'PH', callingCode: ['63'], flag: '🇵🇭', name: 'Philippines'},
  {cca2: 'RU', callingCode: ['7'], flag: '🇷🇺', name: 'Russia'},
  {cca2: 'SA', callingCode: ['966'], flag: '🇸🇦', name: 'Saudi Arabia'},
  {cca2: 'ZA', callingCode: ['27'], flag: '🇿🇦', name: 'South Africa'},
  {cca2: 'ES', callingCode: ['34'], flag: '🇪🇸', name: 'Spain'},
  {cca2: 'SE', callingCode: ['46'], flag: '🇸🇪', name: 'Sweden'},
  {cca2: 'CH', callingCode: ['41'], flag: '🇨🇭', name: 'Switzerland'},
  {cca2: 'TH', callingCode: ['66'], flag: '🇹🇭', name: 'Thailand'},
  {cca2: 'TR', callingCode: ['90'], flag: '🇹🇷', name: 'Turkey'},
  {cca2: 'UA', callingCode: ['380'], flag: '🇺🇦', name: 'Ukraine'},
  {cca2: 'AE', callingCode: ['971'], flag: '🇦🇪', name: 'United Arab Emirates'},
  {cca2: 'GB', callingCode: ['44'], flag: '🇬🇧', name: 'United Kingdom'},
  {cca2: 'US', callingCode: ['1'], flag: '🇺🇸', name: 'United States'},
  {cca2: 'VN', callingCode: ['84'], flag: '🇻🇳', name: 'Vietnam'},
];

const LoginScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [country, setCountry] = useState(countries[0]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoginPressed, setIsLoginPressed] = useState(false);
  const {showToast} = useDialog();
  const {getResponsiveDimension, getResponsiveHeight, getResponsiveWidth} =
    useResponsiveDimensions();
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
      }),
    [getResponsiveDimension, getResponsiveHeight, getResponsiveWidth],
  );

  const handleOpenModal = () => setIsModalVisible(true);
  const handleCloseModal = () => setIsModalVisible(false);

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
      <CommonHeader
        backGroundColor={COLORS.WHITE}
        roundedIconBGColor={COLORS.PRIMARY_DARK}
        statusBarColor={COLORS.SHADE_WHITE}
      />
      <View style={styles.contentContainer}>
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
      <BottomSheet
        isVisible={isModalVisible}
        onBackdropPress={handleCloseModal}
        containerStyle={styles.bottomSheetContainer}>
        <View style={styles.modalContainer}>{renderCountryList()}</View>
      </BottomSheet>
    </View>
  );
};

const generateStyles = ({
  getResponsiveDimension,
  getResponsiveHeight,
  getResponsiveWidth,
}: any) =>
  StyleSheet.create({
    screen: {
      backgroundColor: COLORS.WHITE,
      alignItems: 'center',
      flex: 1,
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
      width: getResponsiveWidth(180),
      height: getResponsiveHeight(150),
      marginStart: -35,
      resizeMode: 'stretch',
    },
    discription: {
      marginBottom: getResponsiveDimension(20),
      color: COLORS.BLACK,
      fontFamily: 'AlegreyaSans-Regular',
      fontSize: getResponsiveDimension(15),
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
      fontSize: getResponsiveDimension(20),
      marginRight: getResponsiveDimension(5),
    },
    callingCodeText: {
      fontSize: getResponsiveDimension(16),
      fontWeight: 'bold',
    },
    inputContainer: {
      flex: 1,
      marginTop: getResponsiveDimension(18),
    },
    footerbutton: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
    button: {
      borderRadius: getResponsiveDimension(10),
      backgroundColor: '#218B82',
      flexDirection: 'row',
      padding: getResponsiveDimension(12),
    },
    googleButton: {
      backgroundColor: COLORS.CRIMSRON_RED_PINK,
    },
    buttonTitle: {
      fontSize: getResponsiveDimension(15),
    },
    termsText: {
      marginTop: getResponsiveDimension(10),
      textAlign: 'center',
      color: 'gray',
      fontSize: getResponsiveDimension(10),
    },
    linkText: {
      color: COLORS.PRIMARY_DARK,
      fontWeight: 'bold',
    },
    bottomSheetContainer: {
      backgroundColor: COLORS.BLUE_LIGHT,
      position: 'absolute',
      bottom: 0,
      width: '100%',
      height: Dimensions.get('window').height * 0.5,
      borderTopLeftRadius: getResponsiveDimension(15),
      borderTopRightRadius: getResponsiveDimension(15),
      elevation: 5,
    },
    modalContainer: {
      padding: getResponsiveDimension(20),
      backgroundColor: 'white',
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