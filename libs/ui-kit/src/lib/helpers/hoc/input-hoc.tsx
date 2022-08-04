import {AssetCategory, ID, InputPropTypes, ValidationErrors} from "@emms/models";
import {useIntl} from "react-intl";
import clsx from "clsx";
import {Controller} from "react-hook-form";
import {SelectInput} from "../components/fields/Select";

const withInput = (Component: any) => {
    return (props: InputPropTypes) => {
      const intl = useIntl();
      const {
         form, label, name, required = false,
        horizontal = false, showValidation = false} = props;
      const {formState: { errors }} = form;
      const errorType: string = errors && errors[name]?.type || '';
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const errorMessage = errorType && ValidationErrors[errorType];

      return(
        <div className='row mb-5'>
          {label &&
            <label className={clsx(
              'col-form-label fw-bold fs-6',
              {'required': required},
              {'col-lg-4': !horizontal}
            )}>
              {intl.formatMessage({id: label})}
            </label>
          }
          <div className={!horizontal ? '' : 'col-lg-8'}>
            <Component {...props} />
            {showValidation && errors[name] && errorMessage && label && (
              <div className='fv-plugins-message-container'>
                <span role='alert' className="text-danger">
                  {intl.formatMessage({id: errorMessage},
                  {name: intl.formatMessage({id: label})})}</span>
              </div>
            )}
          </div>
        </div>
      )
    }
}

type SelectItemType = { id: ID, name: string } | null;

const withAsyncSelect = (getData: any) => {
  return (props: InputPropTypes) => {
    const {name, showValidation, className, form: {control, formState: { errors, isSubmitted }}} = props;
    let state: SelectItemType = null;

    return (
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value, ref } }) =>
        {
          console.log(value);

          if (value && value.id) {
            state = {id: value['id'] || null, name: value['name'] || ''};
          }
          const handleChange = (newVal: any) => {
            state = !newVal ? null : {id: newVal['id'] || null, name: newVal['name'] || ''};
            onChange(state);
          }
          return  <SelectInput
              value={state}
              onChange={handleChange}
              closeMenuOnSelect={false}
              loadOptions={getData}
              getOptionLabel={(item: AssetCategory) => item.name}
              getOptionValue={(item: AssetCategory) => item.id}
              className={clsx(className,
                'form-control pt-1 pb-1 form-control-solid',
                {'is-invalid': showValidation && isSubmitted && errors[name]},
                {'is-valid': showValidation && isSubmitted && !errors[name]}
              )}
              {...props}
            />
        }}
      />
    )
  }
}
export {withInput, withAsyncSelect};
