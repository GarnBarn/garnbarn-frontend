import axios, { AxiosStatic, Method } from "axios";
import { createMock } from "ts-auto-mock";
import firebase from "firebase";
import GarnBarnApi from "@/services/GarnBarnApi/GarnBarnApi";
import GarnBarnApiConfig from "@/GarnBarnApiConfig.json";
import { TagApi } from "@/types/GarnBarnApi/TagApi";
import { ApiSpecError } from "@/services/GarnBarnApi/apis/v1/api";
import { Tag } from "@/types/garnbarn/Tag";

jest.mock("axios");

interface AxiosMock extends AxiosStatic {
  mockResolvedValue: Function;
  mockRejectedValue: Function;
}

const MOCK_RESPONSE: Tag = {
  id: 1,
  author: "A",
  name: "ISP",
  color: "#4285F4",
};

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

function generateTagObject(tag: any, tagApi: TagApi): Tag {
  for (const [key, value] of Object.entries(tagApi)) {
    if (key == "tagId") {
      continue;
    }
    tag[key] = value;
  }
  return tag as Tag;
}

describe("Test Tag APIs v1 Caller", () => {
  const ID_TOKEN = "Test";
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
      data: MOCK_RESPONSE,
    });
  });

  test("Test calling Get Tag API with valid data", async () => {
    const apiResponse = await garnBarnApiCaller.v1.tags.get(1);
    expect(mockAxios).toHaveBeenCalledWith(
      generateRequestDetail(ID_TOKEN, "GET", "/api/v1/tag/1/")
    );
    expect(apiResponse.data).toBe(MOCK_RESPONSE);
  });

  test("Test calling Create Tag API with valid data", async () => {
    const mockTagData: TagApi = {
      name: "Example Tag",
      color: "#123456",
      reminderTime: [10, 20],
    };
    mockAxios.mockResolvedValue({
      data: mockTagData,
    });
    const apiResponse = await garnBarnApiCaller.v1.tags.create(mockTagData);
    expect(mockAxios).toBeCalledWith(
      generateRequestDetail(ID_TOKEN, "POST", "/api/v1/tag/", mockTagData)
    );
    expect(apiResponse.data).toBe(mockTagData);
  });

  test("Test calling Create Tag API while not providing the name of Tag", () => {
    const mockTagData: TagApi = {
      color: "#1234",
    };
    expect(() => {
      garnBarnApiCaller.v1.tags.create(mockTagData);
    }).toThrow(new ApiSpecError("You can't create a tag without a name"));
  });

  test("Test calling Update Tag API with valid data", async () => {
    const mockTagApiData: TagApi = {
      name: "Test",
      color: "#1234",
    };
    mockAxios.mockResolvedValue({
      data: generateTagObject(MOCK_RESPONSE, mockTagApiData),
    });
    const apiResponse = await garnBarnApiCaller.v1.tags.update(
      1,
      mockTagApiData
    );
    expect(mockAxios).toBeCalledWith(
      generateRequestDetail(ID_TOKEN, "PATCH", "/api/v1/tag/1/", mockTagApiData)
    );
    expect(apiResponse.data).toBe(
      generateTagObject(MOCK_RESPONSE, mockTagApiData)
    );
  });

  test("Test calling Delete Tag API", async () => {
    mockAxios.mockResolvedValue({
      data: {},
    });

    const apiResponse = await garnBarnApiCaller.v1.tags.delete(1);
    expect(mockAxios).toBeCalledWith(
      generateRequestDetail(ID_TOKEN, "DELETE", "/api/v1/tag/1/")
    );
    expect(apiResponse.data).toEqual({});
  });
});
