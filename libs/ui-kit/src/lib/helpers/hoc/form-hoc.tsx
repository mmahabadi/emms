import {FormPropType} from "@emms/models";
import {useIntl} from "react-intl";

const withForm = (Component: any) => {
  return (props: FormPropType) => {
    const intl = useIntl();
    const {form, submitHandler, handleCancel, isLoading} = props;
    const {handleSubmit, formState: {isSubmitting}} = form;

    return (
      <form
        className='form w-100'
        onSubmit={handleSubmit(submitHandler)}
        noValidate
      >
        <Component {...props}/>

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
}

function getFormValues<T>(values: T): T {
  const entry = {} as T;
  Object.entries(values).forEach(([key, value]) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    entry[key] = value && typeof value == 'object' ? value['id'] : value;
  });
  return entry;
}
function setFormValues<T>(form: any, values: T): void {
  if (values) {
    const {setValue} = form;
    Object.entries(values).forEach(([key, value]) => {
      if (value && typeof value == 'object') {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setValue(`${key}Id`, {id: value?.id, name: value?.name});
      } else {
        setValue(key, value);
      }
    });
  }
}

export {withForm, getFormValues, setFormValues}
