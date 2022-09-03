import {withAsyncSelect, withInput} from "@emms/ui-kit";
import {getAsyncActivities} from "../SelectActivity/service";

const SelectActivity = withInput(withAsyncSelect(getAsyncActivities));
export {SelectActivity}
