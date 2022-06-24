import React, {FC} from "react";
import {useIntl} from "react-intl";
import {PageLink, PageTitle} from "@emms/ui-kit";
import {Link, Outlet, Route, Routes, useLocation} from "react-router-dom";
import {AssetsHeader} from "./components/AssetsHeader";
import {AssetsList} from "./components/AssetsList";
import {AssetsCategoryList} from "./components/AssetsCategoryList";

const breadCrumbs: Array<PageLink> = [
  {
    title: 'MENU.ASSETS',
    path: '/assets/overview',
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

const AssetsPage: FC = () => {
  const intl = useIntl();
  const location = useLocation();

  return (
    <Routes>
      <Route
        element={
          <>
            <AssetsHeader/>
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
                        (location.pathname === '/assets/overview' && 'active')
                      }
                      to='/assets/overview'
                    >{intl.formatMessage({id: 'MENU.ASSETS.ASSET'})}</Link>

                  </li>
                  <li className='nav-item'>
                    <Link
                      className={
                        `nav-link cursor-pointer ` +
                        (location.pathname === '/assets/categories' && 'active')
                      }
                      to='/assets/categories'
                    >{intl.formatMessage({id: 'MENU.ASSETS.CATEGORY'})}</Link>
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
              <PageTitle breadcrumbs={breadCrumbs}>{intl.formatMessage({id: 'MENU.ASSETS.ASSET'})}</PageTitle>
              <AssetsList/>
            </>
          }
        />
        <Route
          path='categories'
          element={
            <>
              <PageTitle breadcrumbs={breadCrumbs}>{intl.formatMessage({id: 'MENU.ASSETS.CATEGORY'})}</PageTitle>
              <AssetsCategoryList/>
            </>
          }
        />
      </Route>
    </Routes>
  )
}

export default AssetsPage
