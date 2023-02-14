import AxiosClient from './AxiosClient';
import {getHeaders} from '../utils/utils';

export default class NetworkClient extends AxiosClient {
  constructor(baseURL: string) {
    super(baseURL);
  }

  public async requestGet(endpoint: string, params: any) {
    return this.instance.get(endpoint, {
      params: params,
      headers: getHeaders(),
    });
  }

  public async requestPost(endpoint: string, requestBody: any) {
    return this.instance.post(endpoint, requestBody, {
      headers: getHeaders(),
    });
  }

  public async requestPut(endpoint: string, requestBody: any) {
    return this.instance.put(endpoint, requestBody, {
      headers: getHeaders(),
    });
  }
}
