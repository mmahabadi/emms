import {createContext, FC, PropsWithChildren, useContext, useState} from "react";
import {initialModalProviderContext, ModalProviderContextProps} from "./models";
import {ModalConfig} from "@emms/models";


const ModalProviderContext = createContext<ModalProviderContextProps>(initialModalProviderContext);

const ModalConfigProvider: FC<PropsWithChildren<any>> = ({children}) => {
  const [config, setConfig] = useState(initialModalProviderContext.config);

  const updateConfig = (updates: Partial<ModalConfig>) => {
    const updatedConfig = {...config, ...updates} as ModalConfig;
    setConfig(updatedConfig);
  }

  const closeModal = () => {
    setConfig(initialModalProviderContext.config);
  }

  return (
    <ModalProviderContext.Provider value={{config, updateConfig, closeModal}}>
      {children}
    </ModalProviderContext.Provider>
  );
}
const useModalConfig = () => useContext(ModalProviderContext);
export {useModalConfig, ModalConfigProvider};
