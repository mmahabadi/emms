import clsx from 'clsx'
import {FC} from 'react'
import {Row} from 'react-table'

type Props = {
  row: Row;
  rowNumber: number;
}

const TableRow: FC<Props> = ({row, rowNumber}) => (
  <tr {...row.getRowProps()}>
    <td className="rowNo">{rowNumber}</td>
    {row.cells.map((cell) => {
      return (
        <td
          {...cell.getCellProps()}
          className={clsx({'text-end min-w-100px': cell.column.id === 'actions'})}
        >
          {cell.render('Cell')}
        </td>
      )
    })}
  </tr>
)

export {TableRow}
