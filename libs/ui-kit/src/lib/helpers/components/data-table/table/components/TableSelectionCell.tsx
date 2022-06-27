import {FC, useMemo} from 'react';
import {useListView} from '../../core/ListViewProvider';
import {ID} from "@emms/models";

type Props = {
  id: ID
}

const TableSelectionCell: FC<Props> = ({id}) => {
  const {selected, onSelect} = useListView()
  const isSelected = useMemo(() => selected.includes(id), [id, selected])
  return (
    <div className='form-check form-check-sm form-check-custom form-check-solid'>
      <input
        className='form-check-input'
        type='checkbox'
        data-kt-check={isSelected}
        data-kt-check-target='#kt_table_users .form-check-input'
        checked={isSelected}
        onChange={() => onSelect(id)}
      />
    </div>
  )
}

export {TableSelectionCell}
