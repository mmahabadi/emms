import {FC, useEffect, useState} from "react";
import * as yup from "yup";
import {SubmitHandler, useForm} from "react-hook-form";
import {Assets} from "@emms/models";
import {yupResolver} from "@hookform/resolvers/yup";
import {useIntl} from "react-intl";
import {Datepicker, getFormValues, setFormValues, TextInput, useModalConfig} from "@emms/ui-kit";
import {SelectAsset, SelectAssetCat, SelectLocation, SelectOrg} from "../../../helpers";

const formSchema = yup.object().shape({
  assetCatId: yup.object().required(),
  code: yup.string().required(),
  locationId: yup.object().nullable(),
  name: yup.string().required(),
  parentId: yup.object().nullable(),
  plateNo: yup.string().nullable(),
  invalidFrom: yup.string().nullable(),
});

export const AssetEntryForm: FC = () => {
  const intl = useIntl();
  const {updateConfig: updateModalConfig, config: {selectedItem}} = useModalConfig();
  const form = useForm<Assets>({
    resolver: yupResolver(formSchema),
  });
  const {handleSubmit, formState: {isSubmitting, errors}} = form;
  const [isLoading, setLoading] = useState(false);

  console.log('errors', errors, selectedItem);


  useEffect(() => {
    prepareEditForm();
  }, [selectedItem]);

  const prepareEditForm = () => {
    const values = {
      ...selectedItem,
      invalidFrom: '2022-07-05',//selectedItem?.invalid_from,
      plateNo: selectedItem?.plate_no,
    };
    delete values.invalid_from;
    delete values.plate_no;
    console.log('update form ', values)
    setFormValues(form, values);
  }

  const onSubmit: SubmitHandler<Assets> = async (values) => {
    const entry = getFormValues<Assets>(values);
    console.log('submit', entry);
    // setLoading(true);
    // try {
    //   const res = await saveAsset(entry);
    //   console.log(res);
    //   setLoading(false);
    //   handleCancel();
    //
    // } catch (error) {
    //   console.error(error);
    //   setLoading(false);
    // }
  };

  const handleCancel = () => {
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
            name='orgId'
            form={form}/>
        </div>
        <div className="col-lg-6">
          <SelectAssetCat
            label="ASSETS.CAT"
            name='assetCatId'
            required={true}
            showValidation={true}
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
          <SelectAsset
            label="GENERAL.PARENT"
            name='parentId'
            form={form}/>
        </div>
        <div className="col-lg-6">
          <SelectLocation
            label="GENERAL.LOCATION"
            name='locationId'
            form={form}/>
        </div>
        <div className="col-lg-6">
          <TextInput
            label="ASSETS.PLATE_NO"
            name="plateNo"
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
          onClick={handleCancel}
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
