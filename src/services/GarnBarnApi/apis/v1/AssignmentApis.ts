import { api, ApiSpecError } from "./api";
import firebase from "firebase";
import { AxiosPromise, AxiosResponse, AxiosStatic } from "axios";
import { AssignmentApi } from "@/types/garnbarn/AssignmentApi";

export class AssignmentApis extends api {
  API_BASE_URL = "/api/v1/assignment";
  constructor(firebaseUser: firebase.User, axios?: AxiosStatic) {
    super(firebaseUser, axios);
  }

  /**
   * Call Get Assignment API
   * https://garnbarn.github.io/garnbarn-backend/#/api?id=get-assignment
   *
   * @returns AxiosPromise for the request in pending state.
   */
  get(id: number): Promise<AxiosPromise> {
    return this.sendRequest("GET", `${this.API_BASE_URL}/${id}/`);
  }

  /**
   * Call Get All Assignments API
   * https://garnbarn.github.io/garnbarn-backend/#/api?id=create-assignment
   *
   * @returns AxiosPromise for the request in pending state.
   */
  all(): Promise<AxiosPromise> {
    return this.sendRequest("GET", `${this.API_BASE_URL}/`);
  }

  /**
   * Call Create Assignment API
   * https://garnbarn.github.io/garnbarn-backend/#/api?id=create-assignment
   *
   * @returns AxiosPromise for the request in pending state.
   */
  create(assignmentData: AssignmentApi): Promise<AxiosPromise> {
    if (typeof assignmentData.id !== "undefined") {
      throw new ApiSpecError("You can't set the assignment id");
    }
    if (typeof assignmentData.name === "undefined") {
      throw new ApiSpecError("You can't create an assignment without a name");
    }
    return this.sendRequest("POST", `${this.API_BASE_URL}/`, assignmentData);
  }

  /**
   * Call Update Assignment API
   * https://garnbarn.github.io/garnbarn-backend/#/api?id=update-assignment
   *
   * @returns AxiosPromise for the request in pending state.
   */
  update(id: number, updateField: AssignmentApi): Promise<AxiosPromise> {
    if (typeof updateField.id !== "undefined") {
      throw new ApiSpecError("You can't update the assignment id");
    }
    return this.sendRequest("PATCH", `${this.API_BASE_URL}/${id}/`, updateField);
  }

  /**
   * Call Delete Assignment API
   * https://garnbarn.github.io/garnbarn-backend/#/api?id=delete-assignment
   *
   * @param id The ID of assignment that you want to get
   * @returns AxiosPromise for the request in pending state.
   */
  delete(id: number): Promise<AxiosPromise> {
    return this.sendRequest("DELETE", `${this.API_BASE_URL}/${id}/`);
  }
}
