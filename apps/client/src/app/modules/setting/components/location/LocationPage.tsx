import React, {FC} from "react";
import {useIntl} from "react-intl";
import {PageLink, PageTitle} from "@emms/ui-kit";
import {Link, Outlet, Route, Routes, useLocation} from "react-router-dom";
import {LocationList} from "../../components/location/LocationList";
import {LocationHeader} from "../../components/location/LocationHeader";

const breadCrumbs: Array<PageLink> = [
  {
    title: 'MENU.LOCATION',
    path: '/setting/location',
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

const LocationPage: FC = () => {
  const intl = useIntl();
  const location = useLocation();

  return (
    <Routes>
      <Route
        element={
          <>
            <LocationHeader/>
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
                        (location.pathname === '/setting/location' && 'active')
                      }
                      to='/setting/location'
                    >{intl.formatMessage({id: 'MENU.SETTING.LOCATION'})}</Link>

                  </li>
                  <li className='nav-item'>
                    <Link
                      className={
                        `nav-link cursor-pointer ` +
                        (location.pathname === '/setting/location' && 'active')
                      }
                      to='/setting/location'
                    >{intl.formatMessage({id: 'MENU.SETTING.LOCATION'})}</Link>
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
          path='overview'
          element={
            <>
              <PageTitle breadcrumbs={breadCrumbs}>{intl.formatMessage({id: 'MENU.SETTING.LOCATION'})}</PageTitle>
              <LocationList/>
            </>
          }
        />
      </Route>
    </Routes>
  )
}

export default LocationPage
