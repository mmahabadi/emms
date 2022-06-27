import {FC, useMemo} from 'react'
import {ColumnInstance, Row, useTable} from 'react-table'
import {useQueryResponseData, useQueryResponseLoading, useQueryResponsePagination} from '../core/QueryResponseProvider'
import {TableLoading} from './components/TableLoading';
import {TablePagination} from './components/TablePagination';
import {KTCardBody} from '../../KTCardBody';
import {HeaderColumn} from "./components/HeaderColumn";
import {TableRow} from "./components/TableRow";
import {useIntl} from "react-intl";
import {useDataTableConfig} from "../core/TableConfigProvider";
import {DataTableColumn} from "@emms/models";

const DataTableContainer: FC = () => {
  const intl = useIntl();
  const responseData = useQueryResponseData();
  const isLoading = useQueryResponseLoading();
  const pagination = useQueryResponsePagination();
  const {columns, actions} = useDataTableConfig();
  const ID_COLUMN = {Header: '', id: 'id', accessor: 'id', isVisible: false} as DataTableColumn;
  const memoizedData = useMemo(() => responseData, [responseData]);
  const memoizedColumns = useMemo(() => [...columns, ID_COLUMN], []);

  const {getTableProps, getTableBodyProps, headers, rows, prepareRow} = useTable({
    columns: memoizedColumns,
    data: memoizedData as any
  });

  return (
    <KTCardBody className='py-4'>
      <div className='table-responsive'>
        <table
          id='kt_table_users'
          className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
          {...getTableProps()}
        >
          <thead>
            <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
              <th>#</th>
              {headers.map((column: ColumnInstance) => (
                <HeaderColumn key={column.id} column={column} />
              ))}
              {actions && actions.length > 0 &&
                <th className='text-end min-w-100px'>
                  {intl.formatMessage({id: 'DATATABLE.ACTIONS'})}
                </th>
              }
            </tr>
          </thead>
          <tbody className='text-gray-600 fw-bold' {...getTableBodyProps()}>
            {rows.length > 0 ? (
              rows.map((row: Row, i) => {
                prepareRow(row)
                return <TableRow
                  key={`row-${i}-${row.id}`}
                  row={row}
                  rowNumber={(i + 1) + ((pagination.page - 1) * pagination.pageSize)}
                  actions={actions}
                />
              })
            ) : (
              <tr>
                <td colSpan={headers?.length}>
                  <div className='d-flex text-center w-100 align-content-center justify-content-center'>
                    {intl.formatMessage({id: 'DATATABLE.NO_RECORD'})}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <TablePagination />
      {isLoading && <TableLoading />}
    </KTCardBody>
  )
}

export {DataTableContainer}
