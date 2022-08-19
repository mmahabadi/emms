import {withAsyncSelect, withInput} from "@emms/ui-kit";
import {getAsyncActivities} from "./service";

const SelectActivity = withInput(withAsyncSelect(getAsyncActivities));
export {SelectActivity}
