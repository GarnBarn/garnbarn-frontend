export type TagApi = {
  name?: string;
  color?: string;
  reminderTime?: Array<number>;
  subscriber?: Array<number>;
};

export type totpBody = {
  code: string;
}