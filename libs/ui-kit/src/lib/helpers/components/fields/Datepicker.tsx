import {withInput} from "../../hoc/input-hoc";
import {FC} from "react";
import {InputPropTypes} from "@emms/models";
import {Controller} from "react-hook-form";
import DatePicker, {Value} from "react-multi-date-picker"
import clsx from "clsx";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import moment from 'jalali-moment';

const DatePickerController: FC<InputPropTypes> = (props) => {
  const {name, required, className, showValidation, form: {control, formState: {errors, isSubmitted}}} = props;
  let displayValue: Value | null = ' ';

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required }}
      render={({ field: { onChange, value } }) =>
      {
        //set control
        displayValue = value ? moment(value).locale('fa').format('YYYY/MM/DD') : ' ';

        const onChangeHandler = (date: any) => {
          let val = null;
          if (date?.isValid) {
            displayValue = date.format('YYYY/MM/DD');
            date?.convert(gregorian, gregorian_en);
            val = new Date(date.format('YYYY-MM-DD')).toISOString();
          }
          onChange(val);
        }

        return  (
          <DatePicker
            value={displayValue}
            onChange={onChangeHandler}
            calendar={persian}
            locale={persian_fa}
            containerStyle={{
              width: "100%"
            }}
            inputClass={clsx(className,
              'form-control form-control-lg form-control-solid',
              {'is-invalid': showValidation && isSubmitted && errors[name]},
              {'is-valid': showValidation && isSubmitted && !errors[name]}
            )}
          />
          )
      }}
    />
  )
}

const Datepicker = withInput(DatePickerController);
export {Datepicker}
