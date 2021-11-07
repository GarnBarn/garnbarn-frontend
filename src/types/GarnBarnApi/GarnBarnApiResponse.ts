import { AssignmentApis } from "@/services/GarnBarnApi/apis/v1/AssignmentApis";
import TagApis from "@/services/GarnBarnApi/apis/v1/TagApis";

export type BulkApiResponse<R = any, NextFunction = null> = {
  count: number;
  next: NextFunction | null;
  previous: NextFunction | null;
  results: Array<R>;
};

export type GetAllAssignmentApiNextFunctionWrapper = () => ReturnType<
  AssignmentApis["all"]
>;

export type GetAllTagApiNextFunctionWrapper = () => ReturnType<TagApis["all"]>;
