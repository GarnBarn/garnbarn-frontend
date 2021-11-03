import { AssignmentApis } from "@/services/GarnBarnApi/apis/v1/AssignmentApis";

export type BulkApiResponse<R = any> = {
  count: number;
  next: GetAllAssignmentApiNextFunctionWrapper | null;
  previous: GetAllAssignmentApiNextFunctionWrapper | null;
  results: Array<R>;
};

export type GetAllAssignmentApiNextFunctionWrapper = () => ReturnType<
  AssignmentApis["all"]
>;
