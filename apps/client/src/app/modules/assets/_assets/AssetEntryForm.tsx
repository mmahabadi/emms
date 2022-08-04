import {FC, useEffect} from "react";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {Assets} from "@emms/models";
import {yupResolver} from "@hookform/resolvers/yup";
import {Datepicker, ModalFormContainer, setFormValues, TextInput, useModalConfig} from "@emms/ui-kit";
import {SelectAsset, SelectAssetCat, SelectLocation, SelectOrg} from "../../../helpers";
import {saveAsset} from "../core/services";
import {v4 as uuidv4} from 'uuid';

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
  const {config: {selectedItem}} = useModalConfig();
  const form = useForm<Assets>({
    resolver: yupResolver(formSchema),
  });

  useEffect(() => {
    prepareEditForm();
  }, [selectedItem]);

  const prepareEditForm = () => {
    const values = {
      ...selectedItem,
      invalidFrom: selectedItem?.invalid_from,
      plateNo: selectedItem?.plate_no,
    };
    delete values.invalid_from;
    delete values.plate_no;
    if(!selectedItem) values.id = uuidv4();
    setFormValues(form, values);
  }

  return (
    <ModalFormContainer
      form={form}
      onSubmit={saveAsset}
    >
      <div className="row">
        <div className="col-lg-6">
          <SelectOrg
            label="GENERAL.ORG"
            name='org'
            form={form}/>
        </div>
        <div className="col-lg-6">
          <SelectAssetCat
            label="ASSETS.CAT"
            name='assetCat'
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
            name='location'
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
    </ModalFormContainer>
  )
}
