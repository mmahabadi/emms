import {withAsyncSelect, withInput} from "@emms/ui-kit";
import {getAsyncOrganizations} from "./service";

const SelectOrg = withInput(withAsyncSelect(getAsyncOrganizations));
export {SelectOrg}
