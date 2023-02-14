import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Main} from './src/Main';
import LocationManager from './src/manager/LocationManager';
import {showToast} from './src/components/widgets/Toaster';

const locationManager = LocationManager.getInstance();
const App = () => {
  useEffect(() => {
    (async () => {
      const isLocationEnabled = locationManager.isLocationServicesEnabled();
      if (!isLocationEnabled) {
        showToast(
          'Location Services not enabled! Please enable from settings!',
        );
      }
      await LocationManager.getInstance().checkForLocationPermissions();
    })();
  }, []);
  return (
    <NavigationContainer>
      <Main />
    </NavigationContainer>
  );
};
export default App;
