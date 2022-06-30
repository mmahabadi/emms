import {useIntl} from "react-intl";
import clsx from "clsx";
import {FC} from "react";
import {InputPropTypes} from "@emms/models";
import {withInput} from "./input-hoc";

const TextInputController: FC<InputPropTypes> = ({
   form, label, name, placeholder,
   type = 'text', className, required = false,
   showValidation = false}) => {
  const {register, formState: { errors, isSubmitted }} = form;
  const intl = useIntl();

  return (
    <input
      {...register(name, {required})}
      type={type}
      placeholder={placeholder && intl.formatMessage({id: placeholder})}
      className={clsx(className,
        'form-control form-control-lg form-control-solid',
        {'is-invalid': showValidation && isSubmitted && errors[name]},
        {'is-valid': showValidation && isSubmitted && !errors[name]}
      )}
      autoComplete="off"
    />
  );
}

const TextInput = withInput(TextInputController);
export {TextInput}
