import {FC} from 'react';
import {useIntl} from "react-intl";

export const AssetsFilter: FC<any> = ({register}) => {
  const intl = useIntl();

  return (
    <>
      <div className='mb-10'>
        <label className='form-label fs-6 fw-bold'>{intl.formatMessage({id: `GENERAL.CODE`})}:</label>
        <input
          {...register("code")}
          type="text"
          className={'form-control form-control-lg form-control-solid'}
          autoComplete="off"
        />
      </div>
      <div className='mb-10'>
        <label className='form-label fs-6 fw-bold'>{intl.formatMessage({id: `GENERAL.NAME`})}:</label>
        <input
          {...register("name")}
          type="text"
          className={'form-control form-control-lg form-control-solid'}
          autoComplete="off"
        />
      </div>

  </>
  )
}
