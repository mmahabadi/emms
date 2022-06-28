import {ModalConfig} from "@emms/models";

const initialModalConfig: ModalConfig = {
  show: false,
  title: ''
}

export type ModalProviderContextProps = {
  config: ModalConfig;
  updateConfig: (updates: Partial<ModalConfig>) => void
}

export const initialModalProviderContext: ModalProviderContextProps = {
  config: initialModalConfig,
  updateConfig: () => {}
}
