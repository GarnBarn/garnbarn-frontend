import { api } from "./api";
import firebase from "firebase";
import { Assignment } from "@/types/garnbarn/Assignment";
import { AxiosPromise, AxiosResponse, AxiosStatic } from "axios";

export class AssignmentApis extends api {
  private _assignment: Assignment | undefined;
  API_BASE_URL = "/api/v1/assignment";
  constructor(
    firebaseUser: firebase.User,
    assignment?: Assignment,
    axios?: AxiosStatic
  ) {
    super(firebaseUser, axios);
    this._assignment = assignment;
  }

  /**
   * Call Get Assignment API
   * https://garnbarn.github.io/garnbarn-backend/#/api?id=get-assignment
   *
   * @returns AxiosPromise for the request in pending state.
   */
  get(): Promise<AxiosPromise> {
    if (!this._assignment) {
      throw Error(
        "To get assignment, The assignment object with assignment id must be specified."
      );
    }
    return this.sendRequest(
      "GET",
      `${this.API_BASE_URL}/${this._assignment.id}/`
    );
  }

  /**
   * Call Create Assignment API
   * https://garnbarn.github.io/garnbarn-backend/#/api?id=create-assignment
   *
   * @returns AxiosPromise for the request in pending state.
   */
  create(): Promise<AxiosPromise> {
    return this.sendRequest("POST", this.API_BASE_URL, this._assignment);
  }

  /**
   * Call Update Assignment API
   * https://garnbarn.github.io/garnbarn-backend/#/api?id=update-assignment
   *
   * @returns AxiosPromise for the request in pending state.
   */
  update(): Promise<AxiosPromise> {
    if (!this._assignment) {
      throw Error(
        "To update assignment, The assignment object with assignment id must be specified."
      );
    }
    const assignment = this._assignment;
    if (typeof assignment.id === "undefined") {
      throw TypeError("assignment.id can't be undefined");
    }
    const assignmentId: number = assignment.id;
    delete assignment["id"];
    return this.sendRequest(
      "PATCH",
      `${this.API_BASE_URL}/${assignmentId}`,
      assignment
    );
  }

  /**
   * Call Delete Assignment API
   * https://garnbarn.github.io/garnbarn-backend/#/api?id=delete-assignment
   *
   * @param id The ID of assignment that you want to get
   * @returns AxiosPromise for the request in pending state.
   */
  delete(): Promise<AxiosPromise> {
    if (!this._assignment) {
      throw Error(
        "To delete assignment, The assignment object with assignment id must be specified."
      );
    }
    return this.sendRequest(
      "DELETE",
      `${this.API_BASE_URL}/${this._assignment.id}/`
    );
  }
}
