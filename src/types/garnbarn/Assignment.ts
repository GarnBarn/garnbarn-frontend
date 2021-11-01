import { Tag } from "./Tag";

export type Assignment = {
  id: number;
  name: string;
  description?: string;
  reminderTime?: Array<Number>;
  dueDate?: number;
  tag?: Tag;
};

export type AssignmentsInDay = {
  date: string;
  assignments: Array<Assignment>;
};

export type DateWithAssignments = {
  dateWithAssignments: Array<AssignmentsInDay>;
};
