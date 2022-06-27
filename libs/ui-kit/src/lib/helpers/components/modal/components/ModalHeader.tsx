import {KTSVG, useModalConfig} from "@emms/ui-kit";
import {useIntl} from "react-intl";

const ModalHeader = () => {
  const {config, updateConfig} = useModalConfig();
  const intl = useIntl();

  const closeHandler = () => {
    updateConfig({show: false});
  }

  return (
    <div className='modal-header'>
      {/* begin::Modal title */}
      <h3 className='fw-bolder'>{config?.title && intl.formatMessage({id: `${config?.title}`})}</h3>
      {/* end::Modal title */}

      {/* begin::Close */}
      <div
        className='btn btn-icon btn-sm btn-active-icon-primary'
        data-kt-users-modal-action='close'
        onClick={closeHandler}
        style={{cursor: 'pointer'}}
      >
        <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
      </div>
      {/* end::Close */}
    </div>
  )
}

export {ModalHeader}
