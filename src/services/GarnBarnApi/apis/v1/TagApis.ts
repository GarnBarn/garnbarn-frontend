import { Tag } from "@/types/garnbarn/Tag";
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
      throw new ApiSpecError("Name is needed to create the tag");
    }
    return this.sendRequest("POST", `${this.API_BASE_URL}/`, tag) as Promise<
      AxiosResponse<Tag>
    >;
  }

  /**
   * Call Update Tag API
   * https://garnbarn.github.io/garnbarn-backend/#/api?id=update-tag
   *
   * @param id The ID of the Tag to update
   * @param tag Tag Information that will be updated
   * @returns Promise of AxiosResponse for the request in fulfilled state.
   */
  update(id: number, tag: TagApis): Promise<AxiosResponse<Tag>> {
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
  delete(id: number): Promise<AxiosResponse> {
    return this.sendRequest("DELETE", `${this.API_BASE_URL}/${id}/`) as Promise<
      AxiosResponse<Tag>
    >;
  }
}
