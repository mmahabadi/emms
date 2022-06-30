import {FC, useState} from "react";
import * as yup from "yup";
import {SubmitHandler, useForm} from "react-hook-form";
import {Assets} from "@emms/models";
import {yupResolver} from "@hookform/resolvers/yup";
import {useIntl} from "react-intl";
import {TextInput, useModalConfig} from "@emms/ui-kit";
import {SelectAssetCat, SelectLocation} from "../../../helpers";


const formSchema = yup.object().shape({
  assetCatId: yup.string().required(),
  code: yup.string().required(),
  locationId: yup.string(),
  name: yup.string().required(),
  parentId: yup.string(),
  plateNo: yup.string(),
  invalidFrom: yup.string(),
});

export const AssetEntryForm: FC = () => {
  const intl = useIntl();
  const {updateConfig: updateModalConfig} = useModalConfig();
  const form = useForm<Assets>({
    resolver: yupResolver(formSchema)
  });
  const {handleSubmit, formState: {isSubmitting}} = form;
  const [isLoading] = useState(true);
  const onSubmit: SubmitHandler<Assets> = async (values) => {
    console.log(values)
    // setLoading(true);
    // try {
    //   const {data: auth} = await login(values);
    //   saveAuth(auth);
    //   const {data: user} = await getUserByToken(auth.api_token);
    //   setCurrentUser(user)
    // } catch (error) {
    //   console.error(error)
    //   saveAuth(undefined)
    //   setHasErrors(true);
    //   setLoading(false);
    // }
  };

  const handleCancel = () => {
    updateModalConfig({show: false});
  }
  /*
  id: "6e0fdc1d-875f-46a6-b119-809535e85e94"
  identity: "{}"
  invalidFrom: null
  orgId: "67b9ff47-4b67-4dfa-b5d5-1b5b65f4e81b"
  parentId: "6e0fdc1d-875f-46a6-b119-809535e85e94"
   */
  return (
    <form
      className='form w-100'
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div className="row">
        <div className="col-lg-6">
          <SelectAssetCat
            label="ASSETS.CAT"
            name='assetCatId'
            vertical={true}
            required={true}
            showValidation={true}
            form={form}/>
        </div>
        <div className="col-lg-6">
          <TextInput
            label="GENERAL.CODE"
            name="code"
            vertical={true}
            required={true}
            showValidation={true}
            form={form}/>
        </div>
        <div className="col-lg-6">
          <TextInput
            label="GENERAL.NAME"
            name="name"
            vertical={true}
            required={true}
            showValidation={true}
            form={form}/>
        </div>
        <div className="col-lg-6">
          <SelectLocation
            label="GENERAL.LOCATION"
            name='locationId'
            vertical={true}
            showValidation={true}
            form={form}/>
        </div>
        <div className="col-lg-6">
          <TextInput
            label="ASSETS.PLATE_NO"
            name="plateNo"
            vertical={true}

            form={form}/>
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
          {intl.formatMessage({id: 'GENERAL.SAVE'})}
          </span>
          {(isSubmitting || isLoading) && (
             <span className='indicator-progress'>
               Please wait...{' '}
               <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
             </span>
           )}
        </button>
       </div>
    </form>
  )
}
