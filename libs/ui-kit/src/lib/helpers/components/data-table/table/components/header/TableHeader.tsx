import {useListView} from '../../../core/ListViewProvider'
import {TableToolbar} from "./TableToolbar";

const TableHeader = () => {
  const {selected} = useListView()
  return (
    <div className='card-header border-0 pt-6 justify-content-end'>
      {/*<UsersListSearchComponent />*/}
      {/* begin::Card toolbar */}
      <div className='card-toolbar'>
        {/* begin::Group actions */}
        <TableToolbar />
        {/*{selected.length > 0 ? <UsersListGrouping /> : <UsersListToolbar />}*/}
        {/* end::Group actions */}
      </div>
      {/* end::Card toolbar */}
    </div>
  )
}

export {TableHeader}
