import React, {FC, useEffect, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {Activity} from "@emms/models";
import {useIntl} from "react-intl";
import {
  Datepicker,
  mapFormValues,
  ModalFormContainer, SelectInput,
  setFormValues,
  TextInput,
  useAppState,
  useModalConfig
} from "@emms/ui-kit";
import {SelectAsset, SelectOrg} from "../../../../helpers";
import {v4 as uuidv4} from "uuid";
import {saveJobRequest} from "../../core/services";
import {SelectRequestType} from "../../../../helpers/components/Enum/RequestTypeType";
import {SelectImportanceType} from "../../../../helpers/components/Enum/ImportanceType";
import {SelectDamage} from "../../../../helpers/components/SelectDamage/SelectDamage";

// const formSchema = yup.object().shape({
//   org: yup.object().required(),
//   code: yup.string().required(),
//   name: yup.string().required(),
//   invalidFrom: yup.string().nullable(),
// });

export const JobRequestEntryForm: FC = () => {
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
      onSubmit={saveJobRequest}
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
          <SelectAsset
            label="ASSETS.ASSET"
            name='asset'
            required={true}
            form={form}/>
        </div>
        <div className="col-lg-6">
          <SelectImportanceType
            label="JOBS.IMPORTANCE_TYPE"
            name='importanceType'
            required={true}
            form={form}/>
        </div>
        <div className="col-lg-6">
          <SelectRequestType
            label="JOBS.REQUEST_TYPE"
            name='requestType'
            required={true}
            form={form}/>
        </div>
        <div className="col-lg-6">
          <SelectDamage
            label="JOBS.DAMAGE"
            name='damage'
            required={true}
            form={form}/>
        </div>
        <div className="col-lg-6">
          <Datepicker
            label="JOBS.REQUEST_DATE"
            name='requestDate'
            required={true}
            form={form}/>
        </div>
        <div className="col-lg-6">
          <Datepicker
            label="JOBS.CREATED_AT"
            name='createAt'
            required={true}
            form={form}/>
        </div>
      </div>
    </ModalFormContainer>
  )
}


