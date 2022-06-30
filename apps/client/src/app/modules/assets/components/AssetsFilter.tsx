import {FC} from 'react';
import {useIntl} from "react-intl";
import {SelectAssetCat, SelectLocation} from "../../../helpers";
import {UseFormReturn} from "react-hook-form/dist/types";
import {TextInput} from "@emms/ui-kit";

type Props = {
  form: UseFormReturn
}
export const AssetsFilter: FC<Props> = ({form}) => {
  const intl = useIntl();
  const {register, control, formState: { errors, isSubmitted }} = form;

  return (
    <>
      <TextInput
        label="GENERAL.CODE"
        name="code"
        vertical={true}
        form={form}/>

      <TextInput
        label="GENERAL.NAME"
        name="name"
        vertical={true}
        form={form}/>

      <SelectAssetCat
        label="ASSETS.CAT"
        name='cat'
        vertical={true}
        form={form}/>

      <SelectLocation
        label="GENERAL.LOCATION"
        name='location'
        vertical={true}
        form={form}/>

  </>
  )
}
