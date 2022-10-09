import {withAsyncSelect, withInput} from "@emms/ui-kit";
import {getAsyncDamage} from "./service";

const SelectDamage = withInput(withAsyncSelect(getAsyncDamage));
export {SelectDamage}
