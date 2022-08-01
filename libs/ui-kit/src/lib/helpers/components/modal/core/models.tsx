import {ModalConfig} from "@emms/models";

const initialModalConfig: ModalConfig = {
  show: false,
  isLarge: false,
  title: '',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  bodyComponent: () => <></>,
}

export type ModalProviderContextProps = {
  config: ModalConfig;
  updateConfig: (updates: Partial<ModalConfig>) => void;
  closeModal: () => void;
}

export const initialModalProviderContext: ModalProviderContextProps = {
  config: initialModalConfig,
  updateConfig: () => {},
  closeModal: () => {}
}
