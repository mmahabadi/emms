import {createContext, FC, useContext, useMemo, useState} from 'react'
import {useQueryResponse, useQueryResponseData} from './QueryResponseProvider';
import {
  calculatedGroupingIsDisabled,
  calculateIsAllDataSelected,
  groupingOnSelect,
  groupingOnSelectAll
} from '../../../crud-helper/helpers';
import {initialListView, ListViewContextProps} from '../../../crud-helper/models';
import {ID} from "@emms/models";

const ListViewContext = createContext<ListViewContextProps>(initialListView)

const ListViewProvider: FC<any> = ({children}) => {
  const [selected, setSelected] = useState<Array<ID>>(initialListView.selected)
  const [itemIdForUpdate, setItemIdForUpdate] = useState<ID>(initialListView.itemIdForUpdate)
  const {isLoading} = useQueryResponse()
  const data = useQueryResponseData()
  const disabled = useMemo(() => calculatedGroupingIsDisabled(isLoading, data), [isLoading, data])
  const isAllSelected = useMemo(() => calculateIsAllDataSelected(data, selected), [data, selected])

  return (
    <ListViewContext.Provider
      value={{
        selected,
        itemIdForUpdate,
        setItemIdForUpdate,
        disabled,
        isAllSelected,
        onSelect: (id: ID) => {
          groupingOnSelect(id, selected, setSelected)
        },
        onSelectAll: () => {
          //TODO type
          groupingOnSelectAll(isAllSelected, setSelected, data as any);
        },
        clearSelected: () => {
          setSelected([])
        },
      }}
    >
      {children}
    </ListViewContext.Provider>
  )
}

const useListView = () => useContext(ListViewContext)

export {ListViewProvider, useListView}
