import React, { useState, useEffect } from 'react';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import AsyncStorageUtils from '../Utils/AsyncStorageUtils';
import { useDialog } from '../CommonComponents/AlertDialogue';

interface GoogleUser {
  username: string;
  email: string;
  familyName?: string;
  givenName?: string;
  id?: string;
  photo?: string;
}

interface UseFirebaseGoogleLoginProps {
  onSignInSuccess: (userData: GoogleUser) => void; // Callback function type for successful sign-in
}

const useFirebaseGoogleLogin = ({ onSignInSuccess }: UseFirebaseGoogleLoginProps) => {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<GoogleUser | null>(null);
  const { showDialog, showToast, closeDialog } = useDialog();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '387654630479-0lig5for31nm2bagf93nfa4c92v6iptt.apps.googleusercontent.com',
      offlineAccess: true,
    });
    checkGooglePlayServices();
    getCurrentUser();
  }, []);

  const checkGooglePlayServices = async () => {
    try {
      const hasPlayServices = await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      console.log('Google Play Services available:', hasPlayServices);
    } catch (error) {
      showToast({
        message: 'Google Play Services is required to proceed.',
        type: 'failure',
      });
    }
  };

  const onGoogleButtonPress = () => {
    GoogleSignin.signIn()
      .then(userInfo => {
        // Check if the sign-in was cancelled
        if (userInfo?.type === 'cancelled') {
          showToast({
            message: 'Google Sign-in process cancelled by the user.',
            type: 'failure',
          });
          return;
        }

        // Extract user data
        const userData: GoogleUser = {
          username: userInfo?.data?.user.name || '',
          email: userInfo?.data?.user.email || '',
          familyName: userInfo?.data?.user.familyName || '',
          givenName: userInfo?.data?.user.givenName || '',
          id: userInfo?.data?.user.id || '',
          photo: userInfo?.data?.user.photo || '',
        };

        setIsSignedIn(true);
        setCurrentUser(userData);

        // Save to AsyncStorage
        AsyncStorageUtils.saveData('@google_user_info', JSON.stringify(userData))
          .then(() => {
            // Callback function after successful sign-in
            if (onSignInSuccess) {
              onSignInSuccess(userData); // Callback with user data
            }
          })
          .catch(err => {
            console.error('Error saving user data to AsyncStorage:', err);
            showToast({
              message: 'Error saving user data. Please try again.',
              type: 'failure',
            });
          });
      })
      .catch(error => {
        // Handle sign-in error
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          showToast({
            message: 'Sign-in process cancelled by the user.',
            type: 'failure',
          });
        } else if (error.code === statusCodes.IN_PROGRESS) {
          showToast({
            message: 'Sign-in is already in progress.',
            type: 'failure',
          });
        } else {
          showToast({
            message: 'Google Sign-In failed. Please try again.',
            type: 'failure',
          });
        }
        console.error('Google Sign-In failed:', error);
      });
  };

  const getCurrentUser = async () => {
    try {
      const userInfo = await GoogleSignin.getCurrentUser();
      if (userInfo?.data?.user) {
        const userData: GoogleUser = {
          username: userInfo?.data?.user.name || '',
          email: userInfo?.data?.user.email || '',
          familyName: userInfo?.data?.user.familyName || undefined,
          givenName: userInfo?.data?.user.givenName || undefined,
          id: userInfo?.data?.user.id,
          photo: userInfo?.data?.user.photo || undefined,
        };

        setCurrentUser(userData);
        console.log('Current user:', userData);
      } else {
        setCurrentUser(null);
      }
    } catch (error) {
      console.error('Error fetching current user:', error);
      showToast({
        message: 'Error fetching user data. Please try again.',
        type: 'failure',
      });
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      await GoogleSignin.signOut();
      setIsSignedIn(false);
      setCurrentUser(null);
      await AsyncStorageUtils.deleteData('@google_user_info');
      showToast({
        message: 'Successfully signed out.',
        type: 'success',
      });
    } catch (error) {
      console.error('Error during sign out:', error);
      showToast({
        message: 'Sign-out failed. Please try again.',
        type: 'failure',
      });
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
