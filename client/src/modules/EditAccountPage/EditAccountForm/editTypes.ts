export enum EditFieldsNames {
  USERNAME = "username",
  EMAIL = "email",
  COLOR = "color",
}

export interface EditFieldsTypes {
  [EditFieldsNames.USERNAME]: string;
  [EditFieldsNames.EMAIL]: string;
  [EditFieldsNames.COLOR]: string;
}
