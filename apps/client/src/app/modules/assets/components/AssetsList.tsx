import {FC, useEffect} from "react";
import {getAssets} from "../core/services";
import {DataTable, KTSVG, useModalConfig} from "@emms/ui-kit";
import {Assets, Button, DataTableColumn} from "@emms/models";
import {QUERIES} from "../../../helpers/queries";
import {AssetsFilter} from "./AssetsFilter";
import {AssetEntryForm} from "./AssetEntryForm";

export const AssetsList: FC = () => {
  const {updateConfig: updateModalConfig} = useModalConfig();

  useEffect(() => {
    updateModalConfig({bodyComponent: AssetEntryForm, isLarge: true});
  }, []);

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
      click: () => {
        updateModalConfig({show: true, title: 'ASSETS.ASSET.ADD'});
      },
      className: 'btn-primary'
    },
  ] as Button[];

  const actions = [
    {
      icon: 'edit',
      click: (item: Assets) => {
        updateModalConfig({show: true, title: 'ASSETS.ASSET.EDIT', selectedItem: item});
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
