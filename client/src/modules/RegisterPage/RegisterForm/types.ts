export enum RegisterFieldsNames {
  USERNAME = "username",
  EMAIL = "email",
  PASSWORD = "password",
  COLOR = "color",
}

export interface RegisterFieldsTypes {
  [RegisterFieldsNames.USERNAME]: string;
  [RegisterFieldsNames.EMAIL]: string;
  [RegisterFieldsNames.PASSWORD]: string;
  [RegisterFieldsNames.COLOR]: string;
}
