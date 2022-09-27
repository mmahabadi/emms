import {withArrayField} from "@emms/ui-kit";
import React, {FC, useState} from "react";
import {SelectActivity} from "../SelectActivity/SelectActivity";
import {FormArrayInput} from "@emms/models";

const formControl: FC<FormArrayInput> = ({index, name, form, remove, removeBtn, expandBtn}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [expand, setExpand] = useState(false);

  return (
    <tbody>
      <tr>
        <td>
          {expandBtn(expand, setExpand)}
        </td>
        <td>{index + 1}</td>
        <td>
          <SelectActivity
            name={`${name}.${index}`}
            form={form}/>
        </td>
        <td>
          {removeBtn(remove, index)}
        </td>
      </tr>
    </tbody>
  );
}
const ActivitiesOnlyFormArray = withArrayField(formControl, ['GENERAL.ACTIVITY']);
export {ActivitiesOnlyFormArray}
