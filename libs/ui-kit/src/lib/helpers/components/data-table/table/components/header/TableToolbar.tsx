import {useListView} from '../../../core/ListViewProvider';
import {useDataTableConfig} from "../../../core/TableConfigProvider";
import {useIntl} from "react-intl";
import clsx from "clsx";
import {Button} from "@emms/models";
import {TableFilter} from "./TableFilter";

const TableToolbar = () => {
  const {toolbar} = useDataTableConfig();
  const intl = useIntl();
  const {setItemIdForUpdate} = useListView();
  const clickHandler = (button: Button) => {
    setItemIdForUpdate(null);
    button?.click && button.click();
  }

  return (
    <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
      <TableFilter />

      {toolbar?.map((item: Button) =>
        <button
          key={item.text}
          type='button'
          className={clsx('btn me-3', item.className ? item.className : 'btn-light-primary')}
          onClick={() => clickHandler(item)}>
          {item?.icon}
          {item.text && intl.formatMessage({id: `${item.text}`})}
        </button>
      )}
    </div>
  )
}

export {TableToolbar}
