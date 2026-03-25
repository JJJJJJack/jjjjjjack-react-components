import { ObjectKey } from "./utils.types";

export type SelectOption = {
  label: string;
  value: any;
  [k: ObjectKey]: any;
};
