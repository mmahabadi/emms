import {FC} from "react";
import {getAssets} from "../core/services";
import {DataTable, KTSVG} from "@emms/ui-kit";
import {Assets, Button, DataTableColumn} from "@emms/models";
import {QUERIES} from "../../../helpers/queries";
import {AssetsFilter} from "./AssetsFilter";
import {useModalConfig} from "../../../../../../../libs/ui-kit/src/lib/helpers/components/modal/core/ModalProvider";

export const AssetsList: FC = () => {
  const {updateConfig: updateModalConfig} = useModalConfig();

  const columns = [
    { Header: 'GENERAL.CODE', accessor: 'code'},
    { Header: 'ASSETS.CAT', accessor: 'assetCat.name'},
    { Header: 'GENERAL.NAME', accessor: 'name'}
  ] as DataTableColumn[];

  const toolbar = [
    {
      icon: <KTSVG path='/media/icons/duotune/arrows/arr078.svg' className='svg-icon-2' />,
      text: 'ASSETS.REPORT',
      click: () => {console.log('export')}
    },
    {
      icon: <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />,
      text: 'GENERAL.ADD',
      click: () => {console.log('add')},
      className: 'btn-primary'
    },
  ] as Button[];

  const actions = [
    {
      icon: 'edit',
      click: (item: Assets) => {
        updateModalConfig({show: true, title: 'ASSETS.ASSET.EDIT'});
      }
    }
  ] as Button[];

  return (
    <DataTable
      columns={columns}
      queryId={QUERIES.ASSETS_LIST}
      getData={getAssets}
      cacheTime={15}
      toolbar={toolbar}
      filterComponent={AssetsFilter}
      actions={actions}
    />
  )
}
