import {UseFormReturn} from "react-hook-form/dist/types";

export type InputPropTypes = {
  form: UseFormReturn<any>,
  name: string,
  label?: string,
  placeholder?: string,
  type?: 'text' | 'number' | 'tel' | 'email' | 'password',
  className?: string,
  required?: boolean,
  vertical?: boolean,
  showValidation?: boolean,
}

export const ValidationErrors = {
  required: 'VALIDATION.REQUIRED'
} as const;
