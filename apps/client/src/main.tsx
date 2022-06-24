import {StrictMode} from 'react';
import * as ReactDOM from 'react-dom/client';
import {QueryClient, QueryClientProvider} from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools';
import axios from 'axios';
import {AuthProvider, LayoutI18nProvider, setupAxios} from "@emms/ui-kit";

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
