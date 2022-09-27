import {FC, lazy, Suspense} from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import {getCSSVariableValue, MasterLayout, ProfilePage} from '@emms/ui-kit';
import TopBarProgress from 'react-topbar-progress-indicator'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {MenuTestPage} from '../pages/MenuTestPage'

const PrivateRoutes = () => {
  const BuilderPageWrapper = lazy(() => import('../pages/layout-builder/BuilderPageWrapper'))
  // const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
  // const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
  // const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
  // const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))
  // const UsersPage = lazy(() => import('../modules/apps/user-management/UsersPage'))
  const AssetsPage = lazy(() => import('../modules/assets/AssetsPage'))
  const SettingPage = lazy(() => import('../modules/setting/SettingPage'))
  const JobsPage = lazy(() => import('../modules/jobs/JobsPage'))
  // const LocationPage = lazy(() => import('../modules/setting/components/location/LocationPage'))
  // const SkillPage = lazy(() => import('../modules/setting/components/skill/SkillPage'))

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/dashboard' />} />
        {/* Pages */}
        <Route path='dashboard' element={<DashboardWrapper />} />
        <Route path='builder' element={<BuilderPageWrapper />} />
        {/*<Route path='menu-test' element={<MenuTestPage />} />*/}
        {/* Lazy Modules */}
        <Route
          path='crafted/pages/profile/*'
          element={
            <SuspensedView>
              <ProfilePage />
            </SuspensedView>
          }
        />
        <Route
          path='assets/*'
          element={
            <SuspensedView>
              <AssetsPage />
            </SuspensedView>
          }
        />
        <Route
          path='setting/*'
          element={
            <SuspensedView>
              <SettingPage />
            </SuspensedView>
          }
        /><Route
          path='jobs/*'
          element={
            <SuspensedView>
              <JobsPage />
            </SuspensedView>
          }
        />
        {/*<Route*/}
        {/*  path='setting/location'*/}
        {/*  element={*/}
        {/*    <SuspensedView>*/}
        {/*      <LocationPage />*/}
        {/*    </SuspensedView>*/}
        {/*  }*/}
        {/*/>*/}
        {/*<Route*/}
        {/*  path='setting/skill'*/}
        {/*  element={*/}
        {/*    <SuspensedView>*/}
        {/*      <SkillPage />*/}
        {/*    </SuspensedView>*/}
        {/*  }*/}
        {/*/>*/}
        {/*<Route*/}
        {/*  path='crafted/widgets/*'*/}
        {/*  element={*/}
        {/*    <SuspensedView>*/}
        {/*      <WidgetsPage />*/}
        {/*    </SuspensedView>*/}
        {/*  }*/}
        {/*/>*/}
        {/*<Route*/}
        {/*  path='crafted/account/*'*/}
        {/*  element={*/}
        {/*    <SuspensedView>*/}
        {/*      <AccountPage />*/}
        {/*    </SuspensedView>*/}
        {/*  }*/}
        {/*/>*/}
        {/*<Route*/}
        {/*  path='apps/chat/*'*/}
        {/*  element={*/}
        {/*    <SuspensedView>*/}
        {/*      <ChatPage />*/}
        {/*    </SuspensedView>*/}
        {/*  }*/}
        {/*/>*/}
        {/*<Route*/}
        {/*  path='apps/user-management/*'*/}
        {/*  element={*/}
        {/*    <SuspensedView>*/}
        {/*      <UsersPage />*/}
        {/*    </SuspensedView>*/}
        {/*  }*/}
        {/*/>*/}
        {/* Page Not Found */}
        {/*<Route path='*' element={<Navigate to='/error/404' />} />*/}
      </Route>
    </Routes>
  )
}

const SuspensedView: FC<any> = ({children}) => {
  const baseColor = getCSSVariableValue('--bs-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export {PrivateRoutes}
