import React, {FC, useEffect, useState} from "react";
import * as yup from "yup";
import {SubmitHandler, useForm} from "react-hook-form";
import {Activity} from "@emms/models";
import {yupResolver} from "@hookform/resolvers/yup";
import {useIntl} from "react-intl";
import {
  Datepicker,
  mapFormValues,
  ModalFormContainer,
  setFormValues,
  TextInput,
  useAppState,
  useModalConfig
} from "@emms/ui-kit";
import {ActivitiesFormArray, SelectOrg} from "../../../../helpers";
import {saveActivity, saveGoods} from "../../../setting/core/services";
import {v4 as uuidv4} from "uuid";
import {ActivityList} from "../../../setting/components/activity/ActivityList";
import {SelectActivity} from "../../../../helpers/components/SelectActivity/SelectActivity";
import Table from 'react-bootstrap/Table';
import { CloudPlus } from 'react-bootstrap-icons';
import {SelectGoods} from "../../../../helpers/components/SelectGoods/SelectGoods";
import {SkillFormArray} from "../../../../helpers/components/Activities/SkillFormArray";
import {SkillOnlyFormArray} from "../../../../helpers/components/Activities/SkillOnlyFormArray";
import {GoodsFormArray} from "../../../../helpers/components/SelectGoods/GoodsFormArray";
import {saveJobOrder} from "../../core/services";
import {SelectDepartment} from "../../../../helpers/components/SelectDepartment/SelectDepartment";
import {ActivitiesOnlyFormArray} from "../../../../helpers/components/Activities/ActivitiesOnlyFormArray";

// const formSchema = yup.object().shape({
//   org: yup.object().required(),
//   code: yup.string().required(),
//   name: yup.string().required(),
//   invalidFrom: yup.string().nullable(),
// });

export const JobOrderEntryForm: FC = () => {
  const intl = useIntl();
  const {updateConfig: updateModalConfig, config: {selectedItem}} = useModalConfig();
  const form = useForm<Activity>({
    // resolver: yupResolver(formSchema),
  });
  const {handleSubmit, formState: {isSubmitting}} = form;
  const [isLoading, setLoading] = useState(false);
  const {appState: {refetchGridData}} = useAppState();

  useEffect(() => {
    prepareEditForm();
  }, [selectedItem]);

  const prepareEditForm = () => {
    const values = {
      ...selectedItem,
      // invalidFrom: selectedItem?.invalid_from,
    };
    if(!selectedItem) values.id = uuidv4()
    // if(!selectedItem) values.goods = [];
    // delete values.invalid_from;
    setFormValues(form, values);
  }

  return (
    <ModalFormContainer
      form={form}
      onSubmit={saveJobOrder}
      // onSubmit={handleSubmit(onSubmit)}
    >
      <div className="row">
        <div className="col-lg-6">
          <SelectOrg
            label="GENERAL.ORG"
            name='org'
            required={true}
            form={form}/>
        </div>
        <div className="col-lg-6">
          <Datepicker
            label="GENERAL.PLANNING_START_TIME"
            name="planningStartTime"
            required={true}
            showValidation={true}
            form={form}/>
        </div>
        <div className="col-lg-6">
          <Datepicker
            label="GENERAL.PLANNING_END_TIME"
            name="planningEndTime"
            required={true}
            showValidation={true}
            form={form}/>
        </div>
        <div className="row">
          <div className="col-12">
            <GoodsFormArray
              label="GENERAL.GOODS"
              name='goods'
              form={form}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <ActivitiesOnlyFormArray
              label="GENERAL.ACTIVITY"
              name='activities'
              form={form}
            />
          </div>
        </div>
        <div className="col-lg-6">
          <Datepicker
            label="GENERAL.CREATED_AT"
            name="createdAt"
            required={true}
            showValidation={true}
            form={form}/>
        </div>
        {/*<div className="col-lg-6">*todo add oper select/}
        {/*  <Datepicker*/}
        {/*    label="GENERAL.CREATED_By"*/}
        {/*    name="createdAt"*/}
        {/*    required={true}*/}
        {/*    showValidation={true}*/}
        {/*    form={form}/>*/}
        {/*</div>*/}
        <div className="col-lg-6">
          <SelectDepartment
            label="GENERAL.DEPARTMENT"
            name='department'
            required={true}
            form={form}/>
        </div>


      </div>
    </ModalFormContainer>
  )
}


