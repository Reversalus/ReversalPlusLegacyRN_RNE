import React, { useState, useMemo, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button, Icon, Text, Image } from '@rneui/themed';
import CommonHeader from '../../CommonComponents/CommonHeader';
import { COLORS, ImgUrl } from '../../Constants';
import { useFirebaseGoogleLogin } from '../../Hooks/useFirebaseGoogleLogin';
import AsyncStorageUtils from '../../Utils/AsyncStorageUtils';
import { useDialog } from '../../CommonComponents/AlertDialogue';
import useResponsiveDimensions from '../../Hooks/useResponsiveDimensions';

const LoginScreen = ({ navigation }: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isLoginPressed, setLoginPressed] = useState(false);
  
  const { showToast } = useDialog();
  const { getResponsiveDimension, getResponsiveHeight, getResponsiveWidth } = useResponsiveDimensions();
  
  // Memoize styles to improve performance
  const styles = useMemo(() => generateStyles({ getResponsiveDimension, getResponsiveHeight, getResponsiveWidth }), 
    [getResponsiveDimension, getResponsiveHeight, getResponsiveWidth]);

  const debounceRef = useRef(0); // Ref to manage the last clicked time

  // Handle Google login success
  const handleGoogleLoginSuccess = () => {
    showToast({
      message: 'Successfully Signin from Google',
      type: 'success',
    });
  };

  const { onGoogleButtonPress, isSignedIn, currentUser } = useFirebaseGoogleLogin({ onSignInSuccess: handleGoogleLoginSuccess });

  // Handle login button click with debounce
  const handleLogin = async () => {
    const currentTime = Date.now();
    if (currentTime - debounceRef.current < 2000) {
      return; // Prevent executing the function if clicked within 2 seconds
    }
    debounceRef.current = currentTime; // Update the last click time

    setLoginPressed(true);
    
    if (!username && !password) {
      showToast({ message: 'Please enter username and password', type: 'failure' });
      return;
    }
  
    if (!username) {
      showToast({ message: 'Please enter your username', type: 'failure' });
      return;
    }
  
    if (!password) {
      showToast({ message: 'Please enter your password', type: 'failure' });
      return;
    }

    try {
      await AsyncStorageUtils.saveData('@user_info', JSON.stringify({ username }));
      showToast({ message: `Welcome, ${username}!`, type: 'success' });
      navigation.navigate('Dashboard');
    } catch (error) {
      showToast({ message: 'Login failed. Please try again.', type: 'failure' });
    }
  };

  // Handle Google login button click with debounce
  const handleGoogleLogin = () => {
    const currentTime = Date.now();
    if (currentTime - debounceRef.current < 2000) {
      return; // Prevent executing the function if clicked within 2 seconds
    }
    debounceRef.current = currentTime; // Update the last click time
    
    onGoogleButtonPress();
  };

  const renderLogo = () => (
    <View style={styles.logoContainer}>
      <Image
        source={{ uri: ImgUrl.REVERSAL_LOGO }}
        style={styles.logo}
        PlaceholderContent={<Icon name="image" />}
      />
    </View>
  );

  const renderLoginForm = () => (
    <View style={styles.formContainer}>
      <Text h3 style={styles.title}>Login</Text>
      <Input
        placeholder="Username"
        leftIcon={{ name: 'person', color: COLORS.BLACK }}
        value={username}
        onChangeText={setUsername}
        inputStyle={styles.input}
        containerStyle={styles.inputContainer}
        placeholderTextColor={isLoginPressed && !username ? COLORS.CRIMSRON_RED_PINK : 'gray'}
      />
      <Input
        placeholder="Password"
        secureTextEntry={!isPasswordVisible}
        leftIcon={{ name: 'lock', color: COLORS.BLACK }}
        rightIcon={{
          name: isPasswordVisible ? 'visibility' : 'visibility-off',
          color: COLORS.BLACK,
          onPress: () => setPasswordVisible(!isPasswordVisible),
        }}
        value={password}
        onChangeText={setPassword}
        inputStyle={styles.input}
        containerStyle={styles.inputContainer}
        placeholderTextColor={isLoginPressed && !password ? COLORS.CRIMSRON_RED_PINK : 'gray'}
      />
      <Button title="Login" onPress={handleLogin} buttonStyle={styles.button} titleStyle={styles.buttonTitle} />
      <Button title="Sign in with Google" onPress={handleGoogleLogin} buttonStyle={[styles.button, { backgroundColor: COLORS.RED }]} titleStyle={styles.buttonTitle} />
      <View style={styles.footer}>
        <Button title="Forgot Password?" type="clear" titleStyle={styles.footerText} onPress={() => navigation.navigate('ForgotPassword')} />
        <Button title="Don't have an account? Sign Up" type="clear" titleStyle={styles.footerText} onPress={() => navigation.navigate('Signup')} />
      </View>
    </View>
  );

  return (
    <View style={styles.screen}>
      <CommonHeader backGroundColor={COLORS.SHADE_WHITE} roundedIconBGColor={COLORS.PRIMARY_DARK} statusBarColor={COLORS.SHADE_WHITE} />
      {renderLogo()}
      {renderLoginForm()}
    </View>
  );
};

const generateStyles = ({
  getResponsiveDimension,
  getResponsiveHeight,
  getResponsiveWidth,
}: any) => StyleSheet.create({
  screen: {
    backgroundColor: COLORS.SHADE_WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    marginBottom: getResponsiveDimension(20),
    alignItems: 'center',
  },
  logo: {
    width: getResponsiveWidth(100),
    height: getResponsiveHeight(100),
    resizeMode: 'contain',
  },
  formContainer: {
    width: '90%',
    padding: getResponsiveDimension(20),
    backgroundColor: COLORS.WHITE,
    borderRadius: getResponsiveDimension(10),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    textAlign: 'center',
    marginBottom: getResponsiveDimension(20),
    color: COLORS.BLACK,
    fontWeight: 'bold',
  },
  input: {
    fontSize: getResponsiveDimension(16),
    color: COLORS.BLACK,
  },
  inputContainer: {
    borderColor: 'transparent',
  },
  button: {
    marginVertical: getResponsiveDimension(10),
    borderRadius: getResponsiveDimension(10),
  },
  buttonTitle: {
    fontWeight: 'bold',
  },
  footer: {
    marginTop: getResponsiveDimension(20),
    alignItems: 'center',
  },
  footerText: {
    fontSize: getResponsiveDimension(14),
    color: COLORS.PRIMARY_DARK,
  },
});

export default LoginScreen;
