import { Tag } from "./Tag";

export type Assignment = {
  id: string;
  name: string;
  description?: string;
  dueDate?: number;
  tagId?: Tag;
};

export type AssignmentsInDay = {
  date: string;
  assignments: Array<Assignment>;
};

export type DateWithAssignments = {
  dateWithAssignments: Array<AssignmentsInDay>;
};
