import type {DownloadProgressData} from 'expo-file-system';
import * as FileSystem from 'expo-file-system';
import {NativeModules} from 'react-native';
import * as Location from 'expo-location';
import NetworkUtils from './NetworkUtils';

const {SEBIAttendanceAppUtils} = NativeModules;

interface NativeUtilsInterface {
  openAndInstallApk(apkUri: string): Promise<boolean>;

  openSettings(): Promise<boolean>;

  isAutomaticDateTimeEnabled(): Promise<boolean>;

  checkDistance(
    baseLat: number,
    baseLong: number,
    userLat: number,
    userLong: number,
  ): Promise<number>;
}

const nativeUtils = SEBIAttendanceAppUtils as NativeUtilsInterface;
export {nativeUtils};

export default class ApplicationUtils {
  public static async downloadAPK(
    apkURL: string,
    version: string,
    callback: (progress: DownloadProgressData) => any,
  ): Promise<string | undefined> {
    const fileUri = `${FileSystem.cacheDirectory}${version}.apk`;
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    const currentDate = new Date().toLocaleDateString();
    const fileDate = new Date(
      fileInfo.modificationTime ? fileInfo.modificationTime * 1000 : 0,
    ).toLocaleDateString();
    if (fileInfo.exists && currentDate === fileDate) {
      return fileInfo.uri;
    }
    const downloadResumable = FileSystem.createDownloadResumable(
      apkURL,
      `${FileSystem.cacheDirectory}${version}.apk`,
      {},
      callback,
    );
    const downloadResult = await downloadResumable.downloadAsync();
    return downloadResult?.uri;
  }

  public static async deleteApk(version: string) {
    await FileSystem.deleteAsync(`${FileSystem.cacheDirectory}${version}.apk`);
  }

  public static async openAPKFile(uri: string) {
    return await nativeUtils.openAndInstallApk(uri);
  }

  public static openAppSettings() {
    nativeUtils
      .openSettings()
      .then()
      .catch(error => {
        console.log(error.message);
      });
  }

  public static async checkMandatory() {
    const dateTimeCheck = SEBIAttendanceAppUtils.isAutomaticDateTimeEnabled();
    if (!dateTimeCheck) {
      throw new Error('Automatic date/time not enabled!');
    }
    await Location.enableNetworkProviderAsync();
    let locationServicesCheck = await Location.hasServicesEnabledAsync();
    const foregroundLocation =
      await Location.requestForegroundPermissionsAsync();
    const bgLocation = await Location.requestBackgroundPermissionsAsync();
    if (!(locationServicesCheck && foregroundLocation && bgLocation)) {
      throw new Error('Location or GPS not enabled');
    }
    let internet = await NetworkUtils.isAvailableAsync();
    if (!internet) {
      throw new Error(
        'Internet is disabled! Please enable internet and try again ',
      );
    }
  }
}
