import React, {useEffect, useState} from 'react';
import {MainApplicationRouter} from './navigators/MainApplicationRouter';
import {LoginRouter} from './navigators/LoginRouter';
import SplashScreen from './screens/SplashScreen';
import {useGlobalSessionState} from './cache/AppState';
import ProgressDialog from './components/widgets/ProgressDialog';

import {
  IBMPlexSans_100Thin,
  IBMPlexSans_100Thin_Italic,
  IBMPlexSans_200ExtraLight,
  IBMPlexSans_200ExtraLight_Italic,
  IBMPlexSans_300Light,
  IBMPlexSans_300Light_Italic,
  IBMPlexSans_400Regular,
  IBMPlexSans_400Regular_Italic,
  IBMPlexSans_500Medium,
  IBMPlexSans_500Medium_Italic,
  IBMPlexSans_600SemiBold,
  IBMPlexSans_600SemiBold_Italic,
  IBMPlexSans_700Bold,
  IBMPlexSans_700Bold_Italic,
  useFonts,
} from '@expo-google-fonts/ibm-plex-sans';
import AppLocalStorage, {CACHE_KEYS} from './cache/AppLocalStorage';
import {LoginResponse} from './models/ApiModels';
import {isTokenExpired} from './utils/authUtils';
//todo load all app components and initialize firebase and all

const cache = AppLocalStorage.getInstance();
export const Main = () => {
  let [fontsLoaded] = useFonts({
    IBMPlexSans_400Regular,
    IBMPlexSans_600SemiBold,
    IBMPlexSans_300Light,
    IBMPlexSans_700Bold,
    IBMPlexSans_100Thin,
    IBMPlexSans_100Thin_Italic,
    IBMPlexSans_200ExtraLight,
    IBMPlexSans_200ExtraLight_Italic,
    IBMPlexSans_300Light_Italic,
    IBMPlexSans_400Regular_Italic,
    IBMPlexSans_500Medium,
    IBMPlexSans_500Medium_Italic,
    IBMPlexSans_600SemiBold_Italic,
    IBMPlexSans_700Bold_Italic,
  });
  const [isLoading, setLoading] = useState(true);
  const sessionState = useGlobalSessionState();

  useEffect(() => {
    (async () => {
      try {
        const employeeData = await cache.getObjectFromCache(
          CACHE_KEYS.USER_INFO,
        );
        if (employeeData) {
          const data = employeeData as LoginResponse;
          if (!isTokenExpired(data.authToken)) {
            sessionState.setUserSession({
              isLoggedIn: true,
              token: data.authToken,
              user: data,
            });
            setLoading(false);
          }
        }
        setLoading(false);
      } catch (error: any) {
        console.log(error.message);
        setLoading(false);
      }
    })();
  }, [isLoading, sessionState]);

  if (!fontsLoaded) {
    return <ProgressDialog visible={true} label={'Please wait...'} />;
  } else if (isLoading) {
    return <SplashScreen />;
  } else {
    if (sessionState.getUserSession().isLoggedIn) {
      return <MainApplicationRouter />;
    } else {
      return <LoginRouter />;
    }
  }
};
