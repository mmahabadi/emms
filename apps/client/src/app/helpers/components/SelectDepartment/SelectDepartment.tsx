import {withAsyncSelect, withInput} from "@emms/ui-kit";
import {getAsyncDepartment} from "./service";

const SelectDepartment = withInput(withAsyncSelect(getAsyncDepartment));
export {SelectDepartment}
