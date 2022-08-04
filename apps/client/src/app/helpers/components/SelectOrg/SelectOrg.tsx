import {withAsyncSelect, withInput} from "@emms/ui-kit";
import {getAsyncOrganizations} from "./service";

const SelectOrg = withInput(withAsyncSelect(getAsyncOrganizations));//todo ino farda hatman baraie set kardan toosh check kon
export {SelectOrg}
