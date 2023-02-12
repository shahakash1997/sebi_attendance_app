export enum SEBIUserRoles {
  Standard,
  Admin,
}

export interface Location {
  latitude: number;
  longitude: number;
}

/**
 * DB Object
 */
export interface SEBIUser {
  employeeId: number;
  name: string;
  email: string;
  phone: string;
  pwdHash: string;
  baseLocation: Location;
  role: SEBIUserRoles;
}

export interface SEBISessionUser {
  employeeId: number;
  email: string;
  name: string;
  role: SEBIUser['role'];
}

export interface LoginRequest {
  employeeId: string;
  password: string;
  deviceConfig: DeviceConfig;
}
export interface LoginResponse {
  employeeId: string;
  name: string;
  phone: string;
  officeCoordinates: Location;
  officeAddress?: string;
  officeType?: string;
  passwordHash: string;
  isAdmin: boolean;
  authToken: string;
}

export interface Request {
  uri: string;
  method: string;
  queryString: string;
  body: object;
}
export interface DeviceConfig {
  brand: string | null;
  deviceName: string | null;
  designName: string | null;
  deviceYearClass: number | null;
  isDevice: boolean;
  manufacturer: string | null;
  modelId: any;
  modelName: string | null;
  osBuildFingerprint: string | null;
  osBuildId: string | null;
  osInternalBuildId: string | null;
  osName: string | null;
  osVersion: string | null;
  platformApiLevel: number | null;
  productName: string | null;
}

export enum AttendanceType {
  PUNCH_IN = 'PUNCH_IN',
  PUNCH_OUT = 'PUNCH_OUT',
}
export enum InOutType {
  LOCATION_IN = 'LOCATION_IN',
  LOCATION_OUT = 'LOCATION_OUT',
}
export interface PunchInOutRequest {
  employeeId: number;
  userToken: string;
  timestamp: number;
  userLocation: Location;
  type: AttendanceType;
}

export interface PunchInOutResponse {
  success: boolean;
}
export interface InOutRequest {
  timestamp: number;
  userLocation: Location;
  employeeId: number;
  type: InOutType;
}

export interface InOutResponse {
  success: boolean;
}
