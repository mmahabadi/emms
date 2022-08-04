/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {usePaginationLinks, useQueryResponseLoading, useQueryResponsePagination} from '../../core/QueryResponseProvider'
import {useQueryRequest} from '../../core/QueryRequestProvider'
import React from "react";

const TablePagination = () => {
  const pagination = useQueryResponsePagination();
  const isLoading = useQueryResponseLoading();
  const {updateState} = useQueryRequest();
  const links = usePaginationLinks();

  const updatePage = (newPage: number | null) => {
    if (!newPage || pagination.page == newPage) {
      return
    }

    updateState({page: newPage, pageSize: pagination.pageSize || 10})
  }
  console.log(links)
  debugger

  return (
    <div className='row'>
      <div className='col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start'></div>
      <div className='col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end'>
        <div id='kt_table_users_paginate'>
          <ul className='pagination'>
            {links?.map((link: any, index, arr) => {
              const previous = index === 0;
              const next = index === arr.length;

              return (
                <li
                  key={`${index}-${link.label}`}
                  onClick={() => updatePage(link.page)}
                  className={clsx('page-item', {
                    active: pagination.page == link.page,
                    disabled: isLoading,
                    previous,
                    next
                  })}
                >
                  <a
                    className='page-link'
                    dangerouslySetInnerHTML={{__html: link.label}}
                    style={{cursor: 'pointer'}}
                  />
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export {TablePagination}
