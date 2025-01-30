import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { auth } from '../Creds/firebase-config'; // Adjust the import as necessary
import { GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut } from 'firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin'; // For mobile
import AsyncStorageUtils from '../Utils/AsyncStorageUtils'; // Adjust path as needed
import { useDialog } from '../CommonComponents/AlertDialogue'; // Adjust for your dialog

export interface GoogleUser {
  username: string;
  email: string;
  familyName?: string;
  givenName?: string;
  id: string;
  photo?: string;
}

interface UseFirebaseGoogleLoginProps {
  onSignInSuccess: (userData: GoogleUser) => void; // Callback for successful sign-in
}

const useFirebaseGoogleLogin = ({ onSignInSuccess }: UseFirebaseGoogleLoginProps) => {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<GoogleUser | null>(null);
  const { showToast } = useDialog();

  useEffect(() => {
    configureGoogleSignIn();
    getCurrentUser();
  }, []);

  const configureGoogleSignIn = () => {
    if (Platform.OS === 'android' || Platform.OS === 'ios') {
      GoogleSignin.configure({
        webClientId: '387654630479-0lig5for31nm2bagf93nfa4c92v6iptt.apps.googleusercontent.com', // Replace with your web client ID
        offlineAccess: true,
      });
    }
  };

  const onGoogleButtonPress = async () => {
    try {
      if (Platform.OS === 'web') {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        handleUser(user);
      } else {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        if (userInfo?.type === 'cancelled') {
          showToast({
            message: 'Google Sign-in process cancelled by the user.',
            type: 'failure',
          });
          return;
        }
        handleUser(userInfo); // Use the userInfo directly
      }
    } catch (error) {
      handleSignInError(error);
    }
  };

  const handleUser = (user: any) => {
    // Use the expected structure to access user info
    const userData: GoogleUser = {
      username: user?.data?.user?.name || '',
      email: user?.data?.user?.email || '',
      familyName: user?.data?.user?.familyName || undefined,
      givenName: user?.data?.user?.givenName || undefined,
      id: user?.data?.user?.id || '',
      photo: user?.data?.user?.photo || undefined,
    };

    setIsSignedIn(true);
    setCurrentUser(userData);

    // Store user data in AsyncStorage
    AsyncStorageUtils.saveData('@google_user_info', JSON.stringify(userData))
      .then(() => {
        if (onSignInSuccess) {
          onSignInSuccess(userData); // Callback after sign-in
        }
      })
      .catch(err => {
        console.error('Error saving user data to AsyncStorage:', err);
        showToast({ message: 'Error saving user data. Please try again.', type: 'failure' });
      });
  };

  const handleSignInError = (error: any) => {
    console.error('Google Sign-In failed:', error);
    if (Platform.OS === 'web') {
      showToast({ message: 'Google Sign-In failed', type: 'failure' });
    } else {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        showToast({ message: 'Sign-in process cancelled by the user.', type: 'failure' });
      } else if (error.code === statusCodes.IN_PROGRESS) {
        showToast({ message: 'Sign-in is already in progress.', type: 'failure' });
      } else {
        showToast({ message: 'Google Sign-In failed. Please try again.', type: 'failure' });
      }
    }
  };

  const getCurrentUser = async () => {
    const user = auth.currentUser; // For web

    if (user) {
      const userData: GoogleUser = {
        username: user?.data?.user?.name || '',
        email: user?.data?.user?.email || '',
        familyName: user?.data?.user?.familyName || undefined,
        givenName: user?.data?.user?.givenName || undefined,
        id: user?.data?.user?.id || '',
        photo: user?.data?.user?.photo || undefined,
      };

      setCurrentUser(userData);
      setIsSignedIn(true);
    } else {
      setCurrentUser(null);
    }
  };

  const signOut = async () => {
    try {
      if (Platform.OS === 'web') {
        await firebaseSignOut(auth);
      } else {
        await GoogleSignin.signOut();
      }
      setIsSignedIn(false);
      setCurrentUser(null);
      await AsyncStorageUtils.deleteData('@google_user_info');
      showToast({ message: 'Successfully signed out.', type: 'success' });
    } catch (error) {
      console.error('Error during sign out:', error);
      showToast({ message: 'Sign-out failed. Please try again.', type: 'failure' });
    }
  };

  return {
    onGoogleButtonPress,
    signOut,
    isSignedIn,
    currentUser,
  };
};

export { useFirebaseGoogleLogin };