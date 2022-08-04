import React, {FC} from "react";
import {useIntl} from "react-intl";
import {PageLink, PageTitle} from "@emms/ui-kit";
import {Link, Outlet, Route, Routes, useLocation} from "react-router-dom";
import {SettingHeader} from "./components/SettingHeader";
import {GoodsList} from "./components/goods/GoodsList";
import {SkillList} from "./components/skill/SkillList";
import {LocationList} from "./components/location/LocationList";
import {LocationHeader} from "./components/location/LocationHeader";

const breadCrumbs: Array<PageLink> = [
  {
    title: 'MENU.SETTING',
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

const SettingPage: FC = () => {
  const intl = useIntl();
  const location = useLocation();

  return (
    <Routes>
      <Route
        element={
          <>
            <SettingHeader/>
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
                        (location.pathname === '/setting/overview' && 'active')
                      }
                      to='/setting/overview'
                    >{intl.formatMessage({id: 'MENU.SETTING.GOODS'})}</Link>
                  </li>
                  <li className='nav-item'>
                    <Link
                      className={
                        `nav-link cursor-pointer ` +
                        (location.pathname === '/setting/skill' && 'active')
                      }
                      to='/setting/skill'
                    >{intl.formatMessage({id: 'MENU.SETTING.SKILL'})}</Link>
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
              <PageTitle breadcrumbs={breadCrumbs}>{intl.formatMessage({id: 'MENU.SETTING.GOODS'})}</PageTitle>
              <GoodsList/>
            </>
          }
        /><Route
          path='goods'
          element={
            <>
              <PageTitle breadcrumbs={breadCrumbs}>{intl.formatMessage({id: 'MENU.SETTING.GOODS'})}</PageTitle>
              <GoodsList/>
            </>
          }
        />
        <Route
          path='skill'
          element={
            <>
              <PageTitle breadcrumbs={breadCrumbs}>{intl.formatMessage({id: 'MENU.SETTING.SKILL'})}</PageTitle>
              <SkillList/>
            </>
          }
        />
        <Route
          path='location'
          element={
            <>
              <PageTitle breadcrumbs={breadCrumbs}>{intl.formatMessage({id: 'MENU.SETTING.SKILL'})}</PageTitle>
              <LocationList/>
            </>
          }
        />
      </Route>
    </Routes>
  )
}

export default SettingPage
