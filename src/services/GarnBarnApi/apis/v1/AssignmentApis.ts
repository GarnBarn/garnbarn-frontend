import { api, ApiSpecError } from "./api";
import { AxiosResponse } from "axios";
import { AssignmentApi } from "@/types/GarnBarnApi/AssignmentApi";
import { Assignment } from "@/types/garnbarn/Assignment";
import {
  BulkApiResponse,
  GetAllAssignmentApiNextFunctionWrapper,
} from "@/types/GarnBarnApi/GarnBarnApiResponse";
export class AssignmentApis extends api {
  API_BASE_URL = "/api/v1/assignment";

  /**
   * Call Get Assignment API
   * https://garnbarn.github.io/garnbarn-backend/#/api?id=get-assignment
   *
   * @returns Promise of AxiosResponse for the request in fulfilled state.
   */
  get(id: number): Promise<AxiosResponse<Assignment>> {
    return this.sendRequest("GET", `${this.API_BASE_URL}/${id}/`) as Promise<
      AxiosResponse<Assignment>
    >;
  }

  /**
   * Call Get All Assignments API
   * https://garnbarn.github.io/garnbarn-backend/#/api?id=get-all-assignments
   *
   * @param fromPresent Get the assignment only from today.
   * @param page Page that API assigned to call.
   * @returns Promise of AxiosResponse that contain BlukApiResponse of Assignment as data
   */
  async all(
    fromPresent?: boolean,
    page?: number
  ): Promise<
    AxiosResponse<
      BulkApiResponse<Assignment, GetAllAssignmentApiNextFunctionWrapper>
    >
  > {
    let url = `${this.API_BASE_URL}/`;
    if (fromPresent || page) {
      // For adding Query Parameters
      url += "?";
      if (page) {
        url += `page=${page}&`;
      }
      if (fromPresent) {
        url += `fromPresent=true&`;
      }
    }
    const response = await this.sendRequest("GET", url);
    const responseData = response.data as any;
    responseData.next = this.createNextMethodForGetAllAssignmentApi(
      responseData.next,
      fromPresent
    );
    responseData.previous = this.createNextMethodForGetAllAssignmentApi(
      responseData.previous,
      fromPresent
    );
    response.data = responseData;
    return response as AxiosResponse<
      BulkApiResponse<Assignment, GetAllAssignmentApiNextFunctionWrapper>
    >;
  }

  createNextMethodForGetAllAssignmentApi(
    url: string | undefined,
    fromPresent?: boolean
  ): GetAllAssignmentApiNextFunctionWrapper | null {
    if (!url) {
      return null;
    }
    const processedUrl = `?${url?.split("?")[1]}`;
    const urlParams = new URLSearchParams(processedUrl);
    const page = urlParams.get("page");
    if (!page) {
      return () => {
        return this.all(fromPresent, 1);
      };
    }
    return () => {
      return this.all(fromPresent, parseInt(page));
    };
  }

  /**
   * Call Create Assignment API
   * https://garnbarn.github.io/garnbarn-backend/#/api?id=create-assignment
   *
   * @returns Promise of AxiosResponse for the request in fulfilled state.
   */
  create(assignmentData: AssignmentApi): Promise<AxiosResponse<Assignment>> {
    if (assignmentData.id) {
      return Promise.reject(
        new ApiSpecError("You can't set the assignment id")
      );
    }
    if (!assignmentData.name) {
      return Promise.reject(
        new ApiSpecError("You can't create an assignment without a name")
      );
    }
    return this.sendRequest(
      "POST",
      `${this.API_BASE_URL}/`,
      assignmentData
    ) as Promise<AxiosResponse<Assignment>>;
  }

  /**
   * Call Update Assignment API
   * https://garnbarn.github.io/garnbarn-backend/#/api?id=update-assignment
   *
   * @returns Promise of AxiosResponse for the request in fulfilled state.
   */
  update(
    id: number,
    updateField: AssignmentApi
  ): Promise<AxiosResponse<Assignment>> {
    if (updateField.id) {
      return Promise.reject(
        new ApiSpecError("You can't update the assignment id")
      );
    }
    return this.sendRequest(
      "PATCH",
      `${this.API_BASE_URL}/${id}`,
      updateField
    ) as Promise<AxiosResponse<Assignment>>;
  }

  /**
   * Call Delete Assignment API
   * https://garnbarn.github.io/garnbarn-backend/#/api?id=delete-assignment
   *
   * @param id The ID of assignment that you want to get
   * @returns Promise of AxiosResponse  for the request in fulfilled state.
   */
  delete(id: number): Promise<AxiosResponse> {
    return this.sendRequest("DELETE", `${this.API_BASE_URL}/${id}`);
  }
}
