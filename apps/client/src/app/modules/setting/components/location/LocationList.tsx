import {FC, useEffect} from "react";
import {getLocations} from "../../core/services";
import {DataTable, KTSVG, useModalConfig} from "@emms/ui-kit";
import {Assets, Button, DataTableColumn} from "@emms/models";
import {QUERIES} from "../../../../helpers/queries";
import {LocationFilter} from "./../location/LocationFilter";
import {LocationEntryForm} from "./LocationEntryForm";

export const LocationList: FC = () => {
  const {updateConfig: updateModalConfig} = useModalConfig();

  useEffect(() => {
    updateModalConfig({bodyComponent: LocationEntryForm, isLarge: true});
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
        updateModalConfig({show: true, title: 'SETTING.LOCATION.ADD'});
      },
      className: 'btn-primary'
    },
  ] as Button[];

  const actions = [
    {
      icon: 'edit',
      click: (item: Assets) => {
        updateModalConfig({show: true, title: 'SETTING.LOCATION.EDIT', selectedItem: item});
      }
    }
  ] as Button[];

  return (
    <DataTable
      columns={columns}
      queryId={QUERIES.LOCATION_LIST}
      getData={getLocations}
      cacheTime={15}
      toolbar={toolbar}
      filterComponent={LocationFilter}
      actions={actions}
    />
  )
}
