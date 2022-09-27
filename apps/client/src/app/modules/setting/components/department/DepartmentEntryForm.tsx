import {FC, useEffect, useState} from "react";
import * as yup from "yup";
import {SubmitHandler, useForm} from "react-hook-form";
import {Department} from "@emms/models";
import {yupResolver} from "@hookform/resolvers/yup";
import {useIntl} from "react-intl";
import {Datepicker, mapFormValues, setFormValues, TextInput, useAppState, useModalConfig} from "@emms/ui-kit";
import {SelectOrg} from "../../../../helpers";
import {saveDepartment} from "../../core/services";
import {v4 as uuidv4} from "uuid";

const formSchema = yup.object().shape({
  org: yup.object().required(),
  code: yup.string().required(),
  name: yup.string().required(),
  invalidFrom: yup.string().nullable(),
});

export const DepartmentEntryForm: FC = () => {
  const intl = useIntl();
  const {updateConfig: updateModalConfig, config: {selectedItem}} = useModalConfig();
  const form = useForm<Department>({
    resolver: yupResolver(formSchema),
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
      invalidFrom: selectedItem?.invalid_from,
    };
    if(!selectedItem) values.id = uuidv4()
    delete values.invalid_from;
    setFormValues(form, values);
  }

  const onSubmit: SubmitHandler<Department> = async (values) => {
    const entry = mapFormValues<Department>(values);
    setLoading(true);
    try {
      await saveDepartment(entry);
      setLoading(false);
      closeModal();
      refetchGridData && refetchGridData();
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const closeModal = () => {
    updateModalConfig({show: false, selectedItem: null});
  }

  return (
    <form
      className='form w-100'
      onSubmit={handleSubmit(onSubmit)}
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
          <Datepicker
            label="GENERAL.INVALID_FROM"
            name="invalidFrom"
            form={form}
          />
        </div>
      </div>

      <div className='text-center pt-15'>
        <button
          type='reset'
          className='btn btn-light me-3'
          onClick={closeModal}
        >
          {intl.formatMessage({id: 'GENERAL.CANCEL'})}
        </button>
        <button
          type='submit'
          className='btn btn-primary'
        >
          <span className='indicator-label'>
          {!(isSubmitting || isLoading) && intl.formatMessage({id: 'GENERAL.SAVE'})}
            {(isSubmitting || isLoading) && (
              <>
                {intl.formatMessage({id: 'GENERAL.LOADING'})}{' '}
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </>
            )}
          </span>
        </button>
      </div>
    </form>
  )
}
