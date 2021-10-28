import { Assignment } from "@/types/garnbarn/Assignment";
import { AxiosStatic } from "axios";
import firebase from "firebase";
import { AssignmentApis } from "./AssignmentApis";

export class v1 {
  private _firebaseUser: firebase.User;
  private _axiosInstance: AxiosStatic | undefined;

  constructor(firebaseUser: firebase.User, axios?: AxiosStatic) {
    this._firebaseUser = firebaseUser;
    this._axiosInstance = axios;
  }

  assignment(assignment?: Assignment): AssignmentApis {
    return new AssignmentApis(
      this._firebaseUser,
      assignment,
      this._axiosInstance
    );
  }
}
