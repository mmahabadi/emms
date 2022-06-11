import {StrictMode} from 'react';
import * as ReactDOM from 'react-dom/client';
import {QueryClient, QueryClientProvider} from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools';
import axios from 'axios';
import {AuthProvider, LayoutI18nProvider, setupAxios} from "@emms/ui-kit";
/**
 * TIP: Replace this style import with dark styles to enable dark mode
 *
 * import './_metronic/assets/sass/style.dark.scss'
 *
 * TIP: Replace this style import with rtl styles to enable rtl mode
 *
 * import './_metronic/assets/css/style.rtl.css'
 **/
// import './assets/sass/style.scss';
// import './assets/sass/style.react.scss';
// import '@ui-kit/style.react.scss';
import {AppRoutes} from "./app/routing/AppRoutes";

/**
 * Inject Metronic interceptors for axios.
 *
 * @see https://github.com/axios/axios#interceptors
 */
setupAxios(axios);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient();

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <LayoutI18nProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </LayoutI18nProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);
