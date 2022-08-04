import React, {FC} from "react";
import {useIntl} from "react-intl";
import {PageLink, PageTitle} from "@emms/ui-kit";
import {Link, Outlet, Route, Routes, useLocation} from "react-router-dom";
import {SkillList} from "../skill/SkillList";
import {SkillHeader} from "../skill/SkillHeader";

const breadCrumbs: Array<PageLink> = [
  {
    title: 'MENU.SKILL',
    path: '/setting/skill',
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

const SkillPage: FC = () => {
  const intl = useIntl();
  const location = useLocation();

  return (
    <Routes>
      <Route
        element={
          <>
            <SkillHeader/>
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
                        (location.pathname === '/setting/skill' && 'active')
                      }
                      to='/setting/location'
                    >{intl.formatMessage({id: 'MENU.SETTING.SKILL'})}</Link>

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
          path='skill'
          element={
            <>
              <PageTitle breadcrumbs={breadCrumbs}>{intl.formatMessage({id: 'MENU.SETTING.SKILL'})}</PageTitle>
              <SkillList/>
            </>
          }
        />
      </Route>
    </Routes>
  )
}

export default SkillPage
