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
//todo load all app components and initialize firebase and all
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
    console.log(sessionState.getUserSession().isLoggedIn);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
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
