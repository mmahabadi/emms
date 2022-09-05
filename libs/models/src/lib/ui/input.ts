import {UseFormReturn} from "react-hook-form/dist/types";
import {SubmitHandler} from "react-hook-form";

export type InputPropTypes = {
  form: UseFormReturn<any>,
  name: string,
  label?: string,
  placeholder?: string,
  type?: 'text' | 'number' | 'tel' | 'email' | 'password',
  className?: string,
  required?: boolean,
  horizontal?: boolean,
  showValidation?: boolean,
}

export type FormArrayInput = InputPropTypes & {
  index: number;
  columns: Array<string>;
  field: any;
  remove: any;
  removeBtn: any;
  expandBtn: any;
}

export const ValidationErrors = {
  required: 'VALIDATION.REQUIRED'
} as const;

export type FormPropType = {
  form: any;
  submitHandler: SubmitHandler<any>;
  handleCancel: () => void;
  isLoading: boolean;
}
