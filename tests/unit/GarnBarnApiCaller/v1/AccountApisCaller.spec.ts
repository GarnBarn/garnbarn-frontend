import axios, { AxiosStatic, Method } from "axios";
import { createMock } from "ts-auto-mock";
import firebase from "firebase";
import GarnBarnApi from "@/services/GarnBarnApi/GarnBarnApi";
import GarnBarnApiConfig from "@/GarnBarnApiConfig.json";
import { SupportThirdPartyPlatform } from "@/types/GarnBarnApi/AccountApi";

jest.mock("axios");

interface AxiosMock extends AxiosStatic {
  mockResolvedValue: Function;
  mockRejectedValue: Function;
}

function generateRequestDetail(
  idToken: string,
  method: Method,
  url: string,
  data?: object
) {
  return {
    baseURL: GarnBarnApiConfig.apiPrefix,
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + idToken,
    },
    url: url,
    data: data,
  };
}

describe("Test Account APIs v1 Caller", () => {
  const ID_TOKEN = "Test;";
  const firebaseUser = createMock<firebase.User>({
    getIdToken(forceRefresh?: boolean | undefined): Promise<string> {
      return new Promise((resolve, reject) => {
        resolve(ID_TOKEN);
      });
    },
  });
  let mockAxios: AxiosMock = axios as AxiosMock;
  let garnBarnApiCaller = new GarnBarnApi(firebaseUser, mockAxios);

  beforeEach(() => {
    // Assign the mock promise resolved value;
    mockAxios.mockResolvedValue({
      data: {},
    });
  });

  test("Test calling Get Account Detail API", async () => {
    // Test w/o specify the uid number
    await garnBarnApiCaller.v1.accounts.getAccountDetail();
    expect(mockAxios).toHaveBeenCalledWith(
      generateRequestDetail(ID_TOKEN, "GET", "/api/v1/account/")
    );
    // Test specify the uid number
    await garnBarnApiCaller.v1.accounts.getAccountDetail(true, "123456");
    expect(mockAxios).toHaveBeenCalledWith(
      generateRequestDetail(ID_TOKEN, "GET", "/api/v1/account/?uid=123456")
    );
  });

  test("Test calling Link Third Party Account API", async () => {
    await garnBarnApiCaller.v1.accounts.linkAccount(
      SupportThirdPartyPlatform.LINE,
      {
        code: "1234",
      }
    );
    expect(mockAxios).toHaveBeenCalledWith(
      generateRequestDetail(ID_TOKEN, "POST", "/api/v1/account/link/", {
        platform: "line",
        credential: {
          code: "1234",
        },
      })
    );
  });

  test("Test calling Unlink Third Party Account API", async () => {
    await garnBarnApiCaller.v1.accounts.unlinkAccount(
      SupportThirdPartyPlatform.LINE
    );
    expect(mockAxios).toHaveBeenCalledWith(
      generateRequestDetail(ID_TOKEN, "POST", "/api/v1/account/unlink/", {
        platform: "line",
      })
    );
  });
});
