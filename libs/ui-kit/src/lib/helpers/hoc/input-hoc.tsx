import {AssetCategory, ID, InputPropTypes, ValidationErrors} from "@emms/models";
import {useIntl} from "react-intl";
import clsx from "clsx";
import {Controller, useFieldArray} from "react-hook-form";
import {SelectInput} from "../components/fields/Select";
import {KTSVG} from "../components/KTSVG";

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

const withArrayField = (Component: any, columns: string[]) => {
  return (props: InputPropTypes) => {
    const intl = useIntl();
    const { control } = props.form;
    const { fields, append, remove } = useFieldArray({
      control, // control props comes from useForm (optional: if you are using FormContext)
      name: props.name, // unique name for your Field Array
    });

    const colSpan = 3 + columns.length;

    const removeBtn = (remove: any, index: number) => {
      return <button
        type="button"
        onClick={() => remove(index)}
        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm btn-remove'>
        <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
      </button>
    }

    const expandBtn = (expand: boolean, setExpand: any) => {
      return <a onClick={() => setExpand(!expand)}>
        <KTSVG path={`/media/icons/duotune/arrows/${expand ? 'arr072' : 'arr074'}.svg`} className='svg-icon-3' />
      </a>
    }
    return (
      <table className="table table-row-bordered form-array table-row-gray-100 align-middle gs-0 gy-3">
        <thead>
        <tr className='fw-bolder text-muted'>
          <td className='w-15px'></td>
          <th className='w-25px'>#</th>
          {columns.map(col => <th key={col} className='min-w-150px'>{intl.formatMessage({id: col})}</th>)}
          <th className='w-50px'></th>
        </tr>
        </thead>
        {fields && Array.isArray(fields) &&   fields.map((item, index) => {
          return (
            <Component
              key={item.id}
              {...props}
              index={index}
              field={item}
              remove={remove}
              removeBtn={removeBtn}
              expandBtn={expandBtn}
              columns={columns}
            />
          );
        })}
        <tfoot>
        <tr>
          <td colSpan={colSpan - 1}></td>
          <td>
            <button
              type="button"
              onClick={() => {
                append({});
              }}
              className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm btn-add'>
              <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-3' />
            </button>
          </td>
        </tr>
        </tfoot>
      </table>
    )
  }
}

export {withInput, withAsyncSelect, withArrayField};
