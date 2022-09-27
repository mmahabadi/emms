import {FC, useEffect} from "react";
import {getJobRequests} from "../../core/services";
import {DataTable, KTSVG, useModalConfig} from "@emms/ui-kit";
import {Assets, Button, DataTableColumn} from "@emms/models";
import {QUERIES} from "../../../../helpers/queries";
import {JobRequestEntryForm} from "./JobRequestEntryForm";
import {JobRequestFilter} from "./JobRequestFilter";

export const JobRequestList: FC = () => {
  const {updateConfig: updateModalConfig} = useModalConfig();

  useEffect(() => {
    updateModalConfig({bodyComponent: JobRequestEntryForm, isLarge: true});
  }, []);

  const columns = [
    { Header: 'JOBS.ASSET', accessor: 'asset.name'},
    { Header: 'JOBS.IMPORTANCE_TYPE', accessor: 'importanceType'},
    { Header: 'JOBS.REQUEST_TYPE', accessor: 'requestType'},
    { Header: 'GENERAL.DATE', accessor: 'requestDate'}
  ] as DataTableColumn[];

  const toolbar = [
    {
      icon: <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />,
      text: 'GENERAL.ADD',
      click: () => {
        updateModalConfig({show: true, title: 'JOBS.JOB_REQUEST.ADD'});
      },
      className: 'btn-primary'
    },
  ] as Button[];

  const actions = [
    {
      icon: 'edit',
      click: (item: Assets) => {
        updateModalConfig({show: true, title: 'JOBS.JOB_REQUEST.EDIT', selectedItem: item});
      }
    }
  ] as Button[];

  return (
    <DataTable
      columns={columns}
      queryId={QUERIES.JOB_REQUEST_LIST}
      getData={getJobRequests}
      cacheTime={15}
      toolbar={toolbar}
      filterComponent={JobRequestFilter}
      hasServerSidePaging={true}
      actions={actions}
    />
  )
}
