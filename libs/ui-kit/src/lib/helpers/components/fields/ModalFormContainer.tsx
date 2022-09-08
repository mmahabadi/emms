import {FC, useState} from "react";
import {UseFormReturn} from "react-hook-form/dist/types";
import {useIntl} from "react-intl";
import {useModalConfig} from "../modal/core/ModalProvider";
import {mapFormValues} from "../../hoc";
import {AssetCategory} from "@emms/models";
import {useAppState} from "../../core";

type PropTypes = {
  form: UseFormReturn<any>;
  children: any;
  onSubmit: (values: any) => void;
}
export const ModalFormContainer:FC<PropTypes> = ({form, children, onSubmit}) => {
  const [isLoading, setLoading] = useState(false);
  const intl = useIntl();
  const {closeModal} = useModalConfig();
  const {appState: {refetchGridData}} = useAppState();
  const {handleSubmit, formState: {isSubmitting}} = form;

  function getSubmitHandler<T>() {
    return async (values: any) => {
      const entry = mapFormValues<T>(values);
      setLoading(true);
      try {
        await onSubmit(entry);
        setLoading(false);
        closeModal();
        refetchGridData && refetchGridData();
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
  }

  const submitHandler = getSubmitHandler()
  return (
    <form
      className='form w-100'
      onSubmit={handleSubmit(submitHandler)}
    >
      {children}
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
  );
}
