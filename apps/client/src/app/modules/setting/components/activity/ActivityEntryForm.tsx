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
import {saveActivity, saveGoods} from "../../core/services";
import {v4 as uuidv4} from "uuid";
import {ActivityList} from "./ActivityList";
import {SelectActivity} from "../../../../helpers/components/SelectActivity/SelectActivity";
import Table from 'react-bootstrap/Table';
import { CloudPlus } from 'react-bootstrap-icons';
import {SelectGoods} from "../../../../helpers/components/SelectGoods/SelectGoods";
import {SkillFormArray} from "../../../../helpers/components/Activities/SkillFormArray";
import {SkillOnlyFormArray} from "../../../../helpers/components/Activities/SkillOnlyFormArray";
import {GoodsFormArray} from "../../../../helpers/components/SelectGoods/GoodsFormArray";
import {saveAssetCategory} from "../../../assets/core/services";

// const formSchema = yup.object().shape({
//   org: yup.object().required(),
//   code: yup.string().required(),
//   name: yup.string().required(),
//   invalidFrom: yup.string().nullable(),
// });

export const ActivityEntryForm: FC = () => {
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

  // const onSubmit: SubmitHandler<Activity> = async (values) => {
  //   const entry = mapFormValues<Activity>(values);
  //   console.log(entry)
  //   setLoading(true);
  //   try {
  //     await saveActivity(entry);
  //     setLoading(false);
  //     closeModal();
  //     refetchGridData && refetchGridData();
  //   } catch (error) {
  //     console.error(error);
  //     setLoading(false);
  //   }
  // };
  //
  // const closeModal = () => {
  //   updateModalConfig({show: false, selectedItem: null});
  // }

  return (
    <ModalFormContainer
      form={form}
      onSubmit={saveActivity}
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
          <TextInput
            label="GENERAL.CODE"
            name="code"
            required={true}
            showValidation={true}
            form={form}/>
        </div>
        <div className="col-lg-6">
          <TextInput
            label="GENERAL.NAME"
            name="name"
            required={true}
            showValidation={true}
            form={form}/>
        </div>
        <div className="col-lg-6">
          <SelectActivity
            label="GENERAL.PARENT"
            name="parent"
            form={form}
          />
        </div>

        <div className="row">
          <div className="col-12">
            <SkillOnlyFormArray
              name='skills'
              form={form}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <GoodsFormArray
              name='goods'
              form={form}
            />
          </div>
        </div>
      </div>
    </ModalFormContainer>
  )
}


