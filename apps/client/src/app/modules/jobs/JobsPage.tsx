import React, {FC} from "react";
import {useIntl} from "react-intl";
import {PageLink, PageTitle} from "@emms/ui-kit";
import {Link, Outlet, Route, Routes, useLocation} from "react-router-dom";
import {JobsHeader} from "./components/JobsHeader";
import {JobOrderList} from "./components/jobOrder/JobOrderList";
import {JobRequestList} from "./components/jobRequest/JobRequestList";

const breadCrumbs: Array<PageLink> = [
  {
    title: 'MENU.JOBS',
    path: '/jobOrder/overview',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]

const JobsPage: FC = () => {
  const intl = useIntl();
  const location = useLocation()
  ;
  /**
   * todo mohsen ino behem begoz
   */
  return (
    <Routes>
      <Route
        element={
          <>
            <JobsHeader/>
            <div className='card card-custom'>
              <div className='card-header card-header-stretch overflow-auto'>
                <ul
                  className='nav nav-stretch nav-line-tabs fw-bold border-transparent flex-nowrap'
                  role='tablist'
                >
                  <li className='nav-item'>
                    <Link
                      className={
                        `nav-link cursor-pointer ` +
                        (location.pathname === '/jobs/job-order' && 'active')
                      }
                      to='/jobs/job-order'
                    >{intl.formatMessage({id: 'MENU.JOBS.JOB_ORDER'})}</Link>
                  </li>
                  <li className='nav-item'>
                    <Link
                      className={
                        `nav-link cursor-pointer ` +
                        (location.pathname === '/jobs/job-request' && 'active')
                      }
                      to='/jobs/job-request'
                    >{intl.formatMessage({id: 'MENU.JOBS.JOB_REQUEST'})}</Link>
                  </li>

                </ul>
              </div>
              {/* end::Header */}

              {/* begin::Body */}
              <div className='card-body'>
                <div className='tab-content pt-3'>
                  <Outlet />
                </div>
              </div>
              {/* end::Body */}
            </div>
          </>
        }
      >
        <Route
          path='job-order'
          element={
            <>
              <PageTitle breadcrumbs={breadCrumbs}>{intl.formatMessage({id: 'MENU.JOBS.JOB_ORDER'})}</PageTitle>
              <JobOrderList/>
            </>
          }
        />
        <Route
          path='job-request'
          element={
            <>
              <PageTitle breadcrumbs={breadCrumbs}>{intl.formatMessage({id: 'MENU.JOBS.JOB_REQUEST'})}</PageTitle>
              <JobRequestList/>
            </>
          }
        />
      </Route>
    </Routes>
  )
}

export default JobsPage
