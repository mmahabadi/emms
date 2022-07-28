import {FC, useEffect} from "react";
import {Assets, Button, DataTableColumn} from "@emms/models";
import {DataTable, KTSVG, useModalConfig} from "@emms/ui-kit";
import {QUERIES} from "../../../helpers/queries";
import {getAssetCategories} from "../core/services";
import {AssetsCatFilter} from "./AssetsCatFilter";
import {AssetEntryForm} from "./AssetCatEntryForm";

export const AssetsCategoryList: FC = () => {
  const {updateConfig: updateModalConfig} = useModalConfig();

  useEffect(() => {
    updateModalConfig({bodyComponent: AssetEntryForm, isLarge: true});
  }, []);

  const columns = [
    { Header: 'GENERAL.CODE', accessor: 'code'},
    { Header: 'GENERAL.NAME', accessor: 'name'},
  ] as DataTableColumn[];

  const toolbar = [
    {
      icon: <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />,
      text: 'GENERAL.ADD',
      click: () => {
        updateModalConfig({show: true, title: 'ASSETS.CAT.ADD'});
      },
      className: 'btn-primary'
    },
  ] as Button[];

  const actions = [
    {
      icon: 'edit',
      click: (item: Assets) => {
        updateModalConfig({show: true, title: 'ASSETS.CAT.EDIT', selectedItem: item});
      }
    }
  ] as Button[];

  return (
    <DataTable
      columns={columns}
      queryId={QUERIES.ASSETS_CAT_LIST}
      getData={getAssetCategories}
      cacheTime={15}
      toolbar={toolbar}
      actions={actions}
      hasServerSidePaging={true}
      filterComponent={AssetsCatFilter}
    />
  )
}
