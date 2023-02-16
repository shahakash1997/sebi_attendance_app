import NetworkClient from '../network/NetworkClient';
import {BASE_URL} from '../constants/constants';
import {LoginRequest, LoginResponse} from '../models/ApiModels';
import {encrypt} from '../utils/authUtils';
import {getDeviceInfo} from '../utils/utils';

export default class AuthService {
  private networkClient: NetworkClient;

  constructor() {
    this.networkClient = new NetworkClient(BASE_URL);
  }

  public async login(
    employeeId: string,
    password: string,
  ): Promise<LoginResponse> {
    const loginRequestBody: LoginRequest = {
      employeeId: employeeId,
      password: password,
      deviceConfig: getDeviceInfo(),
    };
    const apiResponse = await this.networkClient.requestPost(
      '/auth',
      loginRequestBody,
    );
    return apiResponse.data.data;
  }
}
