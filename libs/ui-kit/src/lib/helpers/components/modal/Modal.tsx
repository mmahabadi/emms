import {useEffect} from "react";
import {useModalConfig} from "./core/ModalProvider";
import {ModalHeader} from "./components/ModalHeader";
import clsx from "clsx";

const Modal = () => {
  useEffect(() => {
    document.body.classList.add('modal-open')
    return () => {
      document.body.classList.remove('modal-open')
    }
  }, []);

  const {config: {show, bodyComponent: BodyComponent, headerComponent, isLarge}} = useModalConfig();

  const Header = headerComponent ? headerComponent : ModalHeader;

  if (!show){
    return <></>
  }

  return (
    <>
      <div
        className='modal fade show d-block'
        id='kt_modal_add_user'
        role='dialog'
        tabIndex={-1}
        aria-modal='true'
      >
        {/* begin::Modal dialog */}
        <div className={clsx(
          'modal-dialog modal-dialog-centered',
          {'mw-1000px': isLarge},
          {'mw-650px': !isLarge},
        )}>
          {/* begin::Modal content */}
          <div className='modal-content'>
            <Header />
            {/* begin::Modal body */}
            <div className='modal-body scroll-y mx-5 my-3'>
              {BodyComponent && <BodyComponent/>}
            </div>
            {/* end::Modal body */}
          </div>
          {/* end::Modal content */}
        </div>
        {/* end::Modal dialog */}
      </div>
      {/* begin::Modal Backdrop */}
      <div className='modal-backdrop fade show'></div>
      {/* end::Modal Backdrop */}
    </>
  )
}

export {Modal}
