import {createContext, FC, PropsWithChildren, useContext, useState} from "react";
import {AppState} from "../../../../../models/src/lib/ui/app-state";

const initialModalConfig: AppState = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  refetchGridData: () => {}
}

export type AppStateProviderContextProps = {
  appState: AppState;
  updateAppState: (updates: Partial<AppState>) => void
}


export const initialAppStateProviderContext: AppStateProviderContextProps = {
  appState: initialModalConfig,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateAppState: () => {}
}


const AppStateProviderContext = createContext<AppStateProviderContextProps>(initialAppStateProviderContext);

const AppStateProvider: FC<PropsWithChildren<any>> = ({children}) => {
  const [config, setConfig] = useState(initialAppStateProviderContext.appState);

  const updateAppState = (updates: Partial<AppState>) => {
    const updatedConfig = {...config, ...updates} as AppState;
    setConfig(updatedConfig);
  }

  return (
    <AppStateProviderContext.Provider value={{appState: config, updateAppState}}>
      {children}
    </AppStateProviderContext.Provider>
  );
}
const useAppState = () => useContext(AppStateProviderContext);
export {useAppState, AppStateProvider};
