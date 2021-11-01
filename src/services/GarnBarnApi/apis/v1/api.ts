import axios, {
  Method,
  AxiosRequestConfig,
  AxiosStatic,
  AxiosResponse,
} from "axios";
import firebase from "firebase";
import GarnBarnApiConfig from "@/GarnBarnApiConfig.json";

export type RequestBody = {
  [key: string]: any;
};

export class api {
  private _firebaseUser: firebase.User;
  private _apiPrefix: string;
  private _axiosInstance: AxiosStatic | undefined;

  constructor(firebaseUser: firebase.User, axios?: AxiosStatic) {
    this._firebaseUser = firebaseUser;
    this._apiPrefix = GarnBarnApiConfig.apiPrefix;
    this._axiosInstance = axios;
  }

  /**
   * sendRequest is used to handle request sending using axios.
   *
   * @param config AxiosRequestConfig for config the request to send. For the `Authorization` field, It will be automatically filled.
   * @returns Instance of AxiosPromise in fulfilled state.
   */
  async sendRequest(
    method: Method,
    apiPath: string,
    body?: RequestBody
  ): Promise<AxiosResponse> {
    const idToken = await this._firebaseUser.getIdToken();
    const axiosConfig: AxiosRequestConfig = {
      baseURL: this._apiPrefix,
      url: apiPath,
      method: method,
      headers: {
        Authorization: "Bearer " + idToken,
        "Content-Type": "application/json",
      },
      data: body,
    };
    return this._axiosInstance
      ? await this._axiosInstance(axiosConfig)
      : await axios(axiosConfig);
  }

  /**
   * getFirebaseUser is the getter of firebaseUser
   * @returns Instance of Firebase User
   */
  getFirebaseUser(): firebase.User {
    return this._firebaseUser;
  }
}

export class ApiSpecError extends Error {}
