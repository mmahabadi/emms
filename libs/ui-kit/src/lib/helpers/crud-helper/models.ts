import {Dispatch, SetStateAction} from 'react';
import {ID, PaginationState, Response} from "@emms/models";

export type SortState = {
  sort?: string
  order?: 'asc' | 'desc'
}

export type FilterState = {
  filter?: unknown
}

export type SearchState = {
  search?: string
}

export type QueryState = PaginationState & SortState & FilterState & SearchState

export type QueryRequestContextProps = {
  state: QueryState
  updateState: (updates: Partial<QueryState>) => void
}

export const initialQueryState: QueryState = {
  page: 1,
  pageSize: 10
}

export const initialQueryRequest: QueryRequestContextProps = {
  state: initialQueryState,
  updateState: () => {},
}

export type QueryResponseContextProps<T> = {
  response?: Response<Array<T>> | undefined
  refetch: () => void
  isLoading: boolean
  query: string
  hasServerSidePaging?: boolean
}

export const initialQueryResponse = {refetch: () => {}, isLoading: false, query: '', hasServerSidePaging: false}

export type ListViewContextProps = {
  selected: Array<ID>
  onSelect: (selectedId: ID) => void
  onSelectAll: () => void
  clearSelected: () => void
  // NULL => (CREATION MODE) | MODAL IS OPENED
  // NUMBER => (EDIT MODE) | MODAL IS OPENED
  // UNDEFINED => MODAL IS CLOSED
  itemIdForUpdate?: ID
  setItemIdForUpdate: Dispatch<SetStateAction<ID>>
  isAllSelected: boolean
  disabled: boolean
}

export const initialListView: ListViewContextProps = {
  selected: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onSelect: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onSelectAll: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  clearSelected: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setItemIdForUpdate: () => {},
  isAllSelected: false,
  disabled: false,
}
