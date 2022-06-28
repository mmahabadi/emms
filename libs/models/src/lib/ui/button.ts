import {ReactElement} from "react";

export type Button = {
    // component?: any;
    // to?: string;
    icon?: ReactElement | string;
  // eslint-disable-next-line @typescript-eslint/ban-types
    click?: (prop?: any) => {};
    text?: string;
    className?: string;
    hide?: boolean;
    loading?: boolean;
    disabled?: boolean;
}
