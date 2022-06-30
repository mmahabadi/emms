import {FC, useState} from "react";
import {SelectInput, withInput} from "@emms/ui-kit";
import {getAsyncAssetCategories} from "./core/service";
import {Controller} from "react-hook-form";
import {AssetCategory} from "@emms/models";

const InputController: FC<any> = ({name, form: {control}}) => {
  const [state, setState] = useState(null);
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value, ref } }) =>
      {
        const handleChange = (newVal: any) => {
          setState(newVal);
          onChange(newVal?.id);
        }
        return  <SelectInput
            value={state}
            onChange={handleChange}
            closeMenuOnSelect={false}
            loadOptions={getAsyncAssetCategories}
            getOptionLabel={(item: AssetCategory) => item.name}
            getOptionValue={(item: AssetCategory) => item.id}
          />
      }}
    />
  )
}
const SelectAssetCat = withInput(InputController);
export {SelectAssetCat}
