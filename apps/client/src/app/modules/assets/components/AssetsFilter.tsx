import {FC} from 'react';
import {useIntl} from "react-intl";
import {SelectAssetCat} from "../../../helpers";
import {SelectLocation} from "../../../helpers/components/SelectLocation/SelectLocation";

export const AssetsFilter: FC<any> = ({register, control}) => {
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
      <div className='mb-10'>
        <label className='form-label fs-6 fw-bold'>{intl.formatMessage({id: `ASSETS.CAT`})}:</label>
        <SelectAssetCat name='cat' control={control}/>
      </div>
      <div className='mb-10'>
        <label className='form-label fs-6 fw-bold'>{intl.formatMessage({id: `GENERAL.LOCATION`})}:</label>
        <SelectLocation name='location' control={control}/>
      </div>

  </>
  )
}
