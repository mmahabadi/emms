import {FC} from 'react';
import {UseFormReturn} from "react-hook-form/dist/types";
import {TextInput} from "@emms/ui-kit";

type Props = {
  form: UseFormReturn
}
export const ActivityFilter: FC<Props> = ({form}) => {
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
    </>
  )
}
