import {InputPropTypes, ValidationErrors} from "@emms/models";
import {useIntl} from "react-intl";
import clsx from "clsx";

const withInput = (Component: any) => {
    return (props: InputPropTypes) => {
      const intl = useIntl();
      const {
         form, label, name, required = false,
         vertical = false, showValidation = false} = props;
      const {formState: { errors }} = form;
      const errorType: string = errors && errors[name]?.type || '';
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const errorMessage = errorType && ValidationErrors[errorType];

      return(
        <div className='row mb-5'>
          {label &&
            <label className={clsx(
              'col-form-label fw-bold fs-6',
              {'required': required},
              {'col-lg-4': !vertical}
            )}>
              {intl.formatMessage({id: label})}
            </label>
          }
          <div className={vertical ? '' : 'col-lg-8'}>
            <Component {...props} />
            {showValidation && errors[name] && errorMessage && label && (
              <div className='fv-plugins-message-container'>
                <span role='alert' className="text-danger">
                  {intl.formatMessage({id: errorMessage},
                  {name: intl.formatMessage({id: label})})}</span>
              </div>
            )}
          </div>
        </div>
      )
    }
}

export {withInput};
