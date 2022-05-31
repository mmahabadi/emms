import { Suspense } from 'react';
import {I18nProvider, LayoutProvider, LayoutSplashScreen, MasterInit} from "@emms/ui-kit";
import {Outlet} from 'react-router-dom';
import {AuthInit} from "../../../../libs/ui-kit/src/lib/modules/auth";


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
