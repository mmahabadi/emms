import {withArrayField} from "@emms/ui-kit";
import React, {FC} from "react";
import {FormArrayInput} from "@emms/models";
import {SelectGoods} from "../SelectGoods/SelectGoods";

const formControl: FC<FormArrayInput> = ({index, name, form, remove, removeBtn}) => {
  return (
    <tbody>
      <tr>
        <td></td>
        <td>{index + 1}</td>
        <td>
          <SelectGoods
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
const GoodsFormArray = withArrayField(formControl, ['GENERAL.GOODS']);
export {GoodsFormArray}
