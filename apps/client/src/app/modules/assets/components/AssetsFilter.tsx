import {FC} from 'react';
import {SelectAssetCat, SelectLocation} from "../../../helpers";
import {UseFormReturn} from "react-hook-form/dist/types";
import {TextInput} from "@emms/ui-kit";

type Props = {
  form: UseFormReturn
}
export const AssetsFilter: FC<Props> = ({form}) => {
  return (
    <>
      <TextInput
        label="GENERAL.CODE"
        name="code"
        form={form}/>

      <TextInput
        label="GENERAL.NAME"
        name="name"
        form={form}/>

      <SelectAssetCat
        label="ASSETS.CAT"
        name='cat'
        form={form}/>

      <SelectLocation
        label="GENERAL.LOCATION"
        name='location'
        form={form}/>

  </>
  )
}
