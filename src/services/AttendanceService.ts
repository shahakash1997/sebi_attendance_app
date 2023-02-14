import NetworkClient from '../network/NetworkClient';
import {BASE_URL} from '../constants/constants';
import {PunchInOutRequest} from '../models/ApiModels';

export default class AttendanceService {
  private networkClient: NetworkClient;

  constructor() {
    this.networkClient = new NetworkClient(BASE_URL);
  }

  public async punchAttendance(requestBody: PunchInOutRequest) {
    const apiResponse = await this.networkClient.requestPost(
      '/attendance',
      requestBody,
    );
    return apiResponse.data.data;
  }

  public async getAttendanceLogs(
    employeeId: string,
    startTime?: number,
    endTime?: number,
  ) {
    const apiResponse = await this.networkClient.requestGet(
      '/attendance/logs',
      {
        employeeId: employeeId,
        startTime: startTime,
        endTime: endTime,
      },
    );
    return apiResponse.data.data;
  }
}
