import {
  AccountDetail,
  AnyJson,
  SupportThirdPartyPlatform,
} from "@/types/GarnBarnApi/AccountApi";
import { AxiosResponse } from "axios";
import { api, ApiSpecError } from "./api";

export default class AccountApis extends api {
  API_BASE_URL = "/api/v1/account";

  /**
   * Call Get Account Detail Api
   * TODO: Specify the API document url
   *
   * @param uid The uid of the user you want to get their profile.
   * @returns The Promise of AxiosResponse of AccountDetail in fulled state.
   */
  getAccountDetail(uid?: string): Promise<AxiosResponse<AccountDetail>> {
    let url = `${this.API_BASE_URL}/`;
    if (uid) {
      url += `?uid=${uid}`;
    }
    return this.sendRequest("GET", url) as Promise<
      AxiosResponse<AccountDetail>
    >;
  }

  /**
   * Call Link Third Party Platform API
   * TODO: Specify the API document url
   *
   * @param platform The Platform that you want to link GarnBarn Account
   * @param credential Each platform required diffrient credential, Please follow the API document strictly.
   * @returns The Promise of AxiosResponse in fulled state.
   */
  linkAccount(
    platform: SupportThirdPartyPlatform,
    credential: AnyJson
  ): Promise<AxiosResponse> {
    const body = {
      platform: platform,
      credential: credential,
    };
    return this.sendRequest("POST", `${this.API_BASE_URL}/account/link/`, body);
  }

  /**
   * Call Unlink Third Party Platform API
   * TODO: Specify the API document url
   *
   * @param platform The Platform that you want to unlink GarnBarn Account
   * @returns The Promise of AxiosResponse in fulled state.
   */
  unlinkAccount(platform: SupportThirdPartyPlatform): Promise<AxiosResponse> {
    const body = {
      platform: platform,
    };
    return this.sendRequest(
      "POST",
      `${this.API_BASE_URL}/account/unlink/`,
      body
    );
  }
}
