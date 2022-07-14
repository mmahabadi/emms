import {withAsyncSelect, withInput} from "@emms/ui-kit";
import {getAsyncLocations} from "./service";

const SelectLocation = withInput(withAsyncSelect(getAsyncLocations));
export {SelectLocation}
