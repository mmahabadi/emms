import {FC} from 'react'
import {ColumnInstance} from 'react-table';
import {useIntl} from "react-intl";
import {TableSelectionHeader} from "./TableSelectionHeader";

type Props = {
  column: ColumnInstance
}

const HeaderColumn: FC<Props> = ({column}) => {
  const intl = useIntl();

  if (column.isVisible === false) {
    return <></>;
  }

  if (column.id === 'selection') {
    return <TableSelectionHeader />;
  }

  return (
    <>
      {column.Header && typeof column.Header === 'string' ? (
        <th {...column.getHeaderProps()}>{intl.formatMessage({id: `${column.render('Header')}`})}</th>
      ) : (
        column.render('Header')
      )}
    </>
  )
}

export {HeaderColumn}
