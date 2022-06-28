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
    backgroundColor: 'var(--bs-gray-100)',
    border: 0,
    color: 'var(--bs-gray-700)',
    transition: 'color 0.2s ease, background-color 0.2s ease',
    padding: '0.4rem',
    boxShadow: 'none',
    '&:hover': {
      border: 0,
      borderColor: 'transparent',
      boxShadow: 'none',
      backgroundColor: '#eef3f7'
    },
    '&:focus': {
      backgroundColor: '#eef3f7'
    }
  })
}
