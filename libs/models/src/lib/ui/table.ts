import {Column} from 'react-table';
import {FC} from "react";
import {Button} from "./button";

export type DataTableConfig = {
  columns: Array<DataTableColumn>;
  queryId: string;
  getData: (props: any) => {}
  cacheTime?: number;
  keepPreviousData?: boolean;
  refetchOnWindowFocus?: boolean;
  hasServerSidePaging?: boolean;
  toolbar?: Array<Button>;
  actions?: Array<Button>;
  filterComponent?: FC<any>
}

type COLUMN = {
  Header?: FC | string;
  id: string;
  cell?: FC;
  accessor?: string; // accessor is the "key" in the data
  isVisible?: boolean;
}
export type DataTableColumn<T extends object = Record<string, unknown>> = Column<T> & COLUMN;
