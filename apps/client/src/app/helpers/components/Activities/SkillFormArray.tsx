import {TextInput, withArrayField} from "@emms/ui-kit";
import React, {FC} from "react";
import {FormArrayInput} from "@emms/models";
import {SelectSkill} from "../SelectSkill/SelectSkill";

const formControl: FC<FormArrayInput> = ({index, name, form, remove, removeBtn}) => {
  return (
    <tbody>
      <tr>
        <td></td>
        <td>{index + 1}</td>
        <td>
          <SelectSkill
            name={`${name}.${index}.skill`}
            form={form}/>
        </td>
        <td>
          <TextInput
            name={`${name}.${index}.time`}
            form={form}/>
        </td>
        <td>
          {removeBtn(remove, index)}
        </td>
      </tr>
    </tbody>
  );
}
const SkillFormArray = withArrayField(formControl, ['GENERAL.SKILLS', 'GENERAL.TIME']);
export {SkillFormArray}
