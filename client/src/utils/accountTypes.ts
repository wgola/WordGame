export enum AccountFieldsNames {
  USERNAME = "username",
  EMAIL = "email",
  PASSWORD = "password",
  COLOR = "color",
}

export interface AccountFieldsTypes {
  [AccountFieldsNames.USERNAME]: string;
  [AccountFieldsNames.EMAIL]: string;
  [AccountFieldsNames.PASSWORD]: string;
  [AccountFieldsNames.COLOR]: string;
}
