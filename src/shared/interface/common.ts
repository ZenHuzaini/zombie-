export interface ListResult<DateType = string> {
  Created?: DateType;
  Modified?: DateType;
  ID?: string;
  Author?: UserInfo;
  Editor?: UserInfo;
  GUID?: string;
}

export interface UserInfo {
  ID: string;
  Title: string;
  EMail: string;
}
