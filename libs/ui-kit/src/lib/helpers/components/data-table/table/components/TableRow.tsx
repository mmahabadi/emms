import clsx from 'clsx'
import React, {FC} from 'react'
import {Row} from 'react-table'
import {TableSelectionCell} from "./TableSelectionCell";
import {Button} from "@emms/models";
import {KTSVG} from "@emms/ui-kit";

type Props = {
  row: Row;
  rowNumber: number;
  actions?: Array<Button>
}

const TableRow: FC<Props> = ({row, rowNumber, actions}) => {

  const handleActionClick = (action: Button) => {
    if(action && action.click) {
      action.click(row?.original);
    }
  }
  return(
    <tr {...row.getRowProps()}>
      <td className="rowNo">{rowNumber}</td>
      {row.cells.map((cell) => {
        if (cell.column.id === 'id')
          return;
        return (
          <td
            {...cell.getCellProps()}
            className={clsx({'text-end min-w-100px': cell.column.id === 'actions'})}
          >
            {cell.column.id === 'selection' && <TableSelectionCell id={cell.value} />}
            {cell.column.id !== 'selection' && cell.render('Cell')}
          </td>
        )
      })}
      {actions && actions.length > 0 &&
        <td>
          <div className='d-flex justify-content-end flex-shrink-0'>
            {actions.map((action: Button) =>
              <a
                key={row.id+action.icon}
                onClick={() => handleActionClick(action)}
                className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
              >
                {action?.icon && typeof action.icon === 'string' &&
                  <>
                    {action.icon === 'edit' && <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3'/>}
                    {action.icon === 'trash' && <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3'/>}
                  </>
                }
              </a>
            )}
          </div>
        </td>
      }
    </tr>
  )
}

export {TableRow}
