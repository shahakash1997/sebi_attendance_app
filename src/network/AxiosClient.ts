import axios, {AxiosInstance, AxiosResponse} from 'axios';
import StatusCodes from '../constants/StatusCodes';
// import { handleAccessTokenExpiry } from './utils/helper';

export default abstract class AxiosClient {
  protected readonly instance: AxiosInstance;

  protected constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
      timeout: 15000, // timeout of 15s
    });

    this._initializeResponseInterceptor();
  }

  private _initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(
      this._handleResponse,
      this._handleError,
    );
  };

  protected _handleResponse = (response: AxiosResponse) => {
    return response;
  };

  protected _handleError = (error: any) => {
    if (error.response) {
      // Request made and server responded
      // console.log('_handleError if', error.response.status);
      const {status} = error.response;
      switch (status) {
        case StatusCodes.INTERNAL_SERVER_ERROR: {
          // Handle InternalServerError
          break;
        }
        case StatusCodes.FORBIDDEN: {
          // Handle Forbidden
          break;
        }
        case StatusCodes.UNAUTHORIZED: {
          // Handle Unauthorized
          //LoginHelper.handleAccessTokenExpiry();  //commented out as this was causing cycles
          //cycle: ../src/utils/loginHelper.ts -> ../src/resources/Login.ts -> ../src/network/client.ts -> ../src/utils/loginHelper.ts
          break;
        }
        case StatusCodes.TOO_MANY_REQUESTS: {
          // Handle TooManyRequests
          break;
        }
      }
    } else if (error.request) {
      // The request was made but no response was received
      // Network error should be received here
      // console.log('else if ', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error else', error.message);
    }
    return Promise.reject(error);
  };
}
