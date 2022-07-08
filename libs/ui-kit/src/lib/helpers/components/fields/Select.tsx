import {FC} from "react";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import {useIntl} from "react-intl";

export const SelectInput: FC<any> = (props) => {
  const intl = useIntl();
  const Component = props?.loadOptions ? AsyncSelect : Select;
  return (
    <Component
      cacheOptions
      defaultOptions
      styles={customStyles}
      placeholder={intl.formatMessage({id: 'GENERAL.SEARCH'}) + '...'}
      noOptionsMessage={() => intl.formatMessage({id: 'GENERAL.NO_RESULT'})}
      loadingMessage={() => intl.formatMessage({id: 'GENERAL.LOADING'})}
      isClearable
      isRtl={true}
      {...props}
    />
  )
}

const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: 'transparent',
    border: 0,
    color: 'var(--bs-gray-700)',
    boxShadow: 'none',
    '&:hover': {
      border: 0,
      boxShadow: 'none'
    }
  })
}
