import {FC} from "react";

export type ModalConfig = {
  show: boolean;
  title: string;
  headerComponent?: FC;
  bodyComponent?: FC;
  isLarge?: boolean;
}
