import {FC, useEffect} from "react";
import {ModalFormContainer, setFormValues, TextInput, useModalConfig} from "@emms/ui-kit";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {AssetCategory} from "@emms/models";
import {saveAssetCategory} from "../core/services";
import {ActivitiesFormArray, SelectAsset} from "../../../helpers";
import {v4 as uuidv4} from "uuid";

const formSchema = yup.object().shape({
  code: yup.string().required(),
  name: yup.string().required(),
  title: yup.string().required(),
  parent: yup.object().nullable(),
});

export const AssetCatEntryForm: FC = () => {
  const {config: {selectedItem}} = useModalConfig();

  useEffect(() => {
    prepareEditForm();
  }, [selectedItem]);

  const form = useForm<AssetCategory>({
    resolver: yupResolver(formSchema)
  });

  const prepareEditForm = () => {
    const values = {
      ...selectedItem,
    };
    if(!selectedItem) values.id = uuidv4()
    setFormValues(form, values);
  }

  return (
    <ModalFormContainer
      form={form}
      onSubmit={saveAssetCategory}
    >
      <div className="row">
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
          <TextInput
            label="GENERAL.TITLE"
            name="title"
            required={true}
            showValidation={true}
            form={form}/>
        </div>
        <div className="col-lg-6">
          <SelectAsset
            label="GENERAL.PARENT"
            name='parent'
            form={form}/>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <ActivitiesFormArray
            name='activities'
            form={form}
          />
        </div>
      </div>
    </ModalFormContainer>
  )
}
