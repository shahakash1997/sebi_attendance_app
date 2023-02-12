import NetworkClient from '../network/NetworkClient';
import {BASE_URL} from '../constants/constants';
import {PunchInOutRequest} from '../models/ApiModels';

class AttendanceService {
  private networkClient: NetworkClient;

  constructor() {
    this.networkClient = new NetworkClient(BASE_URL);
  }

  public async punchAttendance(requestBody: PunchInOutRequest) {}

  public async getAttendanceLogs() {

  }
}
