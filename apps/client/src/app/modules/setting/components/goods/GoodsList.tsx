import {FC, useEffect} from "react";
import {getGoodses} from "../../core/services";
import {DataTable, KTSVG, useModalConfig} from "@emms/ui-kit";
import {Assets, Button, DataTableColumn} from "@emms/models";
import {QUERIES} from "../../../../helpers/queries";
import {GoodsFilter} from "./../goods/GoodsFilter";
import {GoodsEntryForm} from "./GoodsEntryForm";

export const GoodsList: FC = () => {
  const {updateConfig: updateModalConfig} = useModalConfig();

  useEffect(() => {
    updateModalConfig({bodyComponent: GoodsEntryForm, isLarge: true});
  }, []);

  const columns = [
    { Header: 'GENERAL.CODE', accessor: 'code'},
    { Header: 'GENERAL.NAME', accessor: 'name'}
  ] as DataTableColumn[];

  const toolbar = [
    {
      icon: <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />,
      text: 'GENERAL.ADD',
      click: () => {
        updateModalConfig({show: true, title: 'SETTING.GOODS.ADD'});
      },
      className: 'btn-primary'
    },
  ] as Button[];

  const actions = [
    {
      icon: 'edit',
      click: (item: Assets) => {
        updateModalConfig({show: true, title: 'SETTING.GOODS.EDIT', selectedItem: item});
      }
    }
  ] as Button[];

  return (
    <DataTable
      columns={columns}
      queryId={QUERIES.GOODS_LIST}
      getData={getGoodses}
      cacheTime={15}
      toolbar={toolbar}
      filterComponent={GoodsFilter}
      actions={actions}
    />
  )
}
