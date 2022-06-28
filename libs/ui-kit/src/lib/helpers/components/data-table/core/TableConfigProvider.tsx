import {createContext, FC, PropsWithChildren, useContext} from "react";
import {DataTableConfig} from "@emms/models";
import {initialDataTableConfig} from "../../../crud-helper/models";

const TableConfigContext = createContext<DataTableConfig>(initialDataTableConfig);

const TableConfigProvider: FC<PropsWithChildren<any>> = ({children, config}) => {
  const {columns, queryId} = config;

  if (!columns?.length) {
    console.error('DataTable: columns could not be empty');
  }
  if (!queryId) {
    console.error('DataTable: queryId could not be empty');
  }
  return (
    <TableConfigContext.Provider value={{...config}}>
      {children}
    </TableConfigContext.Provider>
  )
}

const useDataTableConfig = () => useContext(TableConfigContext);
export {TableConfigProvider, useDataTableConfig}
