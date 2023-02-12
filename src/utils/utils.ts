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
  const devInfo =  {
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

//todo Add device Info and auth token etc
