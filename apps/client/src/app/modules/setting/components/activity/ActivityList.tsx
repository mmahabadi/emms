import {FC, useEffect} from "react";
import {getActivities} from "../../core/services";
import {DataTable, KTSVG, useModalConfig} from "@emms/ui-kit";
import {Assets, Button, DataTableColumn} from "@emms/models";
import {QUERIES} from "../../../../helpers/queries";
import {ActivityFilter} from "./ActivityFilter";
import {ActivityEntryForm} from "./ActivityEntryForm";

export const ActivityList: FC = () => {
  const {updateConfig: updateModalConfig} = useModalConfig();

  useEffect(() => {
    updateModalConfig({bodyComponent: ActivityEntryForm, isLarge: true});
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
        updateModalConfig({show: true, title: 'SETTING.ACTIVITY.ADD'});
      },
      className: 'btn-primary'
    },
  ] as Button[];

  const actions = [
    {
      icon: 'edit',
      click: (item: Assets) => {
        updateModalConfig({show: true, title: 'SETTING.ACTIVITY.EDIT', selectedItem: item});
      }
    }
  ] as Button[];

  return (
    <DataTable
      columns={columns}
      queryId={QUERIES.ACTIVITY_LIST}
      getData={getActivities}
      cacheTime={15}
      toolbar={toolbar}
      filterComponent={ActivityFilter}
      hasServerSidePaging={true}
      actions={actions}
    />
  )
}
