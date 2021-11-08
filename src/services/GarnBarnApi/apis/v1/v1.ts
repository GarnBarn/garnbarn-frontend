import { AxiosStatic } from "axios";
import firebase from "firebase";
import { AssignmentApis } from "./AssignmentApis";
import TagApis from "./TagApis";

export class v1 {
  private _firebaseUser: firebase.User;
  private _axiosInstance: AxiosStatic | undefined;

  constructor(firebaseUser: firebase.User, axios?: AxiosStatic) {
    this._firebaseUser = firebaseUser;
    this._axiosInstance = axios;
  }

  /**
   * This will generage the AssignmentApis instance with the stored firebaseUser
   *
   * @returns Instance of AssignmentApis
   */
  get assignments(): AssignmentApis {
    return new AssignmentApis(this._firebaseUser, this._axiosInstance);
  }

  /**
   * This will generate the TagApis instance with the stored firebaseUser
   *
   * @returns Instance of TagApis
   */
  get tags(): TagApis {
    return new TagApis(this._firebaseUser, this._axiosInstance);
  }
}
