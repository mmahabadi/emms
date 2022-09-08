import {withArrayField} from "@emms/ui-kit";
import React, {FC, useState} from "react";
import {SelectActivity} from "../SelectActivity/SelectActivity";
import {GoodsFormArray} from "../SelectGoods/GoodsFormArray";
import {FormArrayInput} from "@emms/models";
import {SkillFormArray} from "./SkillFormArray";

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
      {expand && <tr>
         <td colSpan={4} className="p-5 sub-table">
           <div className="row">
             <div className="col-md-6">
               <GoodsFormArray name={`${name}.${index}.goods`} form={form}/>
             </div>
             <div className="col-md-6">
               <SkillFormArray name={`${name}.${index}.skills`} form={form}/>
             </div>
           </div>
         </td>
       </tr>}
    </tbody>
  );
}
const ActivitiesFormArray = withArrayField(formControl, ['GENERAL.ACTIVITY']);
export {ActivitiesFormArray}
