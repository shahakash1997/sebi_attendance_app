import {useEffect, useState} from 'react';
import * as Location from 'expo-location';
import {Accuracy, LocationSubscription} from 'expo-location';
import {useGlobalSessionState} from '../cache/AppState';
import {checkUserDistanceFromOffice} from '../utils/attendanceUtils';
import {useIsFocused} from '@react-navigation/native';

export default function useCurrentDistance() {
  const [distance, setDistance] = useState(-1);
  const sessionState = useGlobalSessionState();
  const isFocused = useIsFocused();
  useEffect(() => {
    let locationSubscription: LocationSubscription | null = null;
    (async () => {
      if (sessionState.getUserSession() && sessionState.getUserSession().user) {
        locationSubscription = await Location.watchPositionAsync(
          {
            accuracy: Accuracy.Highest,
            timeInterval: 1000, // in millis
            distanceInterval: 1, //in metres
          },
          async location => {
            if (location != null) {
              const dt = await checkUserDistanceFromOffice(
                location,
                sessionState.getUserSession(),
              );
              setDistance(Math.floor(dt));
            }
          },
        );
      } else {
        console.log('No User exists');
      }
    })();
    return () => {
      console.log('isFox', isFocused);
      if (locationSubscription && !isFocused) {
        console.log('Removing LM');
        locationSubscription.remove();
      }
    };
  }, []);
  return distance;
}
