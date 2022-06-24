import {FC} from "react";
import {ListViewProvider, QueryRequestProvider, QueryResponseProvider} from '../core';
import {TableConfig} from "@emms/models";
import {DataTableContainer} from "./DataTableContainer";

const DataTable: FC<TableConfig> = ({
      columns,
      queryId,
      getData,
      cacheTime,
      refetchOnWindowFocus,
      hasServerSidePaging,
      keepPreviousData
  }) => (
  <QueryRequestProvider>
    <QueryResponseProvider
      queryId={queryId}
      getData={getData}
      cacheTime={cacheTime}
      refetchOnWindowFocus={refetchOnWindowFocus}
      hasServerSidePaging={!!hasServerSidePaging}
      keepPreviousData={keepPreviousData}>
      <ListViewProvider>
        <DataTableContainer columns={columns}/>
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {DataTable};
