import {FC} from "react";
import {ListViewProvider, QueryRequestProvider, QueryResponseProvider} from '../core';
import {DataTableConfig} from "@emms/models";
import {DataTableContainer} from "./DataTableContainer";
import {TableHeader} from "./components/header/TableHeader";
import {TableConfigProvider} from "../core/TableConfigProvider";

const DataTable: FC<DataTableConfig> = (config) => (
  <TableConfigProvider config={config}>
    <QueryRequestProvider>
      <QueryResponseProvider>
        <ListViewProvider>
          <TableHeader/>
          <DataTableContainer/>
        </ListViewProvider>
      </QueryResponseProvider>
    </QueryRequestProvider>
  </TableConfigProvider>
)

export {DataTable};
