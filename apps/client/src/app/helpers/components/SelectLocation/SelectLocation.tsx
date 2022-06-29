import {FC, useState} from "react";
import {SelectInput} from "@emms/ui-kit";
import {getAsyncLocations} from "./core/service";
import {Controller} from "react-hook-form";
import {AssetCategory} from "@emms/models";

export const SelectLocation: FC<any> = ({name, control}) => {
  const [state, setState] = useState(null);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange } }) =>
      {
        const handleChange = (newVal: any) => {
          setState(newVal);
          onChange(newVal?.id);
        }
        return  <SelectInput
            value={state}
            onChange={handleChange}
            closeMenuOnSelect={false}
            loadOptions={getAsyncLocations}
            getOptionLabel={(item: AssetCategory) => item.name}
            getOptionValue={(item: AssetCategory) => item.id}
          />
      }}
    />
  )
}