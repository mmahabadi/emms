import {Suspense} from 'react';
import {
  AuthInit,
  I18nProvider,
  LayoutProvider,
  LayoutSplashScreen,
  MasterInit,
  Modal,
  ModalConfigProvider
} from "@emms/ui-kit";
import {Outlet} from 'react-router-dom';

export function App() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <I18nProvider>
        <LayoutProvider>
          <AuthInit>
            <ModalConfigProvider>
              <Outlet />
              <MasterInit />
              <Modal/>
            </ModalConfigProvider>
          </AuthInit>
        </LayoutProvider>
      </I18nProvider>
    </Suspense>
  );
}

export default App;
