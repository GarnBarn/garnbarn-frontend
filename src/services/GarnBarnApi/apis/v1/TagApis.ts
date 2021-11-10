import { Tag } from "@/types/garnbarn/Tag";
import {
  BulkApiResponse,
  GetAllTagApiNextFunctionWrapper,
} from "@/types/GarnBarnApi/GarnBarnApiResponse";
import { TagApi } from "@/types/GarnBarnApi/TagApi";
import { AxiosResponse } from "axios";
import { api, ApiSpecError } from "./api";

export default class TagApis extends api {
  API_BASE_URL = "/api/v1/tag";

  /**
   * Call Get Tag API
   * https://garnbarn.github.io/garnbarn-backend/#/api?id=get-tag
   *
   * @param id The ID of Tag
   * @returns Promise of AxiosResponse for the request in fulfilled state.
   */
  get(id: number): Promise<AxiosResponse<Tag>> {
    return this.sendRequest("GET", `${this.API_BASE_URL}/${id}/`) as Promise<
      AxiosResponse<Tag>
    >;
  }

  /**
   * Call Create Tag API
   * https://garnbarn.github.io/garnbarn-backend/#/api?id=create-tag
   *
   * @param tag The Information of the Tag to Create
   * @returns Promise of AxiosResponse for the request in fulfilled state.
   */
  create(tag: TagApi): Promise<AxiosResponse<Tag>> {
    if (!tag.name) {
      return Promise.reject(
        new ApiSpecError("You can't create a tag without a name")
      );
    }
    return this.sendRequest("POST", `${this.API_BASE_URL}/`, tag) as Promise<
      AxiosResponse<Tag>
    >;
  }

  async all(
    page?: number
  ): Promise<
    AxiosResponse<BulkApiResponse<Tag, GetAllTagApiNextFunctionWrapper>>
  > {
    let url = `${this.API_BASE_URL}/`;
    if (page) {
      // For adding Query Parameters
      url += `?page=${page}&`;
    }
    const response = await this.sendRequest("GET", url);
    const responseData = response.data as any;
    responseData.next = this.createNextMethodForGetAllTagApi(responseData.next);
    responseData.previous = this.createNextMethodForGetAllTagApi(
      responseData.previous
    );
    return response as AxiosResponse<
      BulkApiResponse<Tag, GetAllTagApiNextFunctionWrapper>
    >;
  }

  createNextMethodForGetAllTagApi(
    url: string | undefined
  ): GetAllTagApiNextFunctionWrapper | null {
    if (!url) {
      return null;
    }
    const processedUrl = `?${url?.split("?")[1]}`;
    const urlParams = new URLSearchParams(processedUrl);
    const page = urlParams.get("page");
    if (!page) {
      return () => {
        return this.all();
      };
    }
    return () => {
      return this.all(parseInt(page));
    };
  }

  /**
   * Call Update Tag API
   * https://garnbarn.github.io/garnbarn-backend/#/api?id=update-tag
   *
   * @param id The ID of the Tag to update
   * @param tag Tag Information that will be updated
   * @returns Promise of AxiosResponse for the request in fulfilled state.
   */
  update(id: number, tag: TagApi): Promise<AxiosResponse<Tag>> {
    return this.sendRequest(
      "PATCH",
      `${this.API_BASE_URL}/${id}/`,
      tag
    ) as Promise<AxiosResponse<Tag>>;
  }

  /**
   * Call Delete Tag API
   * https://garnbarn.github.io/garnbarn-backend/#/api?id=delete-tag
   *
   * @param id The ID of the tag to delete
   * @returns Promise of AxiosResponse for the request in fulfilled state.
   */
  delete(id: number): Promise<AxiosResponse<Tag>> {
    return this.sendRequest("DELETE", `${this.API_BASE_URL}/${id}/`) as Promise<
      AxiosResponse<Tag>
    >;
  }

  /**
   * Call Subscribe Tag API
   * TODO: Link to be filled.
   * 
   * @param id The ID of the tag to subscribe
   * @returns Promise of AxiosResponse for the request in fulfilled state.
   */
  subscribe(id: number): Promise<AxiosResponse<Tag>> {
    return this.sendRequest("POST", `${this.API_BASE_URL}/${id}/subscribe/`) as Promise<
      AxiosResponse<Tag>
    >;
  }

  /**
   * Call Unsubscribe Tag API
   * TODO: Link to be filled.
   * 
   * @param id the ID of the tag to unsubscribe
   * @returns Promise of AxiosResponse for the request in fulfilled state.
   */
  unsubscribe(id: number): Promise<AxiosResponse<Tag>> {
    return this.sendRequest("POST", `${this.API_BASE_URL}/${id}/unsubscribe/`) as Promise<
      AxiosResponse<Tag>
    >;
  }
}
