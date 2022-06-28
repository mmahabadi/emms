import {useEffect} from 'react'
import {useQueryRequest, useQueryResponse} from "../../../core";
import {initialQueryState, KTSVG, MenuComponent} from "@emms/ui-kit";
import {useIntl} from "react-intl";
import {useDataTableConfig} from "../../../core/TableConfigProvider";
import {SubmitHandler, useForm} from "react-hook-form";

const TableFilter = () => {
  const {filterComponent: FilterComponent} = useDataTableConfig();
  const {updateState} = useQueryRequest();
  const {isLoading} = useQueryResponse();
  const intl = useIntl();

  useEffect(() => {
    MenuComponent.reinitialization()
  }, []);

  const resetData = () => {
    updateState({filter: undefined, ...initialQueryState})
  }

  if(!FilterComponent){
    return <></>
  }

  const { handleSubmit, register, control } = useForm();

  const onSubmit: SubmitHandler<any> = async (values) => {
      updateState({
      filter: values,
      ...initialQueryState,
    })
  };

  return (
    <>
      <button
        disabled={isLoading}
        type='button'
        className='btn btn-light-primary me-3'
        data-kt-menu-trigger='click'
        data-kt-menu-placement='bottom-end'
      >
        <KTSVG path='/media/icons/duotune/general/gen031.svg' className='svg-icon-2' />
        {intl.formatMessage({id: 'DATATABLE.FILTER'})}
      </button>

      <div className='menu menu-sub menu-sub-dropdown w-300px w-md-325px' data-kt-menu='true'>
        <div className='px-7 py-5'>
          <div className='fs-5 text-dark fw-bolder'>
            {intl.formatMessage({id: 'DATATABLE.FILTERS'})}
          </div>
        </div>

        <div className='separator border-gray-200'></div>

        <div className='px-7 py-5' data-kt-user-table-filter='form'>
          <form
            className='form w-100'
            onSubmit={handleSubmit(onSubmit)}
            onReset={resetData}
          >

            <FilterComponent register={register} control={control}/>

            <div className='d-flex justify-content-end'>
              <button
                disabled={isLoading}
                type='reset'
                className='btn btn-light btn-active-light-primary fw-bold me-2 px-6'
                data-kt-menu-dismiss='true'
                data-kt-user-table-filter='reset'
              >
                {intl.formatMessage({id: 'DATATABLE.RESET'})}
              </button>

              <button
                type='submit'
                disabled={isLoading}
                className='btn btn-primary fw-bold px-6'
                data-kt-menu-dismiss='true'
                data-kt-user-table-filter='filter'
              >
                {intl.formatMessage({id: 'DATATABLE.APPLY'})}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export {TableFilter}
