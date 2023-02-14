import {LocationObject} from 'expo-location';
import {LoginResponse} from '../models/ApiModels';
import {nativeUtils} from './ApplicationUtils';

export function checkTime(): boolean {
  return true;
}
export async function checkLocation(
  locObject: LocationObject,
  userObject: any,
): Promise<boolean> {
  const employee: LoginResponse = userObject.user as LoginResponse;
  const distance = await nativeUtils.checkDistance(
    employee.officeCoordinates.latitude,
    employee.officeCoordinates.longitude,
    locObject.coords.latitude,
    locObject.coords.longitude,
  );
  console.log('dis'+distance);

  return true;
}
