import { AxiosStatic } from "axios";
import firebase from "firebase";
import { v1 } from "./apis/v1/v1";

export default class GarnBarnApi {
  private _firebaseUser: firebase.User;
  private _axiosInstance: AxiosStatic | undefined;

  constructor(firebaseUser: firebase.User, axios?: AxiosStatic) {
    this._firebaseUser = firebaseUser;
    this._axiosInstance = axios;
  }

  /**
   * Get the the API v1 caller.
   *
   * @returns Instance of v1 initilized with the stored firebaseUser
   */
  v1(): v1 {
    return new v1(this._firebaseUser);
  }
}
