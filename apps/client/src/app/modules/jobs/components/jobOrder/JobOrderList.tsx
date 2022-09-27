import {FC, useEffect} from "react";
import {getJobOrders} from "../../core/services";
import {DataTable, KTSVG, useModalConfig} from "@emms/ui-kit";
import {Assets, Button, DataTableColumn} from "@emms/models";
import {QUERIES} from "../../../../helpers/queries";
import {JobOrderEntryForm} from "./JobOrderEntryForm";
import {JobOrderFilter} from "./JobOrderFilter";

export const JobOrderList: FC = () => {
  const {updateConfig: updateModalConfig} = useModalConfig();

  useEffect(() => {
    updateModalConfig({bodyComponent: JobOrderEntryForm, isLarge: true});
  }, []);

  const columns = [
    { Header: 'GENERAL.ASSET', accessor: 'asset'},
    { Header: 'GENERAL.PRIORITY', accessor: 'priority'},
    { Header: 'GENERAL.TYPE', accessor: 'type'},
    { Header: 'GENERAL.DATE', accessor: 'date'}
  ] as DataTableColumn[];

  const toolbar = [
    {
      icon: <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />,
      text: 'GENERAL.ADD',
      click: () => {
        updateModalConfig({show: true, title: 'JOBS.JOB_ORDER.ADD'});
      },
      className: 'btn-primary'
    },
  ] as Button[];

  const actions = [
    {
      icon: 'edit',
      click: (item: Assets) => {
        updateModalConfig({show: true, title: 'JOBS.JOB_ORDER.EDIT', selectedItem: item});
      }
    }
  ] as Button[];

  return (
    <DataTable
      columns={columns}
      queryId={QUERIES.JOB_ORDER_LIST}
      getData={getJobOrders}
      cacheTime={15}
      toolbar={toolbar}
      filterComponent={JobOrderFilter}
      hasServerSidePaging={true}
      actions={actions}
    />
  )
}
