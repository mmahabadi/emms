import { Suspense } from 'react';
import {I18nProvider, LayoutProvider, LayoutSplashScreen, MasterInit, AuthInit} from "@emms/ui-kit";
import {Outlet} from 'react-router-dom';


export function App() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <I18nProvider>
        <LayoutProvider>
          <AuthInit>
            <Outlet />
            <MasterInit />
          </AuthInit>
        </LayoutProvider>
      </I18nProvider>
    </Suspense>
  );
}

export default App;
