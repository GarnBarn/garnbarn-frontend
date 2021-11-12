export type AccountDetail = {
  displayName: string;
  profileImage: string;
  platform: {
    line?: string;
  };
};

export enum SupportThirdPartyPlatform {
  LINE = "line",
}

export type AnyJson = {
  [key: string]: string;
};
