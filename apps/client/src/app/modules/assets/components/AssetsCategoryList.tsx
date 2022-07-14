import {FC} from "react";
import {DataTableColumn} from "@emms/models";
import {DataTable} from "@emms/ui-kit";
import {QUERIES} from "../../../helpers/queries";
import {getAssetCategories} from "../core/services";
import {AssetsFilter} from "./AssetsFilter";

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
      cacheTime={15}
      hasServerSidePaging={true}
      filterComponent={AssetsFilter}
    />
  )
}
