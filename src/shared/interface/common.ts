export interface ListResult<DateType = string> {
  Created?: DateType;
  Modified?: DateType;
  ID?: number;
  Author?: UserInfo;
  Editor?: UserInfo;
  GUID?: string;
}

export interface UserInfo {
  ID: number;
  Title: string;
  EMail: string;
}
