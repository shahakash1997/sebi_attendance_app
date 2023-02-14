import {DeviceConfig, Location} from './ApiModels';

export interface Datum {
  id: number;
  employeeId: string;
  name: string;
  currentCoordinates: Location;
  timestamp: any;
  type?: any;
  deviceConfig: DeviceConfig;
  createdAt: any;
  updatedAt: any;
}

export interface Body {}

export interface Request {
  uri: string;
  method: string;
  queryString: string;
  body: Body;
}

export interface RootObject {
  data: Datum[];
  request: Request;
}
