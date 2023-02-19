import {LocationObject} from 'expo-location';
import {LoginResponse} from '../models/ApiModels';
import {nativeUtils} from './ApplicationUtils';

export function checkTime(): boolean {
  return true;
}
export async function checkUserDistanceFromOffice(
  locObject: LocationObject,
  userObject: any,
): Promise<number> {
  const employee: LoginResponse = userObject.user as LoginResponse;
  return await nativeUtils.checkDistance(
    employee.officeCoordinates.latitude,
    employee.officeCoordinates.longitude,
    locObject.coords.latitude,
    locObject.coords.longitude,
  );
}
