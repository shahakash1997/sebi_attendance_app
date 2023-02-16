import {LocationObject} from 'expo-location';
import {LoginResponse} from '../models/ApiModels';
import {nativeUtils} from './ApplicationUtils';

export function checkTime(): boolean {
  return true;
}
let timer = 0;
export async function checkUserDistanceFromOffice(
  locObject: LocationObject,
  userObject: any,
): Promise<number> {
  const employee: LoginResponse = userObject.user as LoginResponse;
  const distance = await nativeUtils.checkDistance(
    employee.officeCoordinates.latitude,
    employee.officeCoordinates.longitude,
    locObject.coords.latitude,
    locObject.coords.longitude,
  );
  timer++;
  console.log('distance is ', distance +' '+timer);
  return distance;
}
