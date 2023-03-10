import * as Device from 'expo-device';
import {DeviceConfig} from '../models/ApiModels';

export function getHttpRequestId() {
  return `SEBI_${Date.now()}`;
}
export function isNullOrEmpty(value: string) {
  return (
    value === null ||
    value === undefined ||
    value === '' ||
    value.length === 0 ||
    value.trim().length === 0
  );
}

export function getAuthToken() {
  return 'TEST_TOKEN';
}
export function getUserInfo() {
  return JSON.stringify({});
}

export function getHeaders() {
  return {
    'X-COREOS-REQUEST-ID': getHttpRequestId(),
    'X-COREOS-ACCESS': getAuthToken(),
    'X-COREOS-USERINFO': getUserInfo(),
    'Content-Type': 'application/json',
  };
}

export function getDeviceInfo(): DeviceConfig {
  const devInfo = {
    brand: Device.brand,
    deviceName: Device.deviceName,
    designName: Device.designName,
    deviceYearClass: Device.deviceYearClass,
    isDevice: Device.isDevice,
    manufacturer: Device.manufacturer,
    modelId: Device.modelId,
    modelName: Device.modelName,
    osBuildFingerprint: Device.osBuildFingerprint,
    osBuildId: Device.osBuildId,
    osInternalBuildId: Device.osInternalBuildId,
    osName: Device.osName,
    osVersion: Device.osVersion,
    platformApiLevel: Device.platformApiLevel,
    productName: Device.productName,
  };
  console.log(devInfo);
  return devInfo;
}

/**
 * time is in seconds
 * @param time
 */

export async function timeDelay(time: number = 1000) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, time * 1000);
  });
}

const weekday = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export function getWeekDayName(day: number) {
  return weekday[day];
}
export function getCurrentDate(d: string) {
  console.log('Date is', d);
  return new Date(Date.parse(d)).toString().substring(0, 15);
}
//todo Add device Info and auth token etc
