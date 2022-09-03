import React, {FC, useEffect, useState} from "react";
import * as yup from "yup";
import {SubmitHandler, useForm} from "react-hook-form";
import {Activity} from "@emms/models";
import {yupResolver} from "@hookform/resolvers/yup";
import {useIntl} from "react-intl";
import {Datepicker, mapFormValues, setFormValues, TextInput, useAppState, useModalConfig} from "@emms/ui-kit";
import {SelectOrg} from "../../../../helpers";
import {saveActivity, saveGoods} from "../../core/services";
import {v4 as uuidv4} from "uuid";
import {ActivityList} from "./ActivityList";
import {SelectActivity} from "../../../../helpers/components/SelectActivity/SelectActivity";
import Table from 'react-bootstrap/Table';
import { CloudPlus } from 'react-bootstrap-icons';
import {SelectGoods} from "../../../../helpers/components/SelectGoods/SelectGoods";

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
    console.log(values)
  }

  const onSubmit: SubmitHandler<Activity> = async (values) => {
    const entry = mapFormValues<Activity>(values);
    setLoading(true);
    try {
      await saveActivity(entry);
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

  console.log('ejra shoodam qashangam azize shooxo shangam')
  const handleAddGoods = () => {
    let goods = form?.getValues(`goods`);
    if(!goods){
      goods=[{id:"" }]
    }else{
      goods?.push({id:"" });
    }
    form.setValue(`goods`, goods);
    // form.register(`${'goods'}`, {value :goods});
    // form.trigger()
    console.log(form.getValues("goods"))
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
          <SelectActivity
            label="GENERAL.PARENT"
            name="parent"
            form={form}
          />
        </div>

        <div className="col-lg-6">
          <TextInput
            label="GENERAL.SKILL"
            name="skills"
            form={form}/>
        </div>
        {/*<div className="col-lg-12">*/}
          <Table striped bordered>
          <thead>
          <tr>
            <th>{intl.formatMessage({id: 'GENERAL.GOODS'})}</th>
          </tr>
          </thead>
          <tbody>
          {form && form.getValues("goods") && Array.isArray(form.getValues("goods")) && form.getValues("goods")?.map((td: any, index:number)=>(
            <tr>
             <td key={index} >
               <SelectGoods
                 name="goods"
                 form={form}/>
             </td>
            </tr>
            )
          )
          }
          </tbody>
          <button
            type='button'
            className='btn btn-sm btn-icon btn- color-primary btn-active-light-primary'
            data-kt-menu-trigger='click'
            data-kt-menu-placement='bottom-end'
            data-kt-menu-flip='top-end'
            onClick={() => handleAddGoods()}
          ><CloudPlus/>
          </button>
          </Table>
        {/*</div>*/}
        {/*<div className="col-lg-6">*/}
        {/*  <Datepicker*/}
        {/*    label="GENERAL.INVALID_FROM"*/}
        {/*    name="invalidFrom"*/}
        {/*    form={form}*/}
        {/*  />*/}
        {/*</div>*/}
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


