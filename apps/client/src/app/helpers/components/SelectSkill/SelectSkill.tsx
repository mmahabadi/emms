import {withAsyncSelect, withInput} from "@emms/ui-kit";
import {getAsyncActivities} from "./service";

const SelectSkill = withInput(withAsyncSelect(getAsyncActivities));
export {SelectSkill}
