import {FC} from "react";
import {getAssets} from "../core/services";
import {DataTable} from "@emms/ui-kit";
import {DataTableColumn} from "@emms/models";
import {QUERIES} from "../../../queries";

export const AssetsList: FC = () => {
  const columns = [
    { Header: 'GENERAL.CODE', accessor: 'code'},
    { Header: 'GENERAL.ASSET_CAT', accessor: 'assetCat.name'},
    { Header: 'GENERAL.NAME', accessor: 'name'},
  ] as DataTableColumn[];

  return (
    <DataTable
      columns={columns}
      queryId={QUERIES.ASSETS_LIST}
      getData={getAssets}
      cacheTime={60 * 10 * 1000}
    />
  )
}