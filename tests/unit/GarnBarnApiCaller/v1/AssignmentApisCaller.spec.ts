import axios, { AxiosStatic, Method } from "axios";
import { createMock } from "ts-auto-mock";
import firebase from "firebase";
import GarnBarnApi from "@/services/GarnBarnApi/GarnBarnApi";
import GarnBarnApiConfig from "@/GarnBarnApiConfig.json";
import { AssignmentApi } from "@/types/GarnBarnApi/AssignmentApi";
import { Assignment } from "@/types/garnbarn/Assignment";
import { api, ApiSpecError } from "@/services/GarnBarnApi/apis/v1/api";

jest.mock("axios");

interface AxiosMock extends AxiosStatic {
  mockResolvedValue: Function;
  mockRejectedValue: Function;
}

const MOCK_RESPONSE: any = {
  id: 1,
  name: "Example Assignment",
  description: "This is example",
  dueDate: 1634745493,
  tag: {
    id: 1,
    name: "ISP",
    color: "#4285F4",
  },
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

function generateAssignmentObject(
  assignment: any,
  assignmentApi: AssignmentApi
): Assignment {
  for (const [key, value] of Object.entries(assignmentApi)) {
    if (key == "tagId") {
      continue;
    }
    assignment[key] = value;
  }
  return assignment as Assignment;
}

describe("Test Assignment APIs v1 Caller", () => {
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
      data: MOCK_RESPONSE,
    });
  });

  test("Test calling Get Assignment API with valid data", async () => {
    const apiResponse = await garnBarnApiCaller.v1.assignments.get(1);
    expect(mockAxios).toHaveBeenCalledWith(
      generateRequestDetail(ID_TOKEN, "GET", "/api/v1/assignment/1/")
    );
    expect(apiResponse.data).toBe(MOCK_RESPONSE);
  });

  test("Test calling Create Assignment API with valid data", async () => {
    const mockAssignmentData = {
      name: "Example Assignment",
      description: "This is example",
      dueDate: 1634745493,
      tagId: 1,
    };
    const apiResponse = await garnBarnApiCaller.v1.assignments.create(
      mockAssignmentData
    );
    expect(mockAxios).toBeCalledWith(
      generateRequestDetail(
        ID_TOKEN,
        "POST",
        "/api/v1/assignment/",
        mockAssignmentData
      )
    );
    expect(apiResponse.data).toBe(MOCK_RESPONSE);
  });

  test("Test calling Create Assignment API while providing the id", async () => {
    const mockAssignmentData = {
      id: 2,
      name: "Example Assignment",
      description: "This is example",
      dueDate: 1634745493,
      tagId: 1,
    };
    // User can't set the assignment id and the api caller must throw the ApiSpecError
    expect(() => {
      garnBarnApiCaller.v1.assignments.create(mockAssignmentData);
    }).toThrow(new ApiSpecError("You can't set the assignment id"));
  });

  test("Test calling Create Assignment API while not providing the name of assignment", () => {
    const mockAssignmentData = {
      description: "This is example",
      dueDate: 1634745493,
      tagId: 1,
    };
    expect(() => {
      garnBarnApiCaller.v1.assignments.create(mockAssignmentData);
    }).toThrow(
      new ApiSpecError("You can't create an assignment without a name")
    );
  });

  test("Test calling Update Assignment API with valid data", async () => {
    const mockAssignmentApiData = {
      name: "Example Assignment",
      description: "This is example",
      dueDate: 1634745493,
      tagId: 1,
    };
    mockAxios.mockResolvedValue({
      data: generateAssignmentObject(MOCK_RESPONSE, mockAssignmentApiData),
    });
    const apiResponse = await garnBarnApiCaller.v1.assignments.update(
      1,
      mockAssignmentApiData
    );
    expect(mockAxios).toBeCalledWith(
      generateRequestDetail(
        ID_TOKEN,
        "PATCH",
        "/api/v1/assignment/1/",
        mockAssignmentApiData
      )
    );
    expect(apiResponse.data).toBe(
      generateAssignmentObject(MOCK_RESPONSE, mockAssignmentApiData)
    );
  });

  test("Test calling Update Assignment API while providing the assignment id", () => {
    const mockAssignmentApiData = {
      id: 2,
      name: "Example Assignment",
      description: "This is example",
      dueDate: 1634745493,
      tagId: 1,
    };

    expect(() => {
      garnBarnApiCaller.v1.assignments.update(1, mockAssignmentApiData);
    }).toThrow(new ApiSpecError("You can't update the assignment id"));
  });

  test("Test calling Delete Assignment API", async () => {
    mockAxios.mockResolvedValue({
      data: {},
    });

    const apiResponse = await garnBarnApiCaller.v1.assignments.delete(1);
    expect(mockAxios).toBeCalledWith(
      generateRequestDetail(ID_TOKEN, "DELETE", "/api/v1/assignment/1/")
    );
    expect(apiResponse.data).toEqual({});
  });

  test("Test Get All Assignments API", async () => {
    const mockResponse = {
      count: 2,
      next: null,
      previous: null,
      results: [
        {
          id: 50,
          tag: null,
          name: "Test1234",
          dueDate: null,
          timestamp: 1635261404498,
          description: "Hereeeee!",
        },
        {
          id: 51,
          tag: null,
          name: "Test1234",
          dueDate: null,
          timestamp: 1635261459056,
          description: "Hereeeee!",
        },
      ],
    };
    mockAxios.mockResolvedValue({ data: mockResponse });
    const apiResponse = await garnBarnApiCaller.v1.assignments.all();
    expect(mockAxios).toBeCalledWith(
      generateRequestDetail(ID_TOKEN, "GET", "/api/v1/assignment/")
    );
    expect(apiResponse.data).toEqual(mockResponse);
  });
});
