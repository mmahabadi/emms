import {FC} from "react";
import {DataTableColumn} from "@emms/models";
import {DataTable} from "@emms/ui-kit";
import {QUERIES} from "../../../queries";
import {getAssetCategories} from "../core/services";

export const AssetsCategoryList: FC = () => {
  const columns = [
    { Header: 'GENERAL.CODE', accessor: 'code'},
    { Header: 'GENERAL.NAME', accessor: 'name'},
  ] as DataTableColumn[];

  return (
    <DataTable
      columns={columns}
      queryId={QUERIES.ASSETS_CAT_LIST}
      getData={getAssetCategories}
      cacheTime={60 * 10 * 1000}
      hasServerSidePaging={true}
    />
  )
}
