import {useEffect, useState} from 'react';
import * as Location from 'expo-location';
import {Accuracy, LocationSubscription} from 'expo-location';
import {useGlobalSessionState} from '../cache/AppState';
import {checkUserDistanceFromOffice} from '../utils/attendanceUtils';

export default function useCurrentDistance() {
  const [distance, setDistance] = useState(-1);
  const sessionState = useGlobalSessionState();
  useEffect(() => {
    let locationSubscription: LocationSubscription | null = null;
    (async () => {
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
    })();
    return () => {
      if (locationSubscription) {
        locationSubscription.remove;
      }
    };
  }, []);
  return distance;
}
