import {Column} from 'react-table';
import {FC} from "react";

export type TableConfig = {
  columns: DataTableColumn[];
  queryId: string;
  getData: (props: any) => {}
  cacheTime?: number;
  keepPreviousData?: boolean;
  refetchOnWindowFocus?: boolean;
  hasServerSidePaging?: boolean;
}

type COLUMN = {
  Header: FC | string;
  id: string;
  cell?: FC;
  accessor?: string; // accessor is the "key" in the data
}
export type DataTableColumn<T extends object = Record<string, unknown>> = Column<T> & COLUMN
