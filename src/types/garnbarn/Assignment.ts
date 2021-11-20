import { Tag } from "./Tag";

export type Assignment = {
  id: number;
  name: string;
  author: string;
  description?: string;
  reminderTime?: Array<number>;
  dueDate?: number;
  tag?: Tag;
};

export type AssignmentsInDay = {
  date: Date;
  assignments: Array<Assignment>;
};

export type DateWithAssignments = {
  dateWithAssignments: Array<AssignmentsInDay>;
};
