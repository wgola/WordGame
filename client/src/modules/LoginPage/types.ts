export enum LoginFieldsNames {
  USERNAME = "username",
  PASSWORD = "password",
}

export interface LoginFieldsTypes {
  [LoginFieldsNames.USERNAME]: string;
  [LoginFieldsNames.PASSWORD]: string;
}
