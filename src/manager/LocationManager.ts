import * as Location from 'expo-location';
import {Accuracy} from 'expo-location';
import {GEOFENCE_TASK_NAME} from '../constants/constants';

export default class LocationManager {
  private static instance: LocationManager;

  constructor() {}

  public async checkForLocationPermissions(): Promise<boolean> {
    await Location.enableNetworkProviderAsync();
    if (await this.checkForegroundLocation()) {
      return this.checkBackgroundLocation();
    } else {
      return false;
    }
  }

  private async checkBackgroundLocation(): Promise<boolean> {
    let permissionResponse = await Location.getBackgroundPermissionsAsync();
    if (permissionResponse.status === 'granted') {
      return true;
    } else {
      let {status} = await Location.requestBackgroundPermissionsAsync();
      return status === 'granted';
    }
  }

  private async checkForegroundLocation(): Promise<boolean> {
    let permissionResponse = await Location.getForegroundPermissionsAsync();
    if (permissionResponse.status === 'granted') {
      return true;
    } else {
      let {status} = await Location.requestForegroundPermissionsAsync();
      return status === 'granted';
    }
  }

  public static getInstance(): LocationManager {
    if (!LocationManager.instance) {
      LocationManager.instance = new LocationManager();
    }
    return LocationManager.instance;
  }

  public async getCurrentPositionAsync() {
    return Location.getCurrentPositionAsync({
      accuracy: Accuracy.Highest,
    });
  }

  public async isLocationServicesEnabled() {
    return Location.hasServicesEnabledAsync();
  }

  private async startGeofencing(locationRegions: []) {
    await Location.startGeofencingAsync(GEOFENCE_TASK_NAME, locationRegions);
  }
}

export interface DLocation {
  latitude: string;
  longitude: string;
}
